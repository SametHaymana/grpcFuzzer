import {
  handleUnaryCall,
  UntypedHandleCall,
  ServerUnaryCall,
  sendUnaryData,
  status,
} from "@grpc/grpc-js";
import {
  CatsServer,
  CreateCatRequest,
  CreateCatResponse,
  DeleteCatRequest,
  DeleteCatResponse,
  GetCatRequest,
  GetCatResponse,
  GetCatsRequest,
  GetCatsResponse,
  UpdateCatRequest,
  UpdateCatResponse,
} from "../dtos/cats";
import { Cat } from "../model/cats.model";
import { CatRepository } from "../repository/cats.repository";

const catRepo = new CatRepository();

export class CatService implements CatsServer {
  [name: string]: UntypedHandleCall;
  getCats: handleUnaryCall<GetCatsRequest, GetCatsResponse> = async (
    call: ServerUnaryCall<GetCatsRequest, GetCatsResponse>,
    callback: sendUnaryData<GetCatsResponse>
  ) => {
    try {
      const { page, limit } = call.request;

      const cats = await catRepo.getCats(page, limit);
      return callback(null, { cats });
    } catch (err: any) {
      console.log(err);
      return callback(
        {
          code: status.INTERNAL,
          message: err?.message,
        },
        null
      );
    }
  };
  getCat: handleUnaryCall<GetCatRequest, GetCatResponse> = async (
    call: ServerUnaryCall<GetCatRequest, GetCatResponse>,
    callback: sendUnaryData<GetCatResponse>
  ) => {
    try {
      const { id } = call.request;

      const cat = await catRepo.getCatById(id);
      return callback(null, { cat });
    } catch (err: any) {
      console.log(err);
      return callback(
        {
          code: status.INTERNAL,
          message: err?.message,
        },
        null
      );
    }
  };
  createCat: handleUnaryCall<CreateCatRequest, CreateCatResponse> = async (
    call: ServerUnaryCall<CreateCatRequest, CreateCatResponse>,
    callback: sendUnaryData<CreateCatResponse>
  ) => {
    try {
      const { name, age, breed } = call.request;

      const cat = await catRepo.createCat(name, age, breed);

      return callback(null, { cat });
    } catch (err: any) {
      console.log(err);
      return callback(
        {
          code: status.INTERNAL,
          message: err?.message,
        },
        null
      );
    }
  };
  updateCat: handleUnaryCall<UpdateCatRequest, UpdateCatResponse> = async (
    call: ServerUnaryCall<UpdateCatRequest, UpdateCatResponse>,
    callback: sendUnaryData<UpdateCatResponse>
  ) => {
    try {
      const { id, name, age, breed } = call.request;

      const cat = await catRepo.updateCat(id, name, age, breed);

      return callback(null, { cat });
    } catch (err: any) {
      console.log(err);
      return callback(
        {
          code: status.INTERNAL,
          message: err?.message,
        },
        null
      );
    }
  };
  deleteCat: handleUnaryCall<DeleteCatRequest, DeleteCatResponse> = async (
    call: ServerUnaryCall<DeleteCatRequest, DeleteCatResponse>,
    callback: sendUnaryData<DeleteCatResponse>
  ) => {
    try {
      const { id } = call.request;
      const cat = await catRepo.deleteCat(id);

      return callback(null, { cat });
    } catch (err: any) {
      console.log(err);
      return callback(
        {
          code: status.INTERNAL,
          message: err?.message,
        },
        null
      );
    }
  };
}
