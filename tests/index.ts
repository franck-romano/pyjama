import Pyjama from "../index.ts";
import { assertEquals, integrationTest } from "./dev-deps.ts";
import HTTPMethod from "../src/domain/route/http-method.ts";

integrationTest("replies with corresponding handler", async () => {
  // GIVEN
  const app = Pyjama({ port: 8080 });
  const expected = "Hello World !";
  app.route({
    method: HTTPMethod.GET,
    path: "/foo",
    handler: () => expected,
  });
  app.run();
  // WHEN
  const actual = await (await fetch("http://localhost:8080/foo")).text();
  // THEN
  assertEquals(actual, expected);
});
