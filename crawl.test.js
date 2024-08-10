import { test, expect } from "@jest/globals";
import {normalizeURL, getURLsFromHTML, crawlPage, requestPage} from "./crawl.js";

test("url with ending /", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test("url", () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test("getURLsFromHTML basic", () => {
    const html = "<html>\n" +
        "    <body>\n" +
        "        <a href=\"https://blog.boot.dev\"><span>Go to Boot.dev</span></a>\n" +
        "        <a href=\"/something/wee\"><span>relative</span></a>\n" +
        "    </body>\n" +
        "</html>"
    const expected = ["blog.boot.dev/", "blogs.boot.dev/something/wee"]
    expect(getURLsFromHTML(html, "blogs.boot.dev")).toEqual(expect.arrayContaining(expected))
})

test("requestPage", async () => {
    const url = "https://wagslane.dev"
    expect(await requestPage(url)).toContain("a-case-against-a-case-for-the-book-of-mormon")
})

test("crawlPage", async () => {
    const url = "https://wagslane.dev"
    const response = await crawlPage(url, url, {})
    expect("wagslane.dev" in response).toBe(true)
})