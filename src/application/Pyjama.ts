import { Options } from "../domain/Options.ts";
import { RouteRegistry } from "../infrastructure/router/RouteRegistry.ts";
import { Router } from "../infrastructure/router/Router.ts";
import { HttpServer } from "../infrastructure/server/HttpServer.ts";
import { RawRoute } from "../domain/route/Route.ts";

export class Pyjama {
  private readonly router: Router;
  private readonly webServer: HttpServer;

  constructor(private readonly options: Options) {
    this.router = new Router(new RouteRegistry());
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

  route(route: RawRoute): Pyjama {
    this.router.add(route);
    return this;
  }

  routes(routes: Array<RawRoute>): Pyjama {
    routes.forEach((route) => this.router.add(route));
    return this;
  }
}
