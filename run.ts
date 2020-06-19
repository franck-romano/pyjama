import Pyjama from "./src/application/pyjama.ts";
import { dependenciesContainer } from "./src/shared/dependencies-container.ts";

new Pyjama({ port: 8080 }, dependenciesContainer).route({
  method: "GET",
  path: "/foo",
  handler: () => "Hello",
}).run();
