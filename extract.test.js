const extract = require('./extract')

test('returns urls from a HTML document', () => {
    expect(extract('<a href="https://github.com/path">Some link name</a>', 'https://github.com')).toStrictEqual(['https://github.com/path'])
    expect(extract('<a href="https://github.com/path">Some link name</a><a href="https://gordjw.me/">Another link</a>', 'https://github.com')).toStrictEqual(['https://github.com/path','https://gordjw.me/'])
    expect(extract('<a href="/path">Some link name</a>', 'https://github.com')).toStrictEqual(['https://github.com/path'])
});
