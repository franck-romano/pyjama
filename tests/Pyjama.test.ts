import Pyjama from "../index.ts";
import { assertEquals, integrationTest } from "./dev-deps.ts";
import { Request } from "../src/domain/request/Request.ts";
import { RouteOptions } from "../src/domain/route/Route.ts";

const routes = [{
  route: { method: "GET", path: "/foo", handler: () => "Hello" },
  url: "http://localhost:8080/foo",
  expected: "Hello",
}, {
  route: {
    method: "GET",
    path: "/foo/:id",
    handler: (req: Request) => `Hello from ${req.method} ${req.path}`,
  },
  url: "http://localhost:8080/foo/some_id",
  expected: "Hello from GET /foo/some_id",
}];

const routesToRegister = routes.map<RouteOptions>((r) =>
  r.route as RouteOptions
);

Pyjama({ hostname: "localhost", port: 8080 }).routes(routesToRegister)
  .run();

routes.forEach(({ url, expected }) => {
  integrationTest(`${url} replies ${expected}`, async () => {
    // GIVEN
    const actual = await (await fetch(url)).text();
    // WHEN
    assertEquals(actual, expected);
  });
});
