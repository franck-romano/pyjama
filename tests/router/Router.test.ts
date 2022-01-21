import { assertNotEquals, assertThrows, test } from "../dev-deps.ts";
import { InternalRouter } from "../../src/infrastructure/router/InternalRouter.ts";
import { HTTPMethod } from "../../src/domain/HTTPMethod.ts";
import { RouteRegistry } from "../../src/infrastructure/router/RouteRegistry.ts";
import RouteAlreadyExistsError from "../../src/domain/errors/RouteAlreadyExistsError.ts";
import BadRoutePathFormatError from "../../src/domain/errors/BadRoutePathFormatError.ts";
import { Route } from "../../src/domain/route/Route.ts";

test("throws if the route path is not well formatted", () => {
  // GIVEN
  const route = new Route({
    method: "GET",
    path: "some_wrong_path",
    handler: () => {
      return "Some Data";
    },
  });
  // WHEN
  const router = new InternalRouter(new RouteRegistry());
  // THEN
  assertThrows(() => router.add(route), BadRoutePathFormatError);
});

test("throws if the route already exists with the same path", () => {
  // GIVEN
  const route = new Route({
    method: "GET",
    path: "/foo",
    handler: () => {
      return "Some Data";
    },
  });
  const router = new InternalRouter(new RouteRegistry());
  // WHEN
  router.add(route);
  // THEN
  assertThrows(() => router.add(route), RouteAlreadyExistsError);
});

test("when the route does not exist for the given path", () => {
  test("properly register the route", () => {
    // GIVEN
    const route = new Route({
      method: "GET",
      path: "/foo",
      handler: () => {
        return "Some data";
      },
    });
    const routeRegistry = new RouteRegistry();
    const router = new InternalRouter(routeRegistry);

    // WHEN
    router.add(route);

    // THEN
    const registeredRoute = routeRegistry.find(({
      method,
      path,
    }) => method === route.method && path === route.path);
    assertNotEquals(registeredRoute, null);
  });
});
