const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTLM } = require('./crawl.js')


test('normalizeURL strip https', () => {
    const input = 'https://www.google.com/path'
    const actual = normalizeURL(input)
    const expected = 'www.google.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://www.google.com/path/'
    const actual = normalizeURL(input)
    const expected = 'www.google.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://www.GOOGLE.com/path'
    const actual = normalizeURL(input)
    const expected = 'www.google.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://www.google.com/path'
    const actual = normalizeURL(input)
    const expected = 'www.google.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="https://www.google.com">
            Google
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://www.google.com"
    const actual = getURLsFromHTLM(inputHTMLBody, inputBaseURL)
    const expected = ["https://www.google.com/"]
    expect(actual).toEqual(expected)
})

test('normalizeURL relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="/path/">
            Google
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://www.google.com"
    const actual = getURLsFromHTLM(inputHTMLBody, inputBaseURL)
    const expected = ["https://www.google.com/path/"]
    expect(actual).toEqual(expected)
})

test('normalizeURL multiple paths', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="https://www.google.com/path1/">
            Google path 1
        </a>
        <a href="/path2/">
            Google path 2
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://www.google.com"
    const actual = getURLsFromHTLM(inputHTMLBody, inputBaseURL)
    const expected = ["https://www.google.com/path1/", "https://www.google.com/path2/"]
    expect(actual).toEqual(expected)
})

test('normalizeURL invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="invalid">
            Invalid URL
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://www.google.com"
    const actual = getURLsFromHTLM(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})