import { RequestParams } from "./request-params.ts";
import { NormalizedRoute } from "./normalized-route.ts";

export interface MatchedRoute extends NormalizedRoute {
  params: RequestParams;
}
