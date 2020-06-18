import { Server } from "../shared/deps.ts";

export default class WebServer {
  private instance: Server;
  constructor(private serve: Function, private port: Number) {
    console.log(`Listening on port ${this.port}`);
    this.instance = this.serve({ port: this.port });
  }
  async listen() {
    for await (const req of this.instance) {
      req.respond({ body: "coucou" });
    }
  }
  stop() {
    this.instance.close();
  }
}
