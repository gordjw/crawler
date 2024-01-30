const normalise = function(url) {
    urlObject = new URL(url);
    normalisedUrl = `${urlObject.host}${urlObject.pathname}`
    if(normalisedUrl.endsWith('/'))
        return normalisedUrl.slice(0,-1)
    else
        return normalisedUrl
}

module.exports = normalise