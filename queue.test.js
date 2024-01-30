const Queue = require('./queue.js')

test('FIFO queue operations work as expected', () => {
    const queue = new Queue()

    expect(queue.size()).toBe(0)

    queue.push(10)
    expect(queue.size()).toBe(1)
    expect(queue.peek()).toBe(10)

    queue.push(20)
    expect(queue.size()).toBe(2)
    expect(queue.peek()).toBe(10)

    const val = queue.pop()
    expect(val).toBe(10)
    expect(queue.size()).toBe(1)
    expect(queue.peek()).toBe(20)

    queue.pop()
    expect(queue.size()).toBe(0)

    const empty = queue.pop()
    expect(empty).toBe(null)
    expect(queue.size()).toBe(0)
    
    const peek = queue.peek()
    expect(peek).toBe(null)


    for( let i = 0; i < 10000; i++ ) {
        queue.push(i)
    }
    expect(queue.size()).toBe(10000)
    expect(queue.peek()).toBe(0)
});
