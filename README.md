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


service Hello {
    rpc Hello (HelloRequest) returns (HelloResponse) {}
}

```

Above is a good example of what a proto file. We define a gRPC function "Hello" in above. After define function we will compile this to python code (You can look at service in microservices folder). After converting we can inplement Hello function to say hello to user.

So what is the point of this deffinition files. We can define our services all input and output, Then we can create this server in any language and we can call server also using this protofile with any language. We can create a Ai server run with python and we can call it from a backend service wiriten in java just distributing proto definition of Ai server, This is fun.

### How to Fuzz

For fuzzing a grpc server is good idea to find unexpected bugs and errors in easy way but is it easy to fuzze grpc server? Technically yes we can but in practically it is not easy. Because of input complexity of some proto files cannot easy to create randomized request params. Also one of adversity is result and detecting bugs.

Example of complex proto definition:

```proto3
syntax = "proto3";

package usermanagement;

message Address {
  string street = 1;
  string city = 2;
  string state = 3;
  string country = 4;
  string zip_code = 5;
}

message Picture {
  Address address = 1;
  string name = 2;
  string url = 3;
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  repeated Address addresses = 4;
  repeated Picture pictures = 5;
}


// Request and response messages for the service.
message GetUserRequest {
  int32 user_id = 1;
}

message ListUsersRequest {
  // Pagination, filtering, etc., can be added here.
}

message ListUsersResponse {
  repeated User users = 1;
}

message DeleteUserRequest {
  int32 user_id = 1;
}

message DeleteUserResponse {
  bool success = 1;
}


// The service definition.
service UserManagementService {
  rpc CreateUser (User) returns (User);
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (ListUsersResponse);
  rpc DeleteUser (DeleteUserRequest) returns (DeleteUserResponse);
}

```

### How I create Fuzzer

To create complex capability zero-config fuzzer we need to read proto definition files and calling defined function with randomized parameters. To create randomized parameter I looping through message and create random value for spesific key. My fuzzer now just support int32, string and these types array format values for creating random request (aim to make simple brutfoce to may find owerflows). We are fuzzing out of box server and this is not easy to find owerflows or any bugs dirrect from response or error, so for finding bugs fuzzer store all errors with sended requst parameters.

Simplfy the process:

- Reading provided proto definitions
- Generate request parameters for functions calls
- Call function
- If generate error, store it further investigation

#### Example runs

Start any microservice in microservices folder instructions avaliable in folders. And then we can test our fuzzer.

To run fuzzer we should give path of proto file and server runing host, also optional veriables iterations(testing count) and verbose (-v) to printing more output.

```bash
cd fuzzer
fuzzer.js -p ../microservices/calculator/proto/ -h localhost:50051 -i 10000 -v
```

Part of output

```
Requesting to Factorial with data: {"number":729} and error: Exception calling application: Value out of range: 143944203082852020936487497534117982022882965589690364673693061162476243045499796342514921251918118923315972208319645457748147167327745657423556772987339469096273714269715978027689217946279110813250554442949188876380981748423798059547941526209617600550401836344440946143559406379243539280471226217616795307350093833506563912847375596457752998300253802797124506782082806848595382245304883627562429844072383129333651303531930503797505857003691307995341147759311970956788388858051201244572090616432521012850378700535621933164594592464802826071598219784859276399828522490407313298306343647484092552574143726504774949971341979216848497051655132117808971202211129414942238832529129551620639456467679080680285254924646139041557798138005113755706474722388059339157743725363052209406623245907893301672988720935808137092807296039880618733745191181406156999530631290091225161241137170892979835575797210169416409786270215366560314143189326610690069401398954616794954769376868773012300329185160436265766608208595051797521649481558917764466610024065774972002481387663415757962448023575144658896448903970807657267357286888451902842435308996788850077301474479256212693659167275428768266429162432284383971433472951306333709511606001424702854070924306085273612117382101065192184745921263534638376857693166323193045334912621056437638742391037771652526521138270330820455774657063480495308629488689096889297306621584701901267792095099257457062112714736533228987187680301412208062836855240512760569849606007594901322123914650182044371000620707094461807336655631148430682575533415157294114010116183713868830816075776000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
Requesting to SquareRoot with data: {"number":274} and response: {"result":16.55294535724685}
Requesting to CubeRoot with data: {"number":926} and response: {"result":9.74698569980003}
Requesting to Max with data: {"numbers":[288,1564,1068,895,100,209,827,632,1291,1615,1185,784,1020,397,811,264,1137,180,722,1511,112,1621,1623,1159,717,427,1151,1628,579,1403,362,1147,1261,140,855,214,938,1597,530,947,887,196,889,520,165,1432,826,1233,1626,1340,1151,1447,1461,33,635,1064,290,1010,143,986,1251,57,314,164,507,497,397,701,199,1204,462,649,1073,460,867,1152,757,647,1358,1017]} and response: {"result":1628}
Requesting to Min with data: {"numbers":[248,31,1119,148,53,508,990,1241,1501,1218,1314,1449,453,1453,950,1044,185,1202,565,564,273,1582,705,280,847,1509,308,229,511,688,78,1338,1374,1246,1450,25,1295,1318,780,466,646,1379,560,288,683,313,1179,695,839,696,555,1305,436,196,1507,601,582,902,757,1213,1297,801,1364,1479,1058,273,1566,1306,1208,20,848,149,56,789,1441,695,328,781,1552,905,1268,1552,1129,591,1084,285,569,516,504,1252]} and response: {"result":20}
Requesting to Mean with data: {"numbers":[1412,1488,1449,711,473,1173,1114,1540,1491,487,1587,1212,1255,1545,1585,1260,1497,470,675,1428,1422,1299,125,960,132,958]} and response: {"result":1105.6923076923076}
Requesting to Median with data: {"numbers":[1596,388,1168,1561,80,1209,683,1112,1027,15,736,69,901,20,131,504,993,1350,1371,1185,342,384,1604,255,254,1527,1256,1297,472,1293,250,619,814,690,1096,290,919,779,776,960,541,290,855,79,1452,284,117,677,445,454,921,37,1211,703,321,1108,1352,1541,1387,1234,793,287,334,353,561,857,966,243,1636,193,607,762,740,1100,486,446,266,1158,1277,1316]} and response: {"result":751}
Requesting to Sin with data: {"angle":null} and response: {"result":0}
Requesting to Cos with data: {"angle":null} and response: {"result":1}
Requesting to Tan with data: {"angle":null} and response: {"result":0}
Requesting to MatrixAddition with data: {"matrix1":[748,765,1079,1497,903,1167,596,871,975,1204,1159,201,720,849,153,369,1050,1428,284,107,1425,1080,1619,1009,129,723,1441,662,562,841,577,1312,1513,272,1043,1466,1462,1158,185,1118,505,480,897,9,1481,261,257,1438,1264,1166,506,969,145,679,724],"matrix2":[1527,1129,824,1190,864,398,535,121,248,504,954,1493,1512,1618,1583,814,1244,457,689,215,516,4,909,557,1536,243,911,1541,651,1101,357,1443,785,806,1578,1543,1332,641,586,797,311,823,1630,507,603,370,677,916,434,1139,1309,1176,1338,1066,1049,345,215,924,1005,345,795,27,769,1358,168,384,933,796,1083]} and error: Exception calling application: operands could not be broadcast together with shapes (55,) (69,)
Requesting to MatrixSubtraction with data: {"matrix1":[572,1168,247,264,566,483,1078,737,99,1478,996,260,573,252,451,927,1356,671,1183,262,203,870,784,447,534,25,1515,1320,450,1488,778,891,879,1490,349,884,808,841,1544,285,481,450,1227,1203,1479,1148,549,33,1446,1322,1602,1416,489,1317],"matrix2":[713,150,122,99,1386]} and error: Exception calling application: operands could not be broadcast together with shapes (54,) (5,)
Total Requests: 1400
Success: 1107
Failure: 293
Request per second: 1002.1474588403722
Erors are stored in errorResponse.json
```

Also fuzzer store request and related errors as json format named "errorResponse.json" file.

### Running videos

[A short fuzzing](./files/videos/short-running.mp4)
[Little long fuzzing](./files/videos/long-running.mp4)
[Fuzzing with verbose](./files/videos/with-verbose.mp4)

### Referances

[Referance Article](https://www.computer.org/csdl/proceedings-article/ase/2023/299600b840/1SBGj7J5pte)
[Proto Buffer](https://protobuf.dev/)
