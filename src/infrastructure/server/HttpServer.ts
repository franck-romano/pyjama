import { Server } from "../../shared/deps.ts";
import { Router } from "../router/Router.ts";

export class HttpServer extends Server {
  private readonly listener: Deno.Listener;

  constructor(
    private router: Router,
    private port: number,
    private hostname?: string,
  ) {
    super({
      handler: (req) => {
        const matchingRoute = this.router.resolve(req);
        return new Response(matchingRoute.handler());
      },
    });

    this.listener = Deno.listen({ hostname, port });
  }

  async start(): Promise<void> {
    console.log(`HTTP server running on ${this.hostname}:${this.port}`);
    await super.serve(this.listener);
    for await (const connection of this.listener) {
      Deno.serveHttp(connection);
    }
  }

  stop() {
    this.close();
  }
}
