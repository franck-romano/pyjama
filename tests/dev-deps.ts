export {
  assert,
  assertEquals,
  assertNotEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

const { test } = Deno;

const integrationTest = (testName: string, testFn: Function) => {
  return test({
    name: testName,
    fn() {
      testFn;
    },
    sanitizeOps: false,
  });
};

export { test, integrationTest };
