function printReport(pages) {
    console.log("Crawl results sorted by count:")
    let sorted = Object.keys(pages).map((key) => [key, pages[key]]);
    sorted.forEach(entry => {
        console.log(`Found ${entry[1]} internal links to ${entry[0]}`)
    })
}

export {printReport}