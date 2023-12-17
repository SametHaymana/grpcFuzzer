import proto.hello_pb2_grpc as hello_pb2_grpc
import proto.hello_pb2 as hello_pb2
import grpc
import concurrent.futures as futures


class HelloServer(hello_pb2_grpc.HelloServicer):
    def __init__(self):
        pass

    def Hello(self, request, context):
        response = hello_pb2.HelloResponse()
        response.message = f"Hello {request.name}"
        return response
    

    
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    hello_pb2_grpc.add_HelloServicer_to_server(HelloServer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print(f"Server Started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()