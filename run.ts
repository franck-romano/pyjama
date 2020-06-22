import Pyjama from "./src/application/pyjama.ts";
import { dependenciesContainer } from "./src/shared/dependencies-container.ts";
import HTTPMethod from "./src/domain/route/http-method.ts";

new Pyjama({ port: 8080 }, dependenciesContainer).route({
  httpMethod: HTTPMethod.GET,
  path: "/foo",
  handler: () => "Hello",
}).run();
