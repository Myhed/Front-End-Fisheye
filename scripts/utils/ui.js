// import { eventPhotographer } from './events.js';

export function addAriaAttr(HtmlElement, content){
    HtmlElement.setAttribute('aria-label', content)
    return HtmlElement
}


// export const updateLikeUI = (e,{index, idMedia, eventPhotographer}) => {
//     const like = document.querySelectorAll(`.like`)[index];
//     const totalLikes = document.querySelector('.likes');
//     console.log('totalLikes: ', totalLikes.children[0].textContent);
//     const countLike = like.children[0];
//     const incrementLike = parseInt(countLike.textContent) + 1;
//     countLike.innerHTML = incrementLike;
//     totalLikes.children[0].innerHTML = parseInt(totalLikes.textContent) + 1;
//     // const idMedia = photographer.medias[index].id;
//     eventPhotographer.detail.incrementedLike = incrementLike;
//     eventPhotographer.detail.idMedia = idMedia;
//     console.log(eventPhotographer);
//     e.target.dispatchEvent(eventPhotographer)
// }

export function p(text){
    const p = document.createElement('p');
    const textNode = document.createTextNode(text);
    p.appendChild(textNode);
    return p;
}

export const appends = (HtmlElement, childs) => 
    childs.reduce((acc, child) => (acc.appendChild(child), acc), HtmlElement)

export const createElement = (arrayHtmlTags) => arrayHtmlTags
    .map(htmlTag => document.createElement(htmlTag));


export const getAsset = (nameAsset, image) => {
    const path ='../../assets/';
    const fullPath = `${path}${nameAsset}/${image}`;

    return fullPath;
}


export const popup = (mediaSrc, title, mediaTag) => {
    console.log('media Tag: ', mediaTag);
    let [popupDiv, mask, cross, container, left, right] = 
    createElement(['div', 'div', 'span', 'div', 'span', 'span']);
    const content = popupContent(mediaSrc, title, mediaTag);
    popupDiv.setAttribute('id', 'popup')
    mask.setAttribute('id', 'mask');
    cross.setAttribute('class', 'cross')
    container.setAttribute('class', 'container');
    left.setAttribute('class', 'left');
    right.setAttribute('class', 'right');
    container = appends(container, [content, left, right]);
    popupDiv = appends(popupDiv, [mask, cross, container]);
    return popupDiv;
}


export const popupContent  = (mediaSrc, paragraphe, mediaTag) => {
    let [content, media, p] = createElement(['div', `${mediaTag}`, 'p'])
    if(mediaTag === 'VIDEO'){
        srcVideoFile(mediaSrc).then(src => {
            media.src = src;
            media.setAttribute('autoplay', 'true');
             // video.setAttribute('muted', 'true');
            // video.setAttribute('loop', 'true');
            media.setAttribute('controls', 'true');
            media.setAttribute('preload', 'auto');
            media.removeAttribute('muted');
            
        })
    }else {
        media.src = mediaSrc;
    }
    p.innerHTML = paragraphe
    content = appends(content, [media, p]);
    content.setAttribute('class', 'content');
    return content;
}

export const closePopup = (parent, child) => {
    const body = document.querySelectorAll('article a, button, select');
    body.forEach(element => {
        element.removeAttribute('tabIndex');
    })
    parent.removeChild(child);
    return true;
}

// export const handleCarousel = (carousel) => {
//     // console.log('carousel: ',carousel);
//     return new Promise((resolve) => {
//         const main = document.querySelector('#main');
//         const links = document.querySelectorAll('article a');
//         links.forEach((link, index) => {
//             const media = link.children[0];
//             link.addEventListener('click', () => {
//                 const title = document.querySelectorAll('article .textMedia > p')[index].textContent;
//                 // const cursorCarousel = carousel.play(index);
//                 // console.log('cursorCarousel: ', cursorCarousel);
//                 carousel.play(index);
//                 const popupDiv = popup(media.src, title, media.tagName);
//                 main.appendChild(popupDiv);
//                 const cross = document.querySelector('.cross');
//                 const next = document.querySelector('.right');
//                 const prev = document.querySelector('.left');
//                 // console.log(prev);
//                 cross.addEventListener('click', () => closePopup(main, popupDiv));
//                 resolve({next, prev});
//             }, false);
//         })

//         // link.addEventListener('keypress', (e) => {
//         //     document.activeElement.blur();
//         //     if(e.keyCode === 13){
//         //         console.log(e);
//         //         // if(e.keyCode === )
//         //     }
//         // },false)
//     })
// }

export const srcVideoFile = (src) => fetch(src)
            .then(result => result.blob())
            .then(videoBlob => window.URL.createObjectURL(videoBlob))

export const readVideosFile = () => {
    let videos = document.querySelectorAll('article video');
    // console.log('videos: ', videos);
    videos = Array.from(videos).map(video => fetch(video.src)
            .then(result => result.blob())
            .then(videoBlob => {
                // video.setAttribute('autoplay', 'true');
                video.setAttribute('muted', 'true');
                // video.setAttribute('loop', 'true');
                // video.setAttribute('controls', 'true');
                video.setAttribute('preload', 'auto');
                video.src = window.URL.createObjectURL(videoBlob);
                return video;
            }))
    Promise.all(videos).then(videos => {
        videos.forEach(video => {
            video.addEventListener('mouseover', async (e) => {
                const vid = e.target;
                // console.log('vid: ', vid);
                vid.setAttribute('autoplay', 'autoplay');
                vid.load();
            }, false)
        })
    })
}

export const playDirection = (arrow) => {
    console.log('arrow: ', arrow);
    const currentDirectionClass = arrow.className === 'right' ? 'current-right' : 'current-left';
    const directionClass = arrow.className === 'right' ? 'next-image': 'prev-image';
    const cursor = carousel.getCursor();
    const oldContent = document.querySelector('.content');
    const container = document.querySelector('.container');
    console.log('container: ',container);
    oldContent.classList.remove(currentDirectionClass)
    oldContent.classList.add(directionClass);
    setTimeout(() => {
        container.removeChild(oldContent);
        setTimeout(() => {
            currentContent.classList.add(currentDirectionClass);
            container.appendChild(currentContent);
        });
    },500)
    // if(arrow.className === 'right') { 
    //     carousel.getNextAt(cursor)} 
    // else{ 
    //     carousel.getPrevAt(cursor)
    // };
    // const currentContent = carousel.getCursor().value.getContent();
}

export const playNext = (dataCarousel, next) => {
    const {carousel, cursorCarousel} = dataCarousel
    next.addEventListener('click',(e) => {
        // console.log('className: ',e.target.className);
        // timeout = clearTimeout(timeout);
        const container = e.target.parentNode;
        // cursor = carousel.getCursor() || cursorCarousel;
        // oldContent = document.querySelector('.content');
        // oldContent.classList.remove('current-right')
        // oldContent.classList.add('next-image');
        // timeout = setTimeout(() => {
        //     container.removeChild(oldContent);
        //     setTimeout(() => {
        //         currentContent.classList.add('current-right')
        //         container.appendChild(currentContent);
        //     });
        // },500)
        // carousel.getNextAt(cursor);
        // // console.log('nextCursor:', carousel.getCursor())
        // currentContent = carousel.getCursor().value.getContent();
        nextContent(carousel, container);
    }, false);
}

export const playPrev = (dataCarousel, prev) => {
    const {carousel, cursorCarousel} = dataCarousel
    prev.addEventListener('click',(e) => {
        console.log('prev: ', prev);
        // timeout = clearTimeout(timeout);
        const container = e.target.parentNode;
        // cursor = carousel.getCursor() || cursorCarousel;
        // oldContent = document.querySelector('.content');
        // oldContent.classList.remove('current-left')
        // oldContent.classList.add('prev-image');
        // timeout = setTimeout(() => {
        //     container.removeChild(oldContent);
        //     setTimeout(() => {
        //         currentContent.classList.add('current-left');
        //         container.appendChild(currentContent);
        //     });
        // },500)
        // carousel.getPrevAt(cursor);
        // // console.log('PrevCursor:', carousel.getCursor())
        // currentContent = carousel.getCursor().value.getContent();
        // console.log('current content: ', currentContent)
        prevContent(carousel, container);
    }, false);
}


export const nextContent = (carousel, container) => {
    // console.log('className: ',e.target.className);
    // let timeout = clearTimeout(timeout);
    // const container = e.target.parentNode;
    const cursor = carousel?.getCursor() || cursorCarousel;
    const oldContent = document.querySelector('.content');
    oldContent.classList.remove('current-right')
    oldContent.classList.add('next-image');
    setTimeout(() => {
        container.removeChild(oldContent);
        setTimeout(() => {
            currentContent.classList.add('current-right')
            container.appendChild(currentContent);
        });
    },500)
    carousel.getNextAt(cursor);
    // console.log('nextCursor:', carousel.getCursor())
    const currentContent = carousel.getCursor().value.getContent();
}


export const prevContent = (carousel, container) => {
    // const timeout = clearTimeout(timeout);
    // const container = e.target.parentNode;
    const cursor = carousel.getCursor() || cursorCarousel;
    const oldContent = document.querySelector('.content');
    oldContent.classList.remove('current-left')
    oldContent.classList.add('prev-image');
    setTimeout(() => {
        container.removeChild(oldContent);
        setTimeout(() => {
            currentContent.classList.add('current-left');
            container.appendChild(currentContent);
        });
    },500)
    carousel.getPrevAt(cursor);
    // console.log('PrevCursor:', carousel.getCursor())
    const currentContent = carousel.getCursor().value.getContent();
}