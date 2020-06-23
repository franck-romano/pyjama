import Request from "../request/request.ts";

type JSONStringifyable = boolean | null | number | object | string;

export type ResponseBody = JSONStringifyable;
export type RouteHandlerResult =
  | ResponseBody
  | Error
  | Promise<ResponseBody | Error>;

export type RouteHandler = (request: Request) => RouteHandlerResult;
