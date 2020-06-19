import { Route } from "./route.ts";

export interface NormalizedRoute extends Route {
  segments: Array<string>;
}
