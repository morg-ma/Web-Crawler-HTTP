function printReport(pages) {
    console.log("====================================");
    console.log("============== Report ==============");
    console.log("====================================");
    const sortedPages = sortPages(pages);
    sortedPages.forEach((page) => {
        console.log(`Found ${page[1]} links to page: ${page[0]}`);
    });
    console.log("====================================");
    console.log("============ End Report ============");
    console.log("====================================");

}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => b[1] - a[1]);
    
    return pagesArr;
}

module.exports = { printReport, sortPages };