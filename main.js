const {crawlPage} = require('./crawl.js')
const {printReport} = require('./reports.js')

async function main() {
    if (process.argv.length < 3) {
        console.log('no website provided')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('too many comman line args')
        process.exit(1)
    }
    const baseURL = process.argv[2]

    console.log(`starting crawl of ${baseURL}`)
    const results = await crawlPage(baseURL, baseURL, {})
    printReport(results)
    
}

main()