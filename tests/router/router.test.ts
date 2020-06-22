import { assertThrows, test } from "../dev-deps.ts";
import Router from "../../src/infrastructure/router/router.ts";
import HTTPMethod from "../../src/domain/route/http-method.ts";
import RouteRegistry from "../../src/infrastructure/router/route-registry.ts";
import RouteAlreadyExistsError from "../../src/domain/errors/route-already-exists-error.ts";
import BadRoutePathFormatError from "../../src/domain/errors/bad-route-path-format-error.ts";

test("throws if the route path is not well formatted", () => {
  // GIVEN
  const route = {
    httpMethod: HTTPMethod.GET,
    path: "some_wrong_path",
    handler: () => {},
  };
  // WHEN
  const router = new Router(new RouteRegistry());
  // THEN
  assertThrows(() => router.add(route), BadRoutePathFormatError);
});

test("throws if the route already exists with the same path", () => {
  // GIVEN
  const route = {
    httpMethod: HTTPMethod.GET,
    path: "/foo",
    handler: () => {},
  };
  const router = new Router(new RouteRegistry());
  // WHEN
  router.add(route);
  // THEN
  assertThrows(() => router.add(route), RouteAlreadyExistsError);
});

test("when the route does not exist for the given path", () => {
  test("properly registerx@ the route", () => {
    // GIVEN
    const route = {
      httpMethod: HTTPMethod.GET,
      path: "/foo",
      handler: () => {},
    };
    const router = new Router(new RouteRegistry());
    // WHEN
    router.add(route);
  });
});
