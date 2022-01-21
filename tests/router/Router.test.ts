import { assertNotEquals, assertThrows, test } from "../dev-deps.ts";
import { Router } from "../../src/infrastructure/router/Router.ts";
import { HttpMethod } from "../../src/domain/route/HttpMethod.ts";
import { RouteRegistry } from "../../src/infrastructure/router/RouteRegistry.ts";
import RouteAlreadyExistsError from "../../src/domain/errors/route-already-exists-error.ts";
import BadRoutePathFormatError from "../../src/domain/errors/bad-route-path-format-error.ts";

test("throws if the route path is not well formatted", () => {
  // GIVEN
  const route = {
    httpMethod: HttpMethod.GET,
    path: "some_wrong_path",
    handler: () => {
    },
  };
  // WHEN
  const router = new Router(new RouteRegistry());
  // THEN
  assertThrows(() => router.add(route), BadRoutePathFormatError);
});

test("throws if the route already exists with the same path", () => {
  // GIVEN
  const route = {
    httpMethod: HttpMethod.GET,
    path: "/foo",
    handler: () => {
    },
  };
  const router = new Router(new RouteRegistry());
  // WHEN
  router.add(route);
  // THEN
  assertThrows(() => router.add(route), RouteAlreadyExistsError);
});

test("when the route does not exist for the given path", () => {
  test("properly register the route", () => {
    // GIVEN
    const route = {
      httpMethod: HttpMethod.GET,
      path: "/foo",
      handler: () => {
      },
    };
    const routeRegistry = new RouteRegistry();
    const router = new Router(routeRegistry);

    // WHEN
    router.add(route);

    // THEN
    const registeredRoute = routeRegistry.find(({
      httpMethod,
      path,
    }) => httpMethod === route.httpMethod && path === route.path);
    assertNotEquals(registeredRoute, null);
  });
});
