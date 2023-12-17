const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const protoBuf = require("protobufjs");
const fuzzer = require("../src/fuzzers/index");

// Path to your .proto file
const PROTO_PATH =
  "/home/tomahawk/Desktop/school/4_class/first/CENG405/termProject/microservice/catService/proto/cats.proto";

const PROTO_PATH2 =
  "/home/tomahawk/Desktop/school/4_class/first/CENG405/termProject/microservice/calculator/proto/calculator.proto";

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

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

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Function to generate basic request data based on the method's input type
function generateRequestData(inputType) {
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

// Function to find and call the first method of the first service
function callFirstMethodOfFirstService() {
  for (const packageName in protoDescriptor) {
    const package = protoDescriptor[packageName];
    for (const serviceName in package) {
      const service = package[serviceName];
      if (typeof service === "function") {
        const client = new service(
          "localhost:5000",
          grpc.credentials.createInsecure()
        );
        const methodName = Object.keys(service.service);

        // Generate request data based on the method's input type

        Object.keys(service.service).forEach((methodName) => {
          const method = service.service[methodName];

          const requestData = generateRequestData(method.requestType.type);
          console.log(methodName);
          console.log(requestData);

          // Call the method

          client[methodName](requestData, (error, response) => {
            if (error) {
              console.error(
                `Error calling ${methodName} in ${packageName}.${serviceName}:`,
                error
              );
            } else {
              console.log(
                `Response from ${methodName} in ${packageName}.${serviceName}:`,
                response
              );
            }
          });

          return;
        });
      }
    }
  }
}

// Call the first method of the first service
callFirstMethodOfFirstService();
