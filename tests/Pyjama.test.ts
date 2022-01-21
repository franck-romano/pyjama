import Pyjama from "../index.ts";
import { assertEquals, integrationTest } from "./dev-deps.ts";
import { HttpMethod } from "../src/domain/route/HttpMethod.ts";
import { Request } from "../src/domain/request/Request.ts";

const routes = [{
  httpMethod: HttpMethod.GET,
  path: "/foo",
  handler: () => "Hello",
  expected: "Hello",
  url: "http://localhost:8080/foo",
}, {
  httpMethod: HttpMethod.GET,
  path: "/foo/:id",
  handler: (req: Request) => `Hello from ${req.method} ${req.path}`,
  expected: "Hello from GET /foo/some_id",
  url: "http://localhost:8080/foo/some_id",
}];

const app = Pyjama({ hostname: "localhost", port: 8080 });
app.routes(routes).run();

routes.forEach(({ url, expected }) => {
  integrationTest(`${url} replies ${expected}`, async () => {
    // GIVEN
    const actual = await (await fetch(url)).text();
    // WHEN
    assertEquals(actual, expected);
  });
});
