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
    const baseUrl = normalise(argv[2])
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

            link = normalise(link)

            if( link === "" || ! link ) {
                console.log(`Malformed link: ${link}, skipping`)
                continue
            }
            console.log(`Checking link: ${link}`)

            if( link.startsWith(baseUrl) ) {
                if( visited.has(link) ) {
                    console.log("Already checked or queued, skipping")
                } else {
                    console.log("Adding to queue")
                    queue.push(link)
                }

                let outgoings
                if( visited.has(url) ) {
                    outgoings = visited.get(url)
                } else {
                    outgoings = new Set()
                }
                outgoings.add(link)
                visited.set(url, outgoings)
            } else {
                console.log("External link, not adding to queue")
            }
        }
    }

    console.log(visited)
}

main()