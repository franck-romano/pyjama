import WebServer from "./server.ts";
import { Options } from "../domain/options.ts";
import { Dependencies } from "../shared/dependencies-container.ts";

export default class Pyjama {
  private webServer: WebServer;
  constructor(
    private readonly dependenciesContainer: Dependencies,
    private readonly options: Options,
  ) {
    this.webServer = this.dependenciesContainer.server(this.options.port);
    this.webServer.listen();
  }

  set endpoints(endpoints: []) {
  }
}
