import { RawRoute, Route } from "../../domain/route/Route.ts";
import RouteNotFoundForRequestError from "../../domain/errors/route-not-found-for-request-error.ts";
import { ServerRequest } from "../../domain/request/ServerRequest.ts";
import { Request } from "../../domain/request/Request.ts";

export class RouteRegistry extends Array<Route> {
  constructor() {
    super();
  }

  register(route: Route) {
    this.push(route);
  }

  hasMatchingRoute(rawRoute: RawRoute): boolean {
    return this.findIndex((route) =>
      rawRoute.httpMethod === route.httpMethod &&
      route.regExpPattern.test(rawRoute.path)
    ) !== -1;
  }

  findMatchingRoute(serverRequest: Request): Route {
    const route = this.find((route) => {
      return route.httpMethod === serverRequest.method &&
        route.regExpPattern.test(serverRequest.path);
    });

    if (!route) {
      throw new RouteNotFoundForRequestError();
    }

    return route;
  }
}
