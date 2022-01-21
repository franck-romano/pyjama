import { ServerRequest } from "./ServerRequest.ts";
import { HttpMethod } from "../route/HttpMethod.ts";

export class Request {
  private readonly _path;

  constructor(
    private req: ServerRequest,
  ) {
    this._path = new URL(req.url).pathname;
  }

  get method(): HttpMethod {
    return this.req.method as HttpMethod;
  }

  get path(): string {
    return this._path;
  }
}
