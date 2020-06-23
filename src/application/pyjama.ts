import { Options } from "../domain/options.ts";
import Request from "../domain/request/request.ts";
import RawRoute from "../domain/route/raw-route.ts";
import Router from "../infrastructure/router/router.ts";
import WebServer from "../infrastructure/server/web-server.ts";
import { Dependencies } from "../shared/dependencies-container.ts";

export default class Pyjama {
  private router: Router;
  private webServer?: WebServer;
  constructor(
    private readonly options: Options,
    private readonly dependenciesContainer: Dependencies,
  ) {
    this.router = this.dependenciesContainer.router;
  }

  async run() {
    this.webServer = this.dependenciesContainer.server(this.options.port);
    for await (const serverRequest of this.webServer) {
      const matchingRoute = this.router.resolve(serverRequest);
      const request = new Request(serverRequest, matchingRoute);

      const result = request.handler();
      serverRequest.respond({ body: result });
    }
  }

  stop() {
    this.webServer?.stop();
  }

  route(route: RawRoute): Pyjama {
    this.router.add(route);
    return this;
  }

  routes(routes: Array<RawRoute>): Pyjama {
    routes.forEach((route) => this.router.add(route));
    return this;
  }
}
