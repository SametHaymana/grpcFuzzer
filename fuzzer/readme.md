# NoConfig Grpc Fuzzer

A grpc service fuzzer that no need any configuration or and definition of service, read proto bufers and run sequential request to server. Can read multiple proto files. For now just support simple string and int32 data type array and single values.

## Running Fuzzer

#### Install Dependency

```bash
npm run i
```

#### Running

```
node fuzzer.js -p <PathProtoFiles> -h <ServerAddrs> -i <IterationCount>
```

#### Example Commands

```
node fuzzer.js -p ../../microservice/calculator/proto/ -h localhost:50051 -i 1000
```

```
node fuzzer.js -p ../microservices/catService/proto/ -h localhost:5001 -i 5000
```
