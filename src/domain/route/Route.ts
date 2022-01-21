import * as Regexp from "./UrlRegexp.ts";
import { HTTPMethod } from "../HTTPMethod.ts";
import { RouteHandler } from "./RouteHandler.ts";

export interface RouteOptions {
  method: HTTPMethod;
  path: string;
  handler: RouteHandler;
}

export class Route {
  private readonly pattern: RegExp;

  constructor(private options: RouteOptions) {
    this.pattern = this.buildRegexPatternFromPath();
  }

  get path(): string {
    return this.options.path;
  }

  get method(): HTTPMethod {
    return this.options.method;
  }

  get handler(): RouteHandler {
    return this.options.handler;
  }

  get regExpPattern(): RegExp {
    return this.pattern;
  }

  private buildRegexPatternFromPath(): RegExp {
    const pattern = this.path
      .replace(Regexp.ESCAPE_REGEXP, "\\$&")
      .replace(Regexp.OPTIONAL_PARAM_REGEXP, "(?:$1)?")
      .replace(
        Regexp.NAMED_PARAM_REGEXP,
        (match: string, optional: boolean) => optional ? match : "([^/?]+)",
      )
      .replace(Regexp.SPLAT_PARAM_REGEXP, () => "([^?]*?)");

    return new RegExp(`^${pattern}(?:\\?([\\s\\S]*))?$`);
  }
}
