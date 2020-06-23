import Pyjama from "../index.ts";
import HTTPMethod from "../src/shared/http-method.ts";
import { assertEquals, integrationTest } from "./dev-deps.ts";
import Request from "../src/domain/request/request.ts";

const routes = [{
  httpMethod: HTTPMethod.GET,
  path: "/foo",
  handler: () => "Hello",
  expected: "Hello",
  url: "http://localhost:8080/foo",
}, {
  httpMethod: HTTPMethod.GET,
  path: "/foo/:id",
  handler: (req: Request) => `Hello from ${req.httpMethod} ${req.path}`,
  expected: "Hello from GET /foo/some_id",
  url: "http://localhost:8080/foo/some_id",
}];

const app = Pyjama({ port: 8080 });
app.routes(routes);
app.run();

routes.forEach(({ url, expected }) => {
  integrationTest(`${url} replies ${expected}`, async () => {
    // WHEN
    const actual = await (await fetch(url)).json();
    // THEN
    assertEquals(actual, expected);
    app.stop();
  });
});
