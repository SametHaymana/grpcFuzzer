# Calculator microservice

This service provide some math functions also include matrix manipulations function that callable grpc server.

To start server

```bash
pip install -r requirement.txt

```

```bash
python3 main.py
```

Server defoult run on port 50051.

#### Compiling Proto Buffer

For Compile proto

```bash

python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. proto/calculator.proto

```
