import { Server, ServerCredentials } from "@grpc/grpc-js";
import { CatService } from "./services/cat.service";
import { CatsService } from "./dtos/cats";

const PORT = 5000;

const addrs = `0.0.0.0:${PORT}`;

const server = new Server();

server.addService(CatsService, new CatService());

server.bindAsync(addrs, ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at : " + addrs);
});
