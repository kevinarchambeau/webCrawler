import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test("url with ending /", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test("url", () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})