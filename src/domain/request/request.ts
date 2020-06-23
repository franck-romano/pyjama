import Route from "../route/route.ts";
import { ServerRequest } from "../../shared/deps.ts";

export default class Request {
  constructor(
    private rawRequest: ServerRequest,
    private matchingRoute: Route,
  ) {
  }
  get httpMethod(): string {
    return this.rawRequest.method;
  }
  get path(): string {
    return this.rawRequest.url;
  }

  get handler(): Function {
    return this.matchingRoute.handler;
  }
}
