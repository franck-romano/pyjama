import { assertEquals, test } from "../dev-deps.ts";
import { Route } from "../../src/domain/route/Route.ts";
import { HttpMethod } from "../../src/domain/route/HttpMethod.ts";
import { RouteRegistry } from "../../src/infrastructure/router/RouteRegistry.ts";

test(".add() - adds a route to the registry", () => {
  // GIVEN
  const route = new Route({
    httpMethod: HttpMethod.DELETE,
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
  const rawRoute = {
    httpMethod: HttpMethod.DELETE,
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
  const rawRoute = {
    httpMethod: HttpMethod.DELETE,
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
