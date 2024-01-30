class Queue {
    constructor() {
        this.queue = []
    }

    push(val) {
        this.queue.push(val)
    }

    pop() {
        const val = this.peek()
        this.queue.shift()
        return val
    }

    peek() {
        if( this.size() >= 1 )
            return this.queue[0]
        return null
    }

    size() {
        return this.queue.length
    }

    isEmpty() {
        return this.size() === 0 ? true : false;
    }
}

module.exports = Queue