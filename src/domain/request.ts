export default class Request {
  constructor(private method: string, private pathname: string) {
  }
  get httpMethod(): string {
    return this.method;
  }
  get path(): string {
    return this.pathname;
  }
}
