import { test, assertEquals } from "../dev-deps.ts";
import Route from "../../src/domain/route/route.ts";
import RawRoute from "../../src/domain/route/raw-route.ts";
import HTTPMethod from "../../src/domain/route/http-method.ts";
import RouteRegistry from "../../src/infrastructure/router/route-registry.ts";

test(".add() - adds a route to the registry", () => {
  // GIVEN
  const route = new Route({
    httpMethod: HTTPMethod.DELETE,
    path: "/some-path",
    handler: () => {},
  });
  // WHEN
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);
  // THEN
  assertEquals(routeRegistry.length, 1);
});

test(".hasMatchingRoute() - returns false when no matching route found", () => {
  // GIVEN
  const rawRoute: RawRoute = {
    httpMethod: HTTPMethod.DELETE,
    path: "/some-path",
    handler: () => {},
  };

  const routeRegistry = new RouteRegistry();
  // WHEN
  const actual = routeRegistry.hasMatchingRoute(rawRoute);
  // THEN
  assertEquals(actual, false);
});

test(".hasMatchingRoute() - returns true when matching route found", () => {
  // GIVEN
  const rawRoute: RawRoute = {
    httpMethod: HTTPMethod.DELETE,
    path: "/some-path",
    handler: () => {},
  };

  const route = new Route(rawRoute);
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);
  // WHEN
  routeRegistry.register(route);
  const actual = routeRegistry.hasMatchingRoute(rawRoute);
  // THEN
  assertEquals(actual, true);
});
