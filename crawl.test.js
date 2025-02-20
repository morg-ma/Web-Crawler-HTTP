const { normalizeUrl, getUrlFromHtml } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeUrl strip protocols', () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeUrl(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip trailing slash', () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeUrl(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('normalizeUrl capitals', () => {
    const input = "https://BLOG.boot.dev/path";
    const actual = normalizeUrl(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip http', () => {
    const input = "http://blog.boot.dev/path";
    const actual = normalizeUrl(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('getUrlFromHtml absolute', () => {
    const inputHtmlBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">link</a>
    </body>
</html>
    `;
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test('getUrlFromHtml relative', () => {
    const inputHtmlBody = `
<html>
    <body>
        <a href="/path/">link</a>
    </body>
</html>
    `;
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test('getUrlFromHtml multiple', () => {
    const inputHtmlBody = `
<html>
    <body>
        <a href="/path1/">link</a>
        <a href="https://blog.boot.dev/path2/">link</a>
    </body>
</html>
    `;
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
});

test('getUrlFromHtml invalid', () => {
    const inputHtmlBody = `
<html>
    <body>
        <a href="invalid">Invalid URL</a>
    </body>
</html>
    `;
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected);
});