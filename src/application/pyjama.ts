import { Options } from "../domain/options.ts";
import Router from "../infrastructure/router/router.ts";
import WebServer from "../infrastructure/server/web-server.ts";
import { Dependencies } from "../shared/dependencies-container.ts";
import { Route } from "../domain/route.ts";

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
    for await (const request of this.webServer) {
      request.respond({ body: "coucou" });
    }
  }

  route(route: Route) {
    this.router.add(route);
  }

  routes(routes: Array<Route>) {
    routes.forEach((route) => this.router.add(route));
  }
}
