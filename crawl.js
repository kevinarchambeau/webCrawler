function normalizeURL(url) {
    let parsed = new URL(url)
    let normalized = parsed.host

    if (parsed.pathname.slice(-1) === "/") {
        normalized += parsed.pathname.slice(0, -1)
    }
    else {
        normalized += parsed.pathname
    }

    return normalized
}

export { normalizeURL}
