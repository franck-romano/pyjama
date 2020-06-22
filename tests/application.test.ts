import Pyjama from "../index.ts";
import { assertEquals, integrationTest } from "./dev-deps.ts";
import HTTPMethod from "../src/domain/route/http-method.ts";

integrationTest(
  "replies with corresponding handler for a simple route",
  async () => {
    // GIVEN
    const app = Pyjama({ port: 8080 });
    const expected = "Hello World !";
    app.route({
      httpMethod: HTTPMethod.GET,
      path: "/foo",
      handler: () => expected,
    });
    app.run();
    // WHEN
    const actual = await (await fetch("http://localhost:8080/foo")).text();
    // THEN
    assertEquals(actual, expected);
  },
);

integrationTest(
  "replies with corresponding handler for a route with named parameter",
  async () => {
    // GIVEN
    const app = Pyjama({ port: 8080 });
    const expected = "Hello World !";
    app.route({
      httpMethod: HTTPMethod.GET,
      path: "/foo/:id",
      handler: () => expected,
    });
    app.run();
    // WHEN
    const actual = await (await fetch("http://localhost:8080/foo/some-id"))
      .text();
    // THEN
    assertEquals(actual, expected);
  },
);
