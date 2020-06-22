import RawRoute from "./raw-route.ts";
import * as Regexp from "./url-regexp.ts";
import HTTPMethod from "./http-method.ts";

export default class Route {
  private pattern: RegExp;

  constructor(private rawRoute: RawRoute) {
    this.pattern = this.buildRegexPatternFromPath();
  }

  get path(): string {
    return this.rawRoute.path;
  }
  get httpMethod(): HTTPMethod {
    return this.rawRoute.httpMethod;
  }
  get handler(): Function {
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
      .replace(Regexp.SPLAT_PARAM, () => "([^?]*?)");

    return new RegExp(`^${pattern}(?:\\?([\\s\\S]*))?$`);
  }
}
