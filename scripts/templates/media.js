import { createElement, appends, p } from '../utils/ui.js';
// import List from '../utils/List.js';
import Media from '../utils/media.js';

export function MediaTemplate(photographer, opts){
    let { medias } = photographer;
    let { carousel, valuesOpt } = opts;
    const section = document.createElement('section');
    section.setAttribute('id', 'medias');
    const main = document.querySelector('#main');
    section.setAttribute('id', 'medias');


    function selectSort(){
        const elements = createElement(['select', 'option','option', 'option', 'option']);
        let [select] = elements
        const options = valuesOpt.map((opt, index) => {
            if(index === 0) elements[index+1].setAttribute('default', '');
            const sortType = `${opt.substr(0,1).toUpperCase()}${opt.substr(1,opt.length)}`
            elements[index+1].value = index === 0 ? "": opt;
            const textNode = document.createTextNode(sortType);
            elements[index+1].appendChild(textNode);
            return elements[index+1];
        });
        select.setAttribute('name','sort')
        select = appends(select, options);
        return select
    }

    const totalLikes = photographer.medias.reduce((acc, {likes}) => acc += likes,0);

    function sortHtmlElement(){
        const select = selectSort();
        let container = document.createElement('div');
        container.setAttribute('id', 'sortMedia');
        const sortText = p('Trier par');
        container = appends(container, [sortText, select]);
        section.appendChild(container)
        main.appendChild(section);
    }

    const totalLikesDom = () => {
        let [totalLikesDiv, likes, heart, textLike, pricePhotographer] = createElement(['div', 'div', 'span', 'p', 'p']);
        const {price} = photographer;
        const textLikeNode = document.createTextNode(`${totalLikes}`);
        const textPriceNode = document.createTextNode(`${price} / jour`);
        pricePhotographer.appendChild(textPriceNode);
        textLike.appendChild(textLikeNode);
        likes = appends(likes, [textLike, heart]);
        
        likes.setAttribute('class', 'likes');
        heart.setAttribute('class', 'heart');
        totalLikesDiv.setAttribute('id', 'total-likes');
        totalLikesDiv = appends(totalLikesDiv, [likes, pricePhotographer])
    
        main.appendChild(totalLikesDiv);
    }

    // function media(mediasSource){
    //     console.log('mediaaa sources: ', mediasSource);
    //     if(mediasSource){
    //         console.log('mediaSourced: ', mediasSource);
    //         carousel = new List(mediasSource[0], 'Media', 0);
    //     }
    //     const mediaContainer = document.createElement('div');
    //     mediaContainer.setAttribute('id', 'media');
    //     medias = mediasSource ?? medias;
    //     const mediasSliced = medias.slice(1, medias.length);
    //     mediasSliced
    //         .map((media, index) => {
    //         carousel.setLink(media, (index+1));
    //         return media;
    //         })
    //         medias.forEach(() => {
    //             const mediaLink = carousel.getNext();
    //             const article = mediaLink.value.createMedia();
    //             mediaContainer.appendChild(article);
    //         })
    //     section.appendChild(mediaContainer);
    // }


    function media(mediasSource){
        medias = mediasSource || medias;
        console.log(medias);
        const mediaDom = document.createElement('div');
        mediaDom.setAttribute('id', 'media');
        medias.map((media, index) => {
            media = new Media(index,media);
            mediaDom.appendChild(media.createMedia());
            return media;
        })
        section.appendChild(mediaDom);
    }

    function renderSortedMedias(sortedMedias){
        const sorted = sortedMedias.map(({media}) => media);
        console.log('sorted: ', sorted);
        media(sorted);
    }
    function render(){
        sortHtmlElement();
        media();
        totalLikesDom();
    }

    return {render, renderSortedMedias}
}