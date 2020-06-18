import { Server } from "../../shared/deps.ts";

export default class WebServer extends Server {
  private server: Server;
  constructor(private serve: Function, private port: Number) {
    super(Deno.listen({ hostname: "localhost", port: Number(port) }));
    this.server = this.serve({ port: this.port });
    console.log(`Now listening on port ${port}`);
  }
  stop() {
    this.server.close();
  }
}
