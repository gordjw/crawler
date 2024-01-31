/**
 * 
 * @param {string} url 
 * @returns {string}
 */
const retrieve = async function(url) {
    const headerCheck = await fetch(url, {
        method: 'HEAD',
        mode: 'cors'
    })

    // We're only interested in text/html docs, let's not waste bandwidth downloading images, videos, etc
    if( !headerCheck.headers.get('Content-Type').startsWith('text/html') ) {
        throw new Error(`Skipping document. Got Content-type ${headerCheck.headers.get('Content-Type')}, expected text/html`)
    }


    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
    })

    if( response.status !== 200 ) {
        throw new Error(`Error retrieving document. Got response.status ${response.status}, expected 200`)
    }

    let document = ""
    const decoder = new TextDecoder('utf-8')

    for await (const chunk of response.body) {
        document += decoder.decode(chunk)
    }

    return document
}

module.exports = retrieve