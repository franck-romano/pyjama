import HTTPMethod from "./http-method.ts";

export default interface Route {
  method: HTTPMethod;
  path: string;
  handler: Function;
}
