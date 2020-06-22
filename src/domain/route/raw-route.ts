import HTTPMethod from "./http-method.ts";

export default interface RawRoute {
  httpMethod: HTTPMethod;
  path: string;
  handler: Function;
}
