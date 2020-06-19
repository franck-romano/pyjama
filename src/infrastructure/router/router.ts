import Route from "../../domain/route/route.ts";
import Request from "../../domain/request.ts";
import RouteRegistry from "./route-registry.ts";
import RouteAlreadyExistsError from "../../domain/errors/route-already-exists-error.ts";

export default class Router {
  constructor(private routeRegistry: RouteRegistry) {}

  add(route: Route): void {
    if (this.routeRegistry.hasRoute(route)) {
      throw new RouteAlreadyExistsError(route);
    } else {
      this.routeRegistry.push(route);
    }
  }

  resolve(request: Request): Route {
    return this.routeRegistry.findRouteFromRequest(request);
  }
}
