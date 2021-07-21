const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('isomorphic-fetch');

(async () => {
    const response = await fetch('https://en.wikipedia.org/wiki/List_of_American_film_actresses');
    const text = await response.text();
    const dom = await new JSDOM(text);
    dom.window.document.querySelectorAll('li').forEach(a => {
        const plainText = a.textContent;
        if (plainText.match('born')) {console.log(plainText)};
    });
})();
