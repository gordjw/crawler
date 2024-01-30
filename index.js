const Queue = require('./queue')
const extract = require('./extract')
const normalise = require('./normalise')
const retrieve = require('./retrieve')

async function main() {
    console.log("Starting crawler")

    const queue = new Queue()
    const baseUrl = 'https://gordjw.me'
    const visited = new Map()

    queue.push(baseUrl)

    while( queue.size() > 0 ) {
        const url = queue.pop()
        const document = await retrieve(url)
        const links = extract(document, baseUrl)

        for( link of links ) {
            console.log(`Checking ${link}...`)
            if( link.startsWith(baseUrl) ) {
                if( visited.has(link) ) {
                    console.log("Already queued, skipping")  
                    let count = visited.get(link) + 1
                    visited.set(link, count)
                } else {
                    console.log("Adding to queue")
                    queue.push(link)
                    visited.set(link, 1)
                }
            } else {
                console.log("External link, not adding to queue")
            }
        }
    }

    console.log(visited)
}

main()