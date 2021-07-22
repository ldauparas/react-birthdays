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
    
    for (let celeb_url in celebArr.slice(15,20)) {
        
        var response = await fetch(base_url + celebArr[celeb_url]);
        var text = await response.text();
        var dom = await new JSDOM(text);
        /*
        const tableArr = dom.window.document.querySelectorAll('table').forEach(tableElement => {
            console.log(tableElement.querySelectorAll('img').forEach(a => {
                console.log(a.getAttributeNode('src').textContent);
            }));
        })
        */
        const tableArr = dom.window.document.querySelectorAll('img').forEach(a => {
            console.log(a.getAttributeNode('src').textContent);
        })
        
    }
    
})();
