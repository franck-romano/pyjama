import { RawRoute } from "../route/Route.ts";

export default class RouteAlreadyExistsError extends Error {
  constructor(rawRoute: RawRoute) {
    super(
      `Route already configured for ${rawRoute.httpMethod} and path ${rawRoute.path}`,
    );
  }
}
