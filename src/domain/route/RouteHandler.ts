import { Request } from "../request/Request.ts";

export type ResponseBody = null | string;
export type RouteHandlerResult = ResponseBody;

export type RouteHandler = (request: Request) => RouteHandlerResult;
