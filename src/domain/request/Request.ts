import { ServerRequest } from "./ServerRequest.ts";

export class Request {
  constructor(
    private rawRequest: ServerRequest,
  ) {
  }

  get httpMethod(): string {
    return this.rawRequest.method;
  }

  get path(): string {
    return this.rawRequest.url;
  }
}
