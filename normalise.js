/**
 * 
 * @param {string} url 
 * @returns {string}
 */
const normalise = function(url) {
    try {
        urlObject = new URL(url);
    } catch(err) {
        console.log(err.message)
        return
    }
    normalisedUrl = `${urlObject.protocol}//${urlObject.host}${urlObject.pathname}`
    if(normalisedUrl.endsWith('/'))
        return normalisedUrl.slice(0,-1)
    else
        return normalisedUrl
}

module.exports = normalise