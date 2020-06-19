import Pyjama from "../index.ts";
import { assertEquals, test } from "./dev-deps.ts";

test("replies using route handler", async () => {
  // GIVEN
  const app = Pyjama({ port: 8080 });
  app.route({
    method: "GET",
    path: "/foo",
    handler: () => "Hello World !",
  });
  app.run();
  // WHEN
  const actual = await fetch("http://localhost:8080/foo");
  // THEN
  assertEquals(actual, "Hello World !");
});
