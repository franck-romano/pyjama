import Request from "../../domain/request.ts";
import Route from "../../domain/route/route.ts";
import RouteNotFoundForRequestError from "../../domain/errors/route-not-found-for-request-error.ts";
import RawRoute from "../../domain/route/raw-route.ts";

export default class RouteRegistry extends Array<Route> {
  constructor() {
    super();
  }

  register(route: Route) {
    this.push(route);
  }

  hasMatchingRoute(rawRoute: RawRoute): Boolean {
    return this.findIndex((route) =>
      rawRoute.httpMethod === route.httpMethod &&
      route.regExpPattern.test(rawRoute.path)
    ) !== -1;
  }

  findMatchingRoute(request: Request): Route {
    const route = this.find((route) =>
      route.httpMethod === request.httpMethod &&
      route.regExpPattern.test(request.path)
    );

    if (!route) {
      throw new RouteNotFoundForRequestError();
    }

    return route;
  }
}
