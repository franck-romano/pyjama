import { RouteHandler } from "./handler.ts";
import HTTPMethod from "../../shared/http-method.ts";

export default interface RawRoute {
  httpMethod: HTTPMethod;
  path: string;
  handler: RouteHandler;
}
