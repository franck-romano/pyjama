import Route from "../route/route.ts";
import { ServerRequest } from "../../shared/deps.ts";
import HTTPMethod from "../../shared/http-method.ts";

export default class Request {
  constructor(
    private rawRequest: ServerRequest,
    private matchingRoute: Route,
  ) {
  }
  get httpMethod(): HTTPMethod {
    return this.rawRequest.method as HTTPMethod;
  }
  get path(): string {
    return this.rawRequest.url;
  }
}
