export {
  assert,
  assertEquals,
  assertNotEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

const integrationTest = (name: string, fn: () => void | Promise<void>) => {
  return test({
    name,
    fn,
    sanitizeOps: false,
    sanitizeResources: false,
  });
};

export { integrationTest, test };
