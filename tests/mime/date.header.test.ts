import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { DateHeader } from "../../src/mime/headers/date.header.ts";

Deno.test("hello world", () => {
  const dateHeader = new DateHeader("date", new Date("2020-03-22"));
  assertEquals(dateHeader.name, "date");
  assertEquals(dateHeader.body, "Sun, 22 Mar 2020 01:00:00 GMT");
});
