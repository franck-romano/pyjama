import { RouteHandlerResult } from "../route/handler.ts";

interface SerializedResponse {
  body: string;
  headers: Headers;
}

export default class Response {
  private responseBody: string;
  private responseHeaders: Headers;

  constructor(result: RouteHandlerResult) {
    const { body, headers } = this.serializeResult(result);
    this.responseBody = body;
    this.responseHeaders = headers;
  }

  get body() {
    return this.responseBody;
  }
  get headers(): Headers {
    return this.responseHeaders;
  }

  private serializeResult(result: RouteHandlerResult): SerializedResponse {
    const isString = (result: RouteHandlerResult): Boolean =>
      typeof result === "string";

    const isJSONStringifyable = (result: RouteHandlerResult): Boolean =>
      ["number", "object", "boolean"].includes(typeof result);

    if (isString(result)) {
      return {
        body: result as string,
        headers: new Headers(
          { "content-type": "text/html; charset=utf-8" },
        ),
      };
    }

    if (isJSONStringifyable(result)) {
      return {
        body: JSON.stringify(result),
        headers: new Headers(
          { "content-type": "application/json; charset=utf-8" },
        ),
      };
    }
    throw Error("Unsupported response type");
  }
}
