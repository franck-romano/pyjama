import { Route } from "../../domain/route/Route.ts";
import RouteNotFoundForRequestError from "../../domain/errors/RouteNotFoundForRequestError.ts";
import { Request } from "../../domain/request/Request.ts";
import { HTTPMethod } from "../../domain/HTTPMethod.ts";

export class RouteRegistry extends Array<Route> {
  constructor() {
    super();
  }

  register(route: Route) {
    this.push(route);
  }

  hasMatchingRoute(method: HTTPMethod, path: string): boolean {
    return this.findIndex((route) =>
      method === route.method &&
      route.regExpPattern.test(path)
    ) !== -1;
  }

  findMatchingRoute(request: Request): Route {
    const route = this.find((route) => {
      return route.method === request.method &&
        route.regExpPattern.test(request.path);
    });

    if (!route) {
      throw new RouteNotFoundForRequestError();
    }

    return route;
  }
}
