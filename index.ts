import { Options } from "./src/domain/options.ts";
import Pyjama from "./src/infrastructure/pyjama.ts";
import { dependenciesContainer } from "./src/shared/dependencies-container.ts";

export default function (options: Options) {
  return new Pyjama(dependenciesContainer(), options);
}
