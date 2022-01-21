import { assertEquals, test } from "./dev-deps.ts";
import { Request as PyjamaRequest } from "../src/domain/request/Request.ts";
import { HttpMethod } from "../src/domain/route/HttpMethod.ts";

test("Request.path() returns URI path", () => {
  // GIVEN
  const b = new PyjamaRequest(new Request("https://fake-url.com/foo"));
  // WHEN & THEN
  assertEquals(b.path, "/foo");
});

test("Request.method() returns the right HTTP method", () => {
  // GIVEN
  const b = new PyjamaRequest(new Request("https://fake-url.com/foo"));
  // WHEN & THEN
  assertEquals(b.method, HttpMethod.GET);
});
