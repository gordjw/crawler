const normalise = require('./normalise.js')

test('removes protocol from URL', () => {
    expect(normalise('https://github.com/path/')).toBe('github.com/path')
    expect(normalise('https://github.com/path/?queryParam=queryVal')).toBe('github.com/path')
});
