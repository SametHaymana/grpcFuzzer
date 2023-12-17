# Grpc Zero-Config Fuzzing For Microservices

### Introductions

In today world we have new cominication protocol build under Http2 named grpc. It was developed by Google, key diferance of the other cominication tecniques gRPC use spesific serilization named Proto Buffer, With proto buffer serilization tecnique we can reduce bandWith and can create secure cominication chanell. Also gRPC support streaming.

When we look at the workflow of the a simple grpc server. Firsly we define our server functions calls with proto file, After we can convert this file (.proto) to our used programing language we can say compile [Offical Doc](https://protobuf.dev/)

#### Creating an exampe Server

Lets create a example proto file for our HelloWorld server.

hello.proto
```proto3 
syntax = "proto3";

package Hello;

message HelloRequest{
    optional string name = 1;
}

message HelloResponse{
    string message = 2;
}


service Cats {
    rpc Hello (HelloRequest) returns (HelloResponse) {}
}

```

Above is a good example of what a proto file. We define a gRPC function "Hello" in above 
