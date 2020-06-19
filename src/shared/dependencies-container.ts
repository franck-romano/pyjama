import { serve } from "../shared/deps.ts";
import Router from "../infrastructure/router/router.ts";
import WebServer from "../infrastructure/server/web-server.ts";
import RouteRegistry from "../infrastructure/router/route-registry.ts";

export type Dependencies = {
  server(port: Number): WebServer;
  router: Router;
};

export const dependenciesContainer: Dependencies = {
  server: (port: Number) => new WebServer(serve, port),
  router: new Router(new RouteRegistry()),
};
