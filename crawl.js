import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const parsed = new URL(url)
    let normalized = parsed.host

    if (parsed.pathname.slice(-1) === "/") {
        normalized += parsed.pathname.slice(0, -1)
    }
    else {
        normalized += parsed.pathname
    }

    return normalized
}

function getURLsFromHTML (html, baseURL) {
    const urls = []
    const dom = new JSDOM(html)
    const anchors = dom.window.document.querySelectorAll("a")
    anchors.forEach((anchor) => {
        if (anchor.host === "") {
            urls.push(baseURL + anchor.href)
        }
        else {
            urls.push(anchor.host + anchor.pathname)
        }
    })
    console.log(urls)
    return urls
}

export { normalizeURL, getURLsFromHTML}
