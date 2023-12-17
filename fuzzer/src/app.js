const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const protoBuf = require("protobufjs");
const fuzzer = require("./fuzzers/index");
const protoFiles = require("./proto/fileHandler");
const fs = require("fs");

const labelTypes = {
  optional: "LABEL_OPTIONAL",
  repeated: "LABEL_REPEATED",
};

const types = {
  string: "TYPE_STRING",
  bool: "TYPE_BOOL",
  int32: "TYPE_INT32",
  int64: "TYPE_INT64",
  uint64: "TYPE_UINT64",
  fixed64: "TYPE_FIXED64",
};

class App {
  constructor(path, host, iterations = 1000, verbose = false) {
    this.path = path;
    this.host = host;
    this.iterations = iterations;
    this.verbose = verbose;

    // Error Response storage
    /*
        Structure Of errorResponse:
        [
            {
                request: {},
                response : {},
                err: {}
            }
        ]
    */
    this.errorResponse = [];

    // Statistics of requests success and failure
    this.statistics = {
      success: 0,
      failure: 0,
    };

    // Total second of the test
    this.totalSecond = 0;
  }

  async storeErrorResponse() {
    // Store as json as a file
    return fs.writeFileSync(
      "errorResponse.json",
      JSON.stringify(this.errorResponse)
    );
  }

  viewStatistics() {
    // Clear the console
    if (!this.verbose) console.clear();

    const totalRequest = this.statistics.success + this.statistics.failure;

    console.log("Total Requests: " + totalRequest);
    console.log("Success: " + this.statistics.success);
    console.log("Failure: " + this.statistics.failure);
    console.log("Request per second: " + totalRequest / this.totalSecond);

    console.log("Erors are stored in errorResponse.json");
  }

  generateRequestData(inputType) {
    /*
        Support just string and int32 types for now
    
    */

    const requestData = {};

    for (const field of inputType.field) {
      const fieldName = field.name;
      switch (field.type) {
        case types.string:
          if (field.label == labelTypes.repeated) {
            // Create array for it
            requestData[fieldName] = fuzzer.randStringArr();
            break;
          }

          requestData[fieldName] = fuzzer.randString();
          break;
        case types.int32:
          if (field.label == labelTypes.repeated) {
            // Create array for it
            requestData[fieldName] = fuzzer.randIntArr();
            break;
          }

          requestData[fieldName] = fuzzer.randInt();
          break;
        // Add cases for other types as needed
        default:
          requestData[fieldName] = null;
      }
    }

    return requestData;
  }

  async mainLoops(protoDescriptor, host) {
    for (const packageName in protoDescriptor) {
      const _package = protoDescriptor[packageName];
      for (const serviceName in _package) {
        const service = _package[serviceName];
        if (typeof service === "function") {
          // Create client
          const client = new service(host, grpc.credentials.createInsecure());
          const methodName = Object.keys(service.service);

          // Generate request data based on the method's input type
          for (let methodName of Object.keys(service.service)) {
            const method = service.service[methodName];

            const requestData = this.generateRequestData(
              method.requestType.type
            );

            // Call the method
            await new Promise((resolve, reject) => {
              client[methodName](requestData, (error, response) => {
                if (error) {
                  const record = {
                    request: requestData,
                    response: response,
                    err: error.details,
                  };
                  this.errorResponse.push(record);
                  this.statistics.failure = this.statistics.failure + 1;
                  if (this.verbose) {
                    console.log(
                      `Requesting to ${methodName} with data: ${JSON.stringify(
                        requestData
                      )} and error: ${error.details}`
                    );
                  }
                  resolve();
                } else {
                  this.statistics.success = this.statistics.success + 1;
                  if (this.verbose) {
                    console.log(
                      `Requesting to ${methodName} with data: ${JSON.stringify(
                        requestData
                      )} and response: ${JSON.stringify(response)}`
                    );
                  }
                  resolve();
                }
              });
            });

            // One line console log to show progress
            if (!this.verbose) process.stdout.write(".");
          }
        }
      }
    }
  }

  async start() {
    // Read paths
    const protoDescriptors = protoFiles.readFromPath(this.path);

    const startDate = new Date();
    // Loop through proto descriptors
    for await (const protoDescriptor of protoDescriptors) {
      while (0 < this.iterations--) {
        await this.mainLoops(protoDescriptor, this.host);
      }
    }
    const endDate = new Date();

    this.totalSecond = (endDate - startDate) / 1000;

    // Store error response
    this.storeErrorResponse();

    // View statistics
    this.viewStatistics();
  }
}
module.exports = App;
