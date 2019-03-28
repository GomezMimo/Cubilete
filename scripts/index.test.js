const app = require('./index');
const assert = require('assert');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const pageContent = require('./pageContent').content();

const dom = new JSDOM(
    pageContent,
    { includeNodeLocations: true }
);

const document = dom.window.document;
const navigationBar = new app(document);
const item = document.createElement('li');
const ul = document.createElement('ul');
const anchor = document.createElement('a');
const div = document.createElement('div');
item.classList.add('primary-nav__item');
item.appendChild(anchor);
item.appendChild(ul);
item.appendChild(div);

describe('Navigation bar', function() {
    it('should add primary-nav__item-active class when addActiveClasses method is executed', () => {
        navigationBar.addActiveClasses(item);      
        assert.equal(item.classList.contains('primary-nav__item-active'), true);
    });

    it('should remove primary-nav__item-active class when the element is called again', () => {
        navigationBar.addActiveClasses(item);
        assert.equal(item.classList.contains('primary-nav__item-active'), false);
    });

    /*
    TODO: 
    it('should find test__class when test item is found by activeItem method', () => {
        console.log(navigationBar.activeItem());
        /*const activeItem = navegationBar.activeItem();
        assert.equal(activeItem.classList.contains('test__class'), true);
    });*/
});
