import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("url with ending /", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test("url", () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test("getURLsFromHTML basic", () => {
    let html = "<html>\n" +
        "    <body>\n" +
        "        <a href=\"https://blog.boot.dev\"><span>Go to Boot.dev</span></a>\n" +
        "        <a href=\"/something/wee\"><span>relative</span></a>\n" +
        "    </body>\n" +
        "</html>"
    const expected = ["blog.boot.dev/", "blogs.boot.dev/something/wee"]
    expect(getURLsFromHTML(html, "blogs.boot.dev")).toEqual(expect.arrayContaining(expected))
})