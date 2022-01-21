import { HttpMethod } from "./src/domain/route/HttpMethod.ts";
import { Pyjama } from "./src/application/Pyjama.ts";

new Pyjama({ hostname: "localhost", port: 8080 }).route({
  httpMethod: HttpMethod.GET,
  path: "/foo",
  handler: () => "Hello",
}).run();
