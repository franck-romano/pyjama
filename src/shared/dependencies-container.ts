import { serve } from "../shared/deps.ts";
import WebServer from "../infrastructure/server.ts";

export type Dependencies = {
  server(port: Number): WebServer;
};

export const dependenciesContainer = (): Dependencies => {
  return {
    server: (port: Number) => new WebServer(serve, port),
  };
};
