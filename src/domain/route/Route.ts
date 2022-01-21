import * as Regexp from "./UrlRegexp.ts";
import { HttpMethod } from "./HttpMethod.ts";
import { Handler } from "../../shared/Handler.ts";

export interface RawRoute {
  httpMethod: HttpMethod;
  path: string;
  handler: Handler;
}

export class Route {
  private readonly pattern: RegExp;

  constructor(private rawRoute: RawRoute) {
    this.pattern = this.buildRegexPatternFromPath();
  }

  get path(): string {
    return this.rawRoute.path;
  }

  get httpMethod(): HttpMethod {
    return this.rawRoute.httpMethod;
  }

  get handler(): Handler {
    return this.rawRoute.handler;
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
