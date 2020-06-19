import { Route } from "../route.ts";

export class RouteAlreadyExistsError extends Error {
  constructor(route: Route) {
    super(
      `Route already configured for ${route.method} and path ${route.path}`,
    );
  }
}
