import { Route } from "../src/domain/route/Route.ts";
import { assertEquals, test } from "./dev-deps.ts";
import { HttpMethod } from "../src/domain/route/HttpMethod.ts";

[{
  rawRoute: {
    httpMethod: HttpMethod.GET,
    path: "/foo/:id/bar/:id",
    handler: () => {
      return "Some Data";
    },
  },
  input: "/foo/some-id/bar/some-other-id",
  expected: true,
  testName: "matches path params with ':' as delimiter",
}, {
  rawRoute: {
    httpMethod: HttpMethod.GET,
    path: "/foo/",
    handler: () => {
      return "Some Data";
    },
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
