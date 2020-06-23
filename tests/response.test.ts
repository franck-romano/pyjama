import { test, assertEquals } from "./dev-deps.ts";
import Response from "../src/domain/response/response.ts";

[
  { type: "number", result: 314 },
  { type: "object", result: { some: { object: "hello" } } },
  { type: "boolean", result: true },
]
  .forEach(
    (({ type, result }) => {
      test(`Response.body is stringifyed when handler { result } is a ${type}`, () => {
        // GIVEN
        const handlerResult = result;
        const expected = JSON.stringify(handlerResult);
        // WHEN
        const response = new Response(handlerResult);
        // THEN
        assertEquals(response.body, expected);
      });
    }),
  );

test("Response.body is a string when handler { result } is a string", () => {
  // GIVEN
  const handlerResult = "some-string";
  // WHEN
  const response = new Response(handlerResult);
  // THEN
  assertEquals(response.body, handlerResult);
});

test("Response.headers contains 'content-type' header when handler { result } is a string", () => {
  // GIVEN
  const handlerResult = "some-string";
  const expected = new Headers(
    { "content-type": "text/html; charset=utf-8" },
  );
  // WHEN
  const response = new Response(handlerResult);
  // THEN
  assertEquals(response.headers, expected);
});
