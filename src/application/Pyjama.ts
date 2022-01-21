import { Options } from "../domain/Options.ts";
import { RouteRegistry } from "../infrastructure/router/RouteRegistry.ts";
import { InternalRouter } from "../infrastructure/router/InternalRouter.ts";
import { HttpServer } from "../infrastructure/server/HttpServer.ts";
import { Route, RouteOptions } from "../domain/route/Route.ts";

export class Pyjama {
  private readonly router: InternalRouter;
  private readonly webServer: HttpServer;

  constructor(private readonly options: Options) {
    this.router = new InternalRouter(new RouteRegistry());
    this.webServer = new HttpServer(
      this.router,
      this.options.port,
      this.options.hostname,
    );
  }

  async run() {
    try {
      await this.webServer.start();
    } catch (error) {
      console.error(error);
    }
  }

  stop() {
    this.webServer.stop();
  }

  route(route: RouteOptions): Pyjama {
    this.router.add(new Route(route));
    return this;
  }

  routes(routes: Array<RouteOptions>): Pyjama {
    routes.forEach((route) => this.router.add(new Route(route)));
    return this;
  }
}
