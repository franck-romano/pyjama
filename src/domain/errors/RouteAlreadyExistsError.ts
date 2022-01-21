import { Route } from "../route/Route.ts";

export default class RouteAlreadyExistsError extends Error {
  constructor(route: Route) {
    super(
      `Route already configured for ${route.method} and path ${route.path}`,
    );
  }
}
