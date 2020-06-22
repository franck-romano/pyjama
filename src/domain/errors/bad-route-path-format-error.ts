import Route from "../route/route.ts";

export default class BadRoutePathFormatError extends Error {
  constructor() {
    super(`Route path is not properly formatted`);
  }
}
