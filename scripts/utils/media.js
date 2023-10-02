import { createElement, appends } from './ui.js';
import { photographer } from './datas.js';
import { eventPhotographer } from './events.js';

import Popup from './Popup.js';

class Media {
    static popup = new Popup();
    constructor(index,{media, title, likes, id}) {
        this.src = media.path;
        this.type = media.type;
        this.title = title; 
        this.likes = likes;
        this.id = id;
        this.index = index;
    }
    heartClick(heartHtmlElement){
        heartHtmlElement
        .addEventListener('click',(e) => 
        this.updateLikeUI(e));
        return heartHtmlElement;
    }

    updateLikeUI(e) {
        const like = document.querySelectorAll(`.like`)[this.index];
        const totalLikes = document.querySelector('.likes');
        console.log('totalLikes: ', totalLikes.children[0].textContent);
        const countLike = like.children[0];
        const incrementLike = parseInt(countLike.textContent) + 1;
        console.log('incremented like : ',incrementLike);
        countLike.innerHTML = incrementLike;
        totalLikes.children[0].innerHTML = parseInt(totalLikes.textContent) + 1;
        const idMedia = photographer.medias[this.index].id;
        eventPhotographer.detail.incrementedLike = incrementLike;
        eventPhotographer.detail.idMedia = idMedia;
        console.log(eventPhotographer);
        e.target.dispatchEvent(eventPhotographer)
    }

    linkClick(e, index){
        console.log(e);
        Media.popup.getPopup();
        const content = this.getContent();
        Media.popup.createContent(content);
        Media.popup.play(index);
        // const title = document.querySelectorAll('article .textMedia > p')[index].textContent;

        // const cursorCarousel = carousel.play(index);
        // console.log('cursorCarousel: ', cursorCarousel);
        // carousel.play(index);
        // const popupDiv = popup(media.src, title, media.tagName);
        // main.appendChild(popupDiv);
        // const next = document.querySelector('.right');
        // const prev = document.querySelector('.left');
            // console.log(prev);
        // cross.addEventListener('click', () => closePopup(main, popupDiv));
    }
    
    createMedia(){
            // console.log('datas: ', datas);
            let [article, img, figcaption, divLike, nameMedia, numberLike, heart, video] = createElement(['figure', 'img', 'figcaption', 'div', 'p', 'p', 'span', 'video']);
            const whatMediaIs = this.type == 'video' ? video : img;
            const textNameMedia = document.createTextNode(this.title);
            const textLikes = document.createTextNode(this.likes);
            const linkHtml =  document.createElement('a');
            linkHtml.setAttribute('aria-label', `${this.title}, closeup view`)
            figcaption.setAttribute('class', 'textMedia')
            divLike.setAttribute('class', 'like');
            divLike.setAttribute('aria-label', 'likes');
            heart = this.heartClick(heart);
            heart.setAttribute('class', 'heart');
            linkHtml.appendChild(whatMediaIs);
            linkHtml.href="#openView"
            linkHtml.addEventListener('click', (e) => this.linkClick(e, this.index));
            nameMedia.appendChild(textNameMedia);
            numberLike.appendChild(textLikes);
            whatMediaIs.src = `assets/${this.src}`;
            whatMediaIs.alt = `${this.title}`;
            heart.setAttribute('aria-label', 'likes');
            divLike = appends(divLike, [numberLike, heart]);
            figcaption = appends(figcaption, [nameMedia, divLike]);
            article = appends(article, [linkHtml, figcaption]);
            return article;
    }
    getContent(){
        return this.type === 'image' ? this.getImage(): this.getVideo();
    }

    getVideo(){
        const content = document.createElement('div')
        const description = document.createElement('p');
        const video = document.createElement('video');
        this.srcVideo().then(src => {
            video.src = src;
            video.setAttribute('aria-label', 'video closeup view');
            video.setAttribute('autoplay', 'true');
            video.setAttribute('controls', 'true');
            video.setAttribute('preload', 'auto');
        })
        
        description.innerHTML = this.getDescription();
        content.setAttribute('class', 'content');
        content.appendChild(video);
        content.appendChild(description);
        return content;
    }

    // replaceDom(valueObj, mediaDom){
    //     // const parent = this.parent;
    //     const {title, likes, media} =  valueObj
    //     this.title = title;
    //     this.likes = likes;
    //     this.src = media.path;
    //     this.type = media.type;
    //     const newContent = this.getParentElement();
    //     // console.log('newContent: ', newContent);
    //     // console.log('valueObj: ',valueObj);
    //     mediaDom.replaceWith(newContent);
    //     // this.parent.replaceWith()
    // }

    srcVideo(){
            return fetch("assets/"+this.src)
            .then(result => result.blob())
            .then(videoBlob => window.URL.createObjectURL(videoBlob))
    }

    getImage(){
        const description = document.createElement('p');
        const img = document.createElement('img');
        img.alt = 'image closeup view';
        const content = document.createElement('div')
        description.innerHTML = this.getDescription();
        img.src = `assets/${this.src}`;
        
        content.setAttribute('class', 'content');
        content.appendChild(img);
        content.appendChild(description);
        return content;
    }
    
    getDescription(){
        return this.title;
    }

    getSrc(){
        return this.src;
    }
}

export default Media;