import Pyjama from "../index.ts";
import { assertEquals, integrationTest } from "./dev-deps.ts";
import HTTPMethod from "../src/domain/route/http-method.ts";

const routes = [{
  httpMethod: HTTPMethod.GET,
  path: "/foo",
  handler: () => "Hello",
  expected: "Hello",
  url: "http://localhost:8080/foo",
}, {
  httpMethod: HTTPMethod.GET,
  path: "/foo/:id",
  handler: () => "Hello ID",
  expected: "Hello ID",
  url: "http://localhost:8080/foo/some_id",
}];

const app = Pyjama({ port: 8080 });
app.routes(routes);
app.run();

routes.forEach(({ url, expected }) => {
  integrationTest(`${url} replies ${expected}`, async () => {
    // WHEN
    const actual = await (await fetch(url)).text();
    // THEN
    assertEquals(actual, expected);
    app.stop();
  });
});
