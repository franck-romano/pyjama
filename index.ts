import { Options } from "./src/domain/Options.ts";
import { Pyjama } from "./src/application/Pyjama.ts";

export default function (options: Options) {
  return new Pyjama(options);
}
