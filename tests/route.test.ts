import Route from "../src/domain/route/route.ts";
import { test, assertEquals } from "./dev-deps.ts";
import HTTPMethod from "../src/domain/route/http-method.ts";

[{
  rawRoute: {
    httpMethod: HTTPMethod.GET,
    path: "/foo/:id/bar/:id",
    handler: () => {},
  },
  input: "/foo/some-id/bar/some-other-id",
  expected: true,
  testName: "matches path params with ':' as delimiter",
}, {
  rawRoute: {
    httpMethod: HTTPMethod.GET,
    path: "/foo/",
    handler: () => {},
  },
  input: "/foo/",
  expected: true,
  testName: "accepts explicit trailing slash",
}].forEach(({ testName, rawRoute, input, expected }) => {
  test(testName, () => {
    // WHEN
    const route = new Route(rawRoute);
    // THEN
    assertEquals(route.regExpPattern.test(input), expected);
  });
});
