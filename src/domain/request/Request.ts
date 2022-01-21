import { ServerRequest } from "./ServerRequest.ts";
import { HTTPMethod } from "../HTTPMethod.ts";

export class Request {
  private readonly _path;

  constructor(
    private req: ServerRequest,
  ) {
    this._path = new URL(req.url).pathname;
  }

  get method(): HTTPMethod {
    return this.req.method as HTTPMethod;
  }

  get path(): string {
    return this._path;
  }
}
