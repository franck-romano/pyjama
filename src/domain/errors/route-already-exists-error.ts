import Route from "../route/route.ts";

export default class RouteAlreadyExistsError extends Error {
  constructor(route: Route) {
    super(
      `Route already configured for ${route.method} and path ${route.path}`,
    );
  }
}
