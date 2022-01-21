import { assertEquals, assertThrows, test } from "../dev-deps.ts";
import { Route } from "../../src/domain/route/Route.ts";
import { RouteRegistry } from "../../src/infrastructure/router/RouteRegistry.ts";
import { Request as PyjamaRequest } from "../../src/domain/request/Request.ts";
import RouteNotFoundForRequestError from "../../src/domain/errors/RouteNotFoundForRequestError.ts";

test(".add() - adds a route to the registry", () => {
  // GIVEN
  const route = new Route({
    method: "DELETE",
    path: "/some-path",
    handler: () => {
      return "Some Data";
    },
  });

  // WHEN
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);

  // THEN
  assertEquals(routeRegistry.length, 1);
});

test(".hasMatchingRoute() - returns false when no matching route found", () => {
  // GIVEN
  const routeRegistry = new RouteRegistry();

  // WHEN
  const actual = routeRegistry.hasMatchingRoute(
    "DELETE",
    "/some-path",
  );

  // THEN
  assertEquals(actual, false);
});

test(".hasMatchingRoute() - returns true when matching route found", () => {
  // GIVEN
  const route = new Route({
    method: "DELETE",
    path: "/some-path",
    handler: () => {
      return "Some Data";
    },
  });
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);

  // WHEN
  const actual = routeRegistry.hasMatchingRoute(route.method, route.path);

  // THEN
  assertEquals(actual, true);
});

test(".hasMatchingRoute() - returns false when method does not match", () => {
  // GIVEN
  const route = new Route({
    method: "DELETE",
    path: "/some-path",
    handler: () => {
      return "Some Data";
    },
  });
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);

  // WHEN
  const actual = routeRegistry.hasMatchingRoute("GET", route.path);

  // THEN
  assertEquals(actual, false);
});

test(".hasMatchingRoute() - returns false when path does not match", () => {
  // GIVEN
  const route = new Route({
    method: "DELETE",
    path: "/some-path",
    handler: () => {
      return "Some Data";
    },
  });
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);

  // WHEN
  const actual = routeRegistry.hasMatchingRoute(route.method, "/other-path");

  // THEN
  assertEquals(actual, false);
});

test(".findMatchingRoute() - raises an error when path does not match", () => {
  // GIVEN
  const route = new Route({
    method: "GET",
    path: "/some-path",
    handler: () => {
      return "Some Data";
    },
  });
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);

  // WHEN & THEN
  assertThrows(
    () =>
      routeRegistry.findMatchingRoute(
        new PyjamaRequest(new Request("https://fake-url/other-path")),
      ),
    RouteNotFoundForRequestError,
  );
});

test(".findMatchingRoute() - raises an error when method does not match", () => {
  // GIVEN
  const route = new Route({
    method: "DELETE",
    path: "/some-path",
    handler: () => {
      return "Some Data";
    },
  });
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);

  // WHEN & THEN
  assertThrows(
    () =>
      routeRegistry.findMatchingRoute(
        new PyjamaRequest(new Request("https://fake-url/some-path")),
      ),
    RouteNotFoundForRequestError,
  );
});

test(".findMatchingRoute() - returns the matching route", () => {
  // GIVEN
  const route = new Route({
    method: "GET",
    path: "/some-path",
    handler: () => {
      return "Some Data";
    },
  });
  const routeRegistry = new RouteRegistry();
  routeRegistry.register(route);

  // WHEN
  const actual = routeRegistry.findMatchingRoute(
    new PyjamaRequest(new Request("https://fake-url/some-path")),
  );

  // THEN
  assertEquals(actual, route);
});
