/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export interface Cat {
  id: number;
  name: string;
  breed?: string | undefined;
  age?: number | undefined;
}

export interface GetCatsRequest {
  page: number;
  limit: number;
}

export interface GetCatsResponse {
  cats: Cat[];
}

export interface GetCatRequest {
  id: number;
}

export interface GetCatResponse {
  cat?: Cat | undefined;
}

export interface CreateCatRequest {
  name: string;
  breed?: string | undefined;
  age?: number | undefined;
}

export interface CreateCatResponse {
  cat?: Cat | undefined;
}

export interface UpdateCatRequest {
  id: number;
  name?: string | undefined;
  breed?: string | undefined;
  age?: number | undefined;
}

export interface UpdateCatResponse {
  cat?: Cat | undefined;
}

export interface DeleteCatRequest {
  id: number;
}

export interface DeleteCatResponse {
  cat?: Cat | undefined;
}

function createBaseCat(): Cat {
  return { id: 0, name: "", breed: undefined, age: undefined };
}

export const Cat = {
  encode(message: Cat, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.breed !== undefined) {
      writer.uint32(26).string(message.breed);
    }
    if (message.age !== undefined) {
      writer.uint32(32).int32(message.age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Cat {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.breed = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.age = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Cat {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      breed: isSet(object.breed) ? globalThis.String(object.breed) : undefined,
      age: isSet(object.age) ? globalThis.Number(object.age) : undefined,
    };
  },

  toJSON(message: Cat): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.breed !== undefined) {
      obj.breed = message.breed;
    }
    if (message.age !== undefined) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Cat>, I>>(base?: I): Cat {
    return Cat.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Cat>, I>>(object: I): Cat {
    const message = createBaseCat();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.breed = object.breed ?? undefined;
    message.age = object.age ?? undefined;
    return message;
  },
};

function createBaseGetCatsRequest(): GetCatsRequest {
  return { page: 0, limit: 0 };
}

export const GetCatsRequest = {
  encode(message: GetCatsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== 0) {
      writer.uint32(8).int32(message.page);
    }
    if (message.limit !== 0) {
      writer.uint32(16).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCatsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCatsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.limit = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCatsRequest {
    return {
      page: isSet(object.page) ? globalThis.Number(object.page) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
    };
  },

  toJSON(message: GetCatsRequest): unknown {
    const obj: any = {};
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCatsRequest>, I>>(base?: I): GetCatsRequest {
    return GetCatsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCatsRequest>, I>>(object: I): GetCatsRequest {
    const message = createBaseGetCatsRequest();
    message.page = object.page ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  },
};

function createBaseGetCatsResponse(): GetCatsResponse {
  return { cats: [] };
}

export const GetCatsResponse = {
  encode(message: GetCatsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.cats) {
      Cat.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCatsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cats.push(Cat.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCatsResponse {
    return { cats: globalThis.Array.isArray(object?.cats) ? object.cats.map((e: any) => Cat.fromJSON(e)) : [] };
  },

  toJSON(message: GetCatsResponse): unknown {
    const obj: any = {};
    if (message.cats?.length) {
      obj.cats = message.cats.map((e) => Cat.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCatsResponse>, I>>(base?: I): GetCatsResponse {
    return GetCatsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCatsResponse>, I>>(object: I): GetCatsResponse {
    const message = createBaseGetCatsResponse();
    message.cats = object.cats?.map((e) => Cat.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetCatRequest(): GetCatRequest {
  return { id: 0 };
}

export const GetCatRequest = {
  encode(message: GetCatRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCatRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCatRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCatRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetCatRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCatRequest>, I>>(base?: I): GetCatRequest {
    return GetCatRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCatRequest>, I>>(object: I): GetCatRequest {
    const message = createBaseGetCatRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseGetCatResponse(): GetCatResponse {
  return { cat: undefined };
}

export const GetCatResponse = {
  encode(message: GetCatResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cat !== undefined) {
      Cat.encode(message.cat, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCatResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCatResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cat = Cat.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCatResponse {
    return { cat: isSet(object.cat) ? Cat.fromJSON(object.cat) : undefined };
  },

  toJSON(message: GetCatResponse): unknown {
    const obj: any = {};
    if (message.cat !== undefined) {
      obj.cat = Cat.toJSON(message.cat);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetCatResponse>, I>>(base?: I): GetCatResponse {
    return GetCatResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetCatResponse>, I>>(object: I): GetCatResponse {
    const message = createBaseGetCatResponse();
    message.cat = (object.cat !== undefined && object.cat !== null) ? Cat.fromPartial(object.cat) : undefined;
    return message;
  },
};

function createBaseCreateCatRequest(): CreateCatRequest {
  return { name: "", breed: undefined, age: undefined };
}

export const CreateCatRequest = {
  encode(message: CreateCatRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.breed !== undefined) {
      writer.uint32(18).string(message.breed);
    }
    if (message.age !== undefined) {
      writer.uint32(24).int32(message.age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCatRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCatRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.breed = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.age = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCatRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      breed: isSet(object.breed) ? globalThis.String(object.breed) : undefined,
      age: isSet(object.age) ? globalThis.Number(object.age) : undefined,
    };
  },

  toJSON(message: CreateCatRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.breed !== undefined) {
      obj.breed = message.breed;
    }
    if (message.age !== undefined) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCatRequest>, I>>(base?: I): CreateCatRequest {
    return CreateCatRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCatRequest>, I>>(object: I): CreateCatRequest {
    const message = createBaseCreateCatRequest();
    message.name = object.name ?? "";
    message.breed = object.breed ?? undefined;
    message.age = object.age ?? undefined;
    return message;
  },
};

function createBaseCreateCatResponse(): CreateCatResponse {
  return { cat: undefined };
}

export const CreateCatResponse = {
  encode(message: CreateCatResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cat !== undefined) {
      Cat.encode(message.cat, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCatResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateCatResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cat = Cat.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateCatResponse {
    return { cat: isSet(object.cat) ? Cat.fromJSON(object.cat) : undefined };
  },

  toJSON(message: CreateCatResponse): unknown {
    const obj: any = {};
    if (message.cat !== undefined) {
      obj.cat = Cat.toJSON(message.cat);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateCatResponse>, I>>(base?: I): CreateCatResponse {
    return CreateCatResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateCatResponse>, I>>(object: I): CreateCatResponse {
    const message = createBaseCreateCatResponse();
    message.cat = (object.cat !== undefined && object.cat !== null) ? Cat.fromPartial(object.cat) : undefined;
    return message;
  },
};

function createBaseUpdateCatRequest(): UpdateCatRequest {
  return { id: 0, name: undefined, breed: undefined, age: undefined };
}

export const UpdateCatRequest = {
  encode(message: UpdateCatRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.breed !== undefined) {
      writer.uint32(26).string(message.breed);
    }
    if (message.age !== undefined) {
      writer.uint32(32).int32(message.age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCatRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCatRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.breed = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.age = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateCatRequest {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      breed: isSet(object.breed) ? globalThis.String(object.breed) : undefined,
      age: isSet(object.age) ? globalThis.Number(object.age) : undefined,
    };
  },

  toJSON(message: UpdateCatRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.breed !== undefined) {
      obj.breed = message.breed;
    }
    if (message.age !== undefined) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCatRequest>, I>>(base?: I): UpdateCatRequest {
    return UpdateCatRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCatRequest>, I>>(object: I): UpdateCatRequest {
    const message = createBaseUpdateCatRequest();
    message.id = object.id ?? 0;
    message.name = object.name ?? undefined;
    message.breed = object.breed ?? undefined;
    message.age = object.age ?? undefined;
    return message;
  },
};

function createBaseUpdateCatResponse(): UpdateCatResponse {
  return { cat: undefined };
}

export const UpdateCatResponse = {
  encode(message: UpdateCatResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cat !== undefined) {
      Cat.encode(message.cat, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCatResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateCatResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cat = Cat.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateCatResponse {
    return { cat: isSet(object.cat) ? Cat.fromJSON(object.cat) : undefined };
  },

  toJSON(message: UpdateCatResponse): unknown {
    const obj: any = {};
    if (message.cat !== undefined) {
      obj.cat = Cat.toJSON(message.cat);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateCatResponse>, I>>(base?: I): UpdateCatResponse {
    return UpdateCatResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateCatResponse>, I>>(object: I): UpdateCatResponse {
    const message = createBaseUpdateCatResponse();
    message.cat = (object.cat !== undefined && object.cat !== null) ? Cat.fromPartial(object.cat) : undefined;
    return message;
  },
};

function createBaseDeleteCatRequest(): DeleteCatRequest {
  return { id: 0 };
}

export const DeleteCatRequest = {
  encode(message: DeleteCatRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCatRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteCatRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteCatRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: DeleteCatRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteCatRequest>, I>>(base?: I): DeleteCatRequest {
    return DeleteCatRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteCatRequest>, I>>(object: I): DeleteCatRequest {
    const message = createBaseDeleteCatRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseDeleteCatResponse(): DeleteCatResponse {
  return { cat: undefined };
}

export const DeleteCatResponse = {
  encode(message: DeleteCatResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cat !== undefined) {
      Cat.encode(message.cat, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCatResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteCatResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cat = Cat.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteCatResponse {
    return { cat: isSet(object.cat) ? Cat.fromJSON(object.cat) : undefined };
  },

  toJSON(message: DeleteCatResponse): unknown {
    const obj: any = {};
    if (message.cat !== undefined) {
      obj.cat = Cat.toJSON(message.cat);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteCatResponse>, I>>(base?: I): DeleteCatResponse {
    return DeleteCatResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteCatResponse>, I>>(object: I): DeleteCatResponse {
    const message = createBaseDeleteCatResponse();
    message.cat = (object.cat !== undefined && object.cat !== null) ? Cat.fromPartial(object.cat) : undefined;
    return message;
  },
};

export type CatsService = typeof CatsService;
export const CatsService = {
  getCats: {
    path: "/Cat.Cats/GetCats",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetCatsRequest) => Buffer.from(GetCatsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetCatsRequest.decode(value),
    responseSerialize: (value: GetCatsResponse) => Buffer.from(GetCatsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetCatsResponse.decode(value),
  },
  getCat: {
    path: "/Cat.Cats/GetCat",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetCatRequest) => Buffer.from(GetCatRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetCatRequest.decode(value),
    responseSerialize: (value: GetCatResponse) => Buffer.from(GetCatResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetCatResponse.decode(value),
  },
  createCat: {
    path: "/Cat.Cats/CreateCat",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateCatRequest) => Buffer.from(CreateCatRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateCatRequest.decode(value),
    responseSerialize: (value: CreateCatResponse) => Buffer.from(CreateCatResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateCatResponse.decode(value),
  },
  updateCat: {
    path: "/Cat.Cats/UpdateCat",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateCatRequest) => Buffer.from(UpdateCatRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateCatRequest.decode(value),
    responseSerialize: (value: UpdateCatResponse) => Buffer.from(UpdateCatResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateCatResponse.decode(value),
  },
  deleteCat: {
    path: "/Cat.Cats/DeleteCat",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteCatRequest) => Buffer.from(DeleteCatRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteCatRequest.decode(value),
    responseSerialize: (value: DeleteCatResponse) => Buffer.from(DeleteCatResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteCatResponse.decode(value),
  },
} as const;

export interface CatsServer extends UntypedServiceImplementation {
  getCats: handleUnaryCall<GetCatsRequest, GetCatsResponse>;
  getCat: handleUnaryCall<GetCatRequest, GetCatResponse>;
  createCat: handleUnaryCall<CreateCatRequest, CreateCatResponse>;
  updateCat: handleUnaryCall<UpdateCatRequest, UpdateCatResponse>;
  deleteCat: handleUnaryCall<DeleteCatRequest, DeleteCatResponse>;
}

export interface CatsClient extends Client {
  getCats(
    request: GetCatsRequest,
    callback: (error: ServiceError | null, response: GetCatsResponse) => void,
  ): ClientUnaryCall;
  getCats(
    request: GetCatsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetCatsResponse) => void,
  ): ClientUnaryCall;
  getCats(
    request: GetCatsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetCatsResponse) => void,
  ): ClientUnaryCall;
  getCat(
    request: GetCatRequest,
    callback: (error: ServiceError | null, response: GetCatResponse) => void,
  ): ClientUnaryCall;
  getCat(
    request: GetCatRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetCatResponse) => void,
  ): ClientUnaryCall;
  getCat(
    request: GetCatRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetCatResponse) => void,
  ): ClientUnaryCall;
  createCat(
    request: CreateCatRequest,
    callback: (error: ServiceError | null, response: CreateCatResponse) => void,
  ): ClientUnaryCall;
  createCat(
    request: CreateCatRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateCatResponse) => void,
  ): ClientUnaryCall;
  createCat(
    request: CreateCatRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateCatResponse) => void,
  ): ClientUnaryCall;
  updateCat(
    request: UpdateCatRequest,
    callback: (error: ServiceError | null, response: UpdateCatResponse) => void,
  ): ClientUnaryCall;
  updateCat(
    request: UpdateCatRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateCatResponse) => void,
  ): ClientUnaryCall;
  updateCat(
    request: UpdateCatRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateCatResponse) => void,
  ): ClientUnaryCall;
  deleteCat(
    request: DeleteCatRequest,
    callback: (error: ServiceError | null, response: DeleteCatResponse) => void,
  ): ClientUnaryCall;
  deleteCat(
    request: DeleteCatRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteCatResponse) => void,
  ): ClientUnaryCall;
  deleteCat(
    request: DeleteCatRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteCatResponse) => void,
  ): ClientUnaryCall;
}

export const CatsClient = makeGenericClientConstructor(CatsService, "Cat.Cats") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): CatsClient;
  service: typeof CatsService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
