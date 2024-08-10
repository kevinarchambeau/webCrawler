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

async function crawlPage(url) {
    try {
        const response = await fetch(url)
        const text = await response.text();

        if (!response.headers.get("content-type").includes("text/html")) {
            console.log(`Unexpected content type: ${response.headers.get("content-type")}`)
            return
        }
        if (response.status >= 400){
            console.log(`Error: ${response.status}`)
            return
        }
        return text
    }
    catch (e) {
        console.log(`Error with request: ${e}`)
    }
}

export { normalizeURL, getURLsFromHTML, crawlPage}
