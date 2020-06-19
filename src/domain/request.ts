import { ServerRequest } from "../shared/deps.ts";
import { RequestParams } from "./request-params.ts";

export default class Request {
  constructor(private method: String, private pathname: String) {
  }
  get httpMethod(): String {
    return this.method;
  }
  get path(): String {
    return this.pathname;
  }
}
