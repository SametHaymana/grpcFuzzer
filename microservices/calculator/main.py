import proto.calculator_pb2 as calculator_pb2
import proto.calculator_pb2_grpc as calculator_pb2_grpc
import grpc
import time
import concurrent.futures as futures
import numpy as np

class CalculatorServer(calculator_pb2_grpc.CalculatorServicer):
    def __init__(self):
        pass

    def Sum(self, request, context):
        """
            Calculate sum on request array
        
        """
        numbers = np.array(request.numbers)
        result = calculator_pb2.SumResponse()
        result.sum = np.sum(numbers)
        return result
            


    def Average(self, request, context):
        avarage = np.average(request.numbers)
        # Pring param of response
        result = calculator_pb2.ComputeAverageResponse()
        result.average = avarage
        return result
    
    def Factorial(self, request, context):
        factorial = np.math.factorial(request.number)
        result = calculator_pb2.FactorialResponse()
        result.result = factorial
        return result
        
    def SquareRoot(self, request, context):
        square_root = np.sqrt(request.number)
        result = calculator_pb2.SquareRootResponse()
        result.result = square_root
        return result
        
        
    def CubeRoot(self, request, context):
        cube_root = np.cbrt(request.number)
        result = calculator_pb2.CubeRootResponse()
        result.result = cube_root
        return result
        

    def Max(self, request, context):
        max = np.max(request.numbers)
        result = calculator_pb2.MaxResponse()
        result.result = max
        return result
        

    def Min(self, request, context):
        min = np.min(request.numbers)
        result = calculator_pb2.MinResponse()
        result.result = min
        return result

    def Mean(self, request, context):
        mean = np.mean(request.numbers)
        result = calculator_pb2.MeanResponse()
        result.result = mean
        return result

    def Median(self, request, context):
        median = np.median(request.numbers)
        result = calculator_pb2.MedianResponse()
        result.result = median
        return result


    def Sin(self, request, context):
        sin = np.sin(request.angle)
        result = calculator_pb2.SinResponse()
        result.result = sin
        return result

    def Cos(self, request, context):
        cos = np.cos(request.angle)
        result = calculator_pb2.CosResponse()
        result.result = cos
        return result

    def Tan(self, request, context):
        tan = np.tan(request.angle)
        result = calculator_pb2.TanResponse()
        result.result = tan
        return result

    def MatrixAddition(self, request, context):
        matrix1 = np.array(request.matrix1)
        matrix2 = np.array(request.matrix2)
        result = calculator_pb2.MatrixAdditionResponse()
        resultMatrix = matrix1 + matrix2
        result.result.extend(resultMatrix.tolist())    
        return result
    
    def MatrixSubtraction(self, request, context):
        matrix1 = np.array(request.matrix1)
        matrix2 = np.array(request.matrix2)
        result = calculator_pb2.MatrixSubtractionResponse()
        resultMatrix = matrix1 - matrix2
        result.result.extend(resultMatrix.tolist())
        return result



    

    
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    calculator_pb2_grpc.add_CalculatorServicer_to_server(CalculatorServer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print(f"Server Started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()