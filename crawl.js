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
    if (baseURL === undefined) {
        console.log("Missing baseURL")
        return
    }
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
    return urls
}

async function crawlPage(baseURL, currentURL, pages) {
    // console.log(pages)
    let currentAsURL
    try {
        currentAsURL = new URL(currentURL)
    }
    catch (e) {
        // console.log(`Error: ${e}`)
        return pages
    }
    const baseAsURL = new URL(baseURL)
    if (!currentAsURL.host.includes(baseAsURL.host)) {
        return pages
    }
    const normalizedCurrent = normalizeURL(currentURL)
    if (normalizedCurrent in pages) {
        pages[normalizedCurrent] += 1
        return pages
    }
    else {
        pages[normalizedCurrent] = 1
    }
    const html = await requestPage(currentURL)
    const urlsToRequest = getURLsFromHTML(html, baseURL)
    if (urlsToRequest.length !== 0) {
        for (const url of urlsToRequest) {
            await crawlPage(baseURL, url, pages)
        }
    }
    return pages
}

async function requestPage(url) {
    try {
        const response = await fetch(url)
        const html = await response.text();

        if (!response.headers.get("content-type").includes("text/html")) {
            // console.log(`Unexpected content type: ${response.headers.get("content-type")}`)
            return
        }
        if (response.status >= 400){
            // console.log(`Error: ${response.status}`)
            return
        }
        return html
    }
    catch (e) {
        // console.log(`Error with request: ${e}`)
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage, requestPage}
