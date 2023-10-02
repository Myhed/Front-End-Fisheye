import {appends, createElement} from './ui.js';
class Popup {
    constructor(){
        const [popupDiv,mask, cross, container, left, right] = createElement(['div','div', 'a', 'div', 'a', 'a']);
        mask.setAttribute('id', 'mask');
        this.right = right;
        right.setAttribute('class', 'right');
        this.left = left;
        left.setAttribute('class', 'left');
        this.container = appends(container , [left, right]);
        this.container.setAttribute('class', 'container');
        this.container.setAttribute('aria-label', 'image closeup view')
        this.cross = cross;
        this.cross.setAttribute('class', 'cross');
        this.cross.setAttribute('tabIndex', '1');
        this.cross.href='#close'
        this.left.href='#turnLeft'
        this.right.href='#turnRight'
        this.right.setAttribute('aria-label', 'Next Image');
        this.left.setAttribute('aria-label', 'Previous Image');
        this.cross.setAttribute('aria-label', 'Close dialog');
        this.popup = appends(popupDiv, [mask, cross, container]);
        this.popup.setAttribute('id', 'popup');
    }
    
    crossClick(e){
        console.log(e);
        const main = document.querySelector('#main');
        const body = document.querySelectorAll('article a, button, select');
        const content = document.querySelector('.content');
        const container = document.querySelector('.container');
            body.forEach(element => {
                element.removeAttribute('tabIndex');
            });
        main.removeChild(e.target.parentNode);
        container.removeChild(content);
        console.log('e.target.parentNode', e.target.parentNode)
    }

    leftClick(e, index){
        console.log(e)
        const articles = document.querySelectorAll('article');
        if(typeof this.cursor === 'undefined'){
            this.cursor = index - 1
        }else{
            this.cursor = (this.cursor - 1) === -1 ?  articles.length-1 : this.cursor-1;
        }
        console.log('cursor: ', this.cursor);
        const nextMedia = articles[this.cursor].children[0].children[0];
        const nextTitle =articles[this.cursor].children[1].children[0].textContent;
        const contentNext = this.switchContent({nextMedia, nextTitle});
        this.playDirection(contentNext, e.keyCode || e.target);
    }

    rightClick(e, index){
        console.log(e);
        // console.log(index);
        const articles = document.querySelectorAll('article');
        this.cursor = (this.cursor + 1 || index + 1) % articles.length;
        console.log('cursor: ',this.cursor);
        const nextMedia = articles[this.cursor].children[0].children[0];
        const nextTitle = articles[this.cursor].children[1].children[0].textContent;
        const contentNext = this.switchContent({nextMedia, nextTitle});
        this.playDirection(contentNext, e.keyCode || e.target);
    }

    accessibilityArrow(e, index){
             if(e.keyCode === 39){
                 this.rightClick(e, index);
             }else if(e.keyCode === 37){
                 this.leftClick(e, index);
             }
    }

    playDirection(content, arrow){
        console.log('arrow: ', arrow);
        arrow = arrow.className ? arrow.className : arrow;
        const direction = Number.isInteger(arrow) ? 39 : 'right';
        const {oldContent, currentContent} = content;
        const currentDirectionClass = arrow === direction ? 'current-right' : 'current-left';
        const directionClass = arrow === direction ? 'next-image': 'prev-image';
        const container = document.querySelector('.container');
        oldContent.classList.remove(currentDirectionClass)
        oldContent.classList.add(directionClass);
        setTimeout(() => {
            container.removeChild(oldContent);
            setTimeout(() => {
                currentContent.classList.add(currentDirectionClass);
                container.appendChild(currentContent);
            });
        },500)
    }

    switchContent(content){
        content = Object.values(content);
        const tagName = content[0].tagName;
        const src = content[0].src;
        const oldContent = document.querySelector('#popup .container .content');
        let [media, title] = createElement([`${tagName}`, 'p']);
        media.setAttribute('alt', 'image closeup view');
        const textNode = document.createTextNode(`${content[1]}`)
        title.appendChild(textNode);
        if(tagName === 'VIDEO'){
            media.setAttribute('aria-label', 'video closeup view')
            media.setAttribute('autoplay', 'true');
            media.setAttribute('controls', 'true');
        }
        media.src = src;
        console.log(content[0]);
        let currentContent = document.createElement('div');
        console.log(Object.values(content));
        currentContent = appends(currentContent, [media, title]);
        currentContent.setAttribute('class', 'content');
        return {oldContent, currentContent};
    }
    createContent(content){
        this.container.appendChild(content);
    }

    getPopup(){
        const main = document.querySelector('#main');
        const link = document.querySelectorAll('article a, button, select, video');
        const container = document.querySelector('.container');
            link.forEach(element  => {
                console.log('element: ',element)
                element.setAttribute('tabIndex', '-1')
             })

        // this.popup.appendChild(this.container);
        main.appendChild(this.popup);
        this.cross.addEventListener('click',(e) => this.crossClick(e));
        return this.popup;
    }

    play(index){
        window.addEventListener('keyup', (e) => this.accessibilityArrow(e, index))
        this.left.addEventListener('click', (e) => this.leftClick(e, index));
        this.right.addEventListener('click', (e) => this.rightClick(e, index));
    }
    
    closePopup(parent, child){
        const body = document.querySelectorAll('article a, button, select');
        body.forEach(element => {
            element.removeAttribute('tabIndex');
        })
        parent.removeChild(child);
        return true;
    }
}

export default Popup;