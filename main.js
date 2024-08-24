import { argv } from 'node:process';
import {crawlPage} from "./crawl.js";
import {printReport} from "./report.js";

async function main() {

    if (argv.length !== 3) {
        console.log("Only one argument (a URL) is supported.")
        process.exit(1)
    }

    const result = await crawlPage(argv[2], argv[2], {})
    printReport(result)
}

await main()