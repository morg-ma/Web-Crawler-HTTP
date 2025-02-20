const { JSDOM } = require('jsdom');

async function crawlPage(baseUrl, currentUrl, pages) {
    const baseUrlObj = new URL(baseUrl);
    const currentURlObj = new URL(currentUrl);

    if (baseUrlObj.hostname !== currentURlObj.hostname) {
        console.log("Skipping external URL: ", currentUrl);
        return pages;
    }

    const normalizedUrl = normalizeUrl(currentUrl);
    if (pages[normalizedUrl] > 0) {
        pages[normalizedUrl]++;
        return pages;
    }
    pages[normalizedUrl] = 1;
    
    console.log("Crawling: ", currentUrl);

    try{
        // fetch the page
        const response = await fetch(currentUrl);

        if ( response.status > 399 ) {
            console.log("Error fetching page with status code: ", response.status, " on URL:", currentUrl);
            return pages;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.log("Skipping non HTML page: ", currentUrl);
            return pages;
        }

        const htmlBody = await response.text();
        const urls = getUrlFromHtml(htmlBody, baseUrl);
        urls.forEach(async (url) => {
            pages = await crawlPage(baseUrl, url, pages);
        });
    }  catch (err) {
        console.log("Error fetching page: ", err.message, " on URL:", currentUrl);
    }

    return pages;
}

function getUrlFromHtml (html, baseUrl) {
    
    const urls = [];
    const dom = new JSDOM(html);
    const linkElements = dom.window.document.querySelectorAll('a');
    linkElements.forEach((element) => {
        
        if (element.href.startsWith('/')) {
            try {
                // relative path
                urls.push(new URL(baseUrl + element.href).href);
            } catch (error) {
                console.log("Error with relative URL: ", error);
            }
        }
        else {
            try {
                // absolute path
                urls.push(new URL(element.href).href);
            } catch (error) {
                console.log("Error with absolute URL: ", error);
            }            
        }
        
    });

    return urls;
}

function normalizeUrl (url) {
    const urlObj = new URL(url);
    const hostPath = urlObj.hostname + urlObj.pathname;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeUrl,
    getUrlFromHtml,
    crawlPage
};