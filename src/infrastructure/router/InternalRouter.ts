import { Route } from "../../domain/route/Route.ts";
import { RouteRegistry } from "./RouteRegistry.ts";
import RouteAlreadyExistsError from "../../domain/errors/RouteAlreadyExistsError.ts";
import BadRoutePathFormatError from "../../domain/errors/BadRoutePathFormatError.ts";
import { Request } from "../../domain/request/Request.ts";
import { Router } from "../../domain/Router.ts";

export class InternalRouter implements Router {
  constructor(private routeRegistry: RouteRegistry) {
  }

  add(route: Route) {
    if (!route.path.startsWith("/")) {
      throw new BadRoutePathFormatError();
    }

    if (this.routeRegistry.hasMatchingRoute(route.method, route.path)) {
      throw new RouteAlreadyExistsError(route);
    }

    this.routeRegistry.register(route);
  }

  resolve(request: Request): Route {
    return this.routeRegistry.findMatchingRoute(request);
  }
}
