export default class RouteNotFoundForRequestError extends Error {
  constructor() {
    super(`No route found for the given request`);
  }
}
