import { assertEquals, test } from "./dev-deps.ts";
import { Request as PyjamaRequest } from "../src/domain/request/Request.ts";

test("Request.path() returns URI path", () => {
  // GIVEN
  const request = new PyjamaRequest(new Request("https://fake-url.com/foo"));
  // WHEN & THEN
  assertEquals(request.path, "/foo");
});

test("Request.method() returns the right HTTP method", () => {
  // GIVEN
  const request = new PyjamaRequest(new Request("https://fake-url.com/foo"));
  // WHEN & THEN
  assertEquals(request.method, "GET");
});
