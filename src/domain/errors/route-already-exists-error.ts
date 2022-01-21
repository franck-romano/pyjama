import { RouteOptions } from "../route/Route.ts";

export default class RouteAlreadyExistsError extends Error {
  constructor(rawRoute: RouteOptions) {
    super(
      `Route already configured for ${rawRoute.httpMethod} and path ${rawRoute.path}`,
    );
  }
}
