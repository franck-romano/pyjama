import Route from "../../domain/route/route.ts";
import { ServerRequest } from "../../shared/deps.ts";
import RawRoute from "../../domain/route/raw-route.ts";
import RouteNotFoundForRequestError from "../../domain/errors/route-not-found-for-request-error.ts";

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

  findMatchingRoute(serverRequest: ServerRequest): Route {
    const route = this.find((route) =>
      route.httpMethod === serverRequest.method &&
      route.regExpPattern.test(serverRequest.url)
    );

    if (!route) {
      throw new RouteNotFoundForRequestError();
    }

    return route;
  }
}
