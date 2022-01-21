import { RawRoute, Route } from "../../domain/route/Route.ts";
import { RouteRegistry } from "./RouteRegistry.ts";
import RouteAlreadyExistsError from "../../domain/errors/route-already-exists-error.ts";
import BadRoutePathFormatError from "../../domain/errors/bad-route-path-format-error.ts";
import { ServerRequest } from "../../domain/request/ServerRequest.ts";

export class Router {
  constructor(private routeRegistry: RouteRegistry) {}

  add(route: RawRoute) {
    if (!route.path.startsWith("/")) {
      throw new BadRoutePathFormatError();
    }

    if (this.routeRegistry.hasMatchingRoute(route)) {
      throw new RouteAlreadyExistsError(route);
    }

    this.routeRegistry.register(new Route(route));
  }

  resolve(request: ServerRequest): Route {
    return this.routeRegistry.findMatchingRoute(request);
  }
}
