import Request from "../domain/request.ts";
import Route from "../domain/route/route.ts";
import { Options } from "../domain/options.ts";
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
      const request = new Request(serverRequest.method, serverRequest.url);
      const result = this.router.resolve(request).handler();
      serverRequest.respond({ body: result });
    }
  }

  stop() {
    this.webServer?.stop();
  }

  route(route: Route): Pyjama {
    this.router.add(route);
    return this;
  }

  routes(routes: Array<Route>): Pyjama {
    routes.forEach((route) => this.router.add(route));
    return this;
  }
}
