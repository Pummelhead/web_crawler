function printReport(pages) {
    console.log('report is starting')
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a, b) => b[1] - a[1])
    for (page of pagesArray) {
        const url = page[0]
        const count = page[1]
        console.log(`Found ${count} internal links to ${url}`)
    }
}


module.exports = {
    printReport
}