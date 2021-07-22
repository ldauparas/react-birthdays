const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('isomorphic-fetch');
const base_url = 'https://en.wikipedia.org';

(async () => {

    var response = await fetch(base_url + '/wiki/List_of_American_film_actresses');
    var text = await response.text();
    var dom = await new JSDOM(text);
    const celebArr = [];

    dom.window.document.querySelectorAll('li').forEach(listElement => {
        const plainText = listElement.textContent;
        if (plainText.match('born')) {
            listElement.querySelectorAll('a').forEach(linkElement => {
                celebArr.push(linkElement.getAttributeNode('href').textContent)
            })
        };
    });

    const slicedCelebArr = celebArr.slice(15,21);
    
    for (let celeb_url in slicedCelebArr) {
        console.log('Scraping: ' + slicedCelebArr[celeb_url] + '....');
        var response = await fetch(base_url + slicedCelebArr[celeb_url]);
        var text = await response.text();
        var dom = await new JSDOM(text);
        
        // TODO: pass into an object that stores Name, DOB, Image; skip cases with no image
        const tableArr = dom.window.document.querySelectorAll('td > a > img').forEach(a => {
            console.log(slicedCelebArr[celeb_url] + ': ~~~ ' + a.getAttributeNode('src').textContent);
        })
        
    }
    
})();
