import Route from "../../domain/route/route.ts";
import { ServerRequest } from "../../shared/deps.ts";
import Request from "../../domain/request/request.ts";
import RouteRegistry from "./route-registry.ts";
import RawRoute from "../../domain/route/raw-route.ts";
import RouteAlreadyExistsError from "../../domain/errors/route-already-exists-error.ts";
import BadRoutePathFormatError from "../../domain/errors/bad-route-path-format-error.ts";

export default class Router {
  constructor(private routeRegistry: RouteRegistry) {}

  add(rawRoute: RawRoute) {
    if (!rawRoute.path.startsWith("/")) {
      throw new BadRoutePathFormatError();
    }

    if (this.routeRegistry.hasMatchingRoute(rawRoute)) {
      throw new RouteAlreadyExistsError(rawRoute);
    }

    this.routeRegistry.register(new Route(rawRoute));
  }

  resolve(serverRequest: ServerRequest): Route {
    return this.routeRegistry.findMatchingRoute(serverRequest);
  }
}
