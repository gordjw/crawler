const jsdom = require('jsdom');
const { JSDOM } = jsdom

/**
 * 
 * @param {string} document 
 * @param {string} baseUrl
 * @returns {Array<string>}
 */
const extract = function(document, baseUrl) {
    const urls = []
    const dom = new JSDOM(document)

    for( a of dom.window.document.querySelectorAll('a') ) {
        let href = a.href

        if( href.startsWith("/") || href.startsWith("./") ) {
            href = `${baseUrl}${href}`
        }

        urls.push(href)
    }

    return urls
}

module.exports = extract