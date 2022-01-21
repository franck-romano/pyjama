import { Route } from "../../domain/route/Route.ts";
import { RouteRegistry } from "./RouteRegistry.ts";
import RouteAlreadyExistsError from "../../domain/errors/route-already-exists-error.ts";
import BadRoutePathFormatError from "../../domain/errors/bad-route-path-format-error.ts";
import { Request } from "../../domain/request/Request.ts";

export class Router {
  constructor(private routeRegistry: RouteRegistry) {
  }

  add(route: Route) {
    if (!route.path.startsWith("/")) {
      throw new BadRoutePathFormatError();
    }

    if (this.routeRegistry.hasMatchingRoute(route)) {
      throw new RouteAlreadyExistsError(route);
    }

    this.routeRegistry.register(route);
  }

  resolve(request: Request): Route {
    return this.routeRegistry.findMatchingRoute(request);
  }
}
