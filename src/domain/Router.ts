import { Route } from "./route/Route.ts";
import { Request } from "./request/Request.ts";

export interface Router {
  add(route: Route): void;

  resolve(request: Request): Route;
}
