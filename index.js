const { argv } = require('node:process');

const Queue = require('./queue')
const extract = require('./extract')
const normalise = require('./normalise')
const retrieve = require('./retrieve')

async function main() {
    if( !argv[2] ) {
        console.log("Error: no url supplied")
        return
    } else {
        try {
            url = new URL(argv[2] ) 
        } catch(err) {
            console.log(`Error: ${err.message}`)
            return
        }
    }
    console.log("Starting crawler")

    const queue = new Queue()
    const baseUrl = argv[2]
    const visited = new Map()

    queue.push(baseUrl)

    while( queue.size() > 0 ) {
        const url = queue.pop()
        let document

        console.log(`Retrieving: ${url}`)
        try {
            document = await retrieve(url)
        } catch(err) {
            console.log(err.message)
            continue
        }
        const links = extract(document, baseUrl)
        console.log(`Found ${links.length} links`)

        for( link of links ) {
            if( link === "" || ! link ) {
                console.log(`Malformed link: ${link}, skipping`)
                continue
            }
            console.log(`Checking link: ${link}`)

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
                visited.set(link, -1)
            }
        }
    }

    console.log(visited)
}

main()