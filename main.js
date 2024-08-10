import { argv } from 'node:process';
import {crawlPage} from "./crawl.js";

function main() {

    if (argv.length !== 3) {
        console.log("Only one argument (a URL) is supported.")
        process.exit(1)
    }
    console.log(argv[2])
    crawlPage(argv[2])

}

main()