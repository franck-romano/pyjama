import { assertThrows, test } from "../dev-deps.ts";
import Router from "../../src/infrastructure/router/router.ts";
import RouteRegistry from "../../src/infrastructure/router/route-registry.ts";
import RouteAlreadyExistsError from "../../src/domain/errors/route-already-exists-error.ts";
import HTTPMethod from "../../src/domain/route/http-method.ts";

test("throws if the route already exists with the same patth", () => {
  // GIVEN
  const route = {
    method: HTTPMethod.GET,
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
  test("properly adds the route", () => {
    // GIVEN
    const route = {
      method: HTTPMethod.GET,
      path: "/foo",
      handler: () => {},
    };
    const router = new Router(new RouteRegistry());
    // WHEN
    router.add(route);
  });
});
