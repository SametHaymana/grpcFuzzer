const protoLoader = require("@grpc/proto-loader");
const fs = require("fs");
const grpc = require("grpc");

PROTO_FILE_EXT = ".proto";

class ProtoImporter {
  readProtoFile(protoFilePath) {
    // protoFilePath: string
    // return: object
    const packageDefinition = protoLoader.loadSync(protoFilePath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    return grpc.loadPackageDefinition(packageDefinition);
  }

  readDir(dirPath) {
    // Add / to the end of dirPath if it doesn't have one
    if (!dirPath.endsWith("/")) {
      dirPath += "/";
    }

    // dirPath: string
    // return: Array of string
    let protoFiles = [];
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (file.endsWith(PROTO_FILE_EXT)) {
        protoFiles.push(dirPath + file);
      }
    }
    return protoFiles;
  }

  readFromPath(path) {
    // Determine is path is a file or a directory
    // path: string
    // return: packageDefinitions or Array of packageDefinitions

    // If path is a file
    if (fs.lstatSync(path).isFile()) {
      if (path.endsWith(PROTO_FILE_EXT)) {
        return [this.readProtoFile(path)];
      }
      return [];
    } else {
      // If path is a directory
      return this.readDir(path).map((protoFilePath) => {
        return this.readProtoFile(protoFilePath);
      });
    }
  }
}

module.exports = new ProtoImporter();
