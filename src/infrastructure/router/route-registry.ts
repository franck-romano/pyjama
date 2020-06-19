import { Route } from "../../domain/route.ts";

export default class RouteRegistry extends Array<Route> {
  constructor() {
    super();
  }

  hasRoute(route: Route): Boolean {
    return this.findIndex((r) =>
      route.method === r.method && route.path === r.path
    ) !== -1;
  }
}
