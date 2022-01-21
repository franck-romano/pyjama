import { Pyjama } from "./src/application/Pyjama.ts";

new Pyjama({ hostname: "localhost", port: 8080 }).route({
  method: "GET",
  path: "/foo",
  handler: () => "Hello",
}).run();
