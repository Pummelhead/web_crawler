const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')


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