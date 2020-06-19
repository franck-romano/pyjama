import { Route } from "../../domain/route.ts";
import Request from "../../domain/request.ts";
import { RouteNotFoundForRequestError } from "../../domain/errors/route-not-found-for-request-error.ts";

export default class RouteRegistry extends Array<Route> {
  constructor() {
    super();
  }

  hasRoute(route: Route): Boolean {
    return this.findIndex((r) =>
      route.method === r.method && route.path === r.path
    ) !== -1;
  }

  findRouteFromRequest(request: Request): Route {
    const route = this.find((route) =>
      route.method === request.httpMethod && route.path === request.path
    );

    if (!route) {
      throw new RouteNotFoundForRequestError();
    }

    return route;
  }
}
