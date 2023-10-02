//Mettre le code JavaScript lié à la page photographer.html
import { PhotographerTemplate } from '../templates/photographer.js';
import { List, sort, events, contactForm, ui, datas } from '../utils/index.js';
import { MediaTemplate } from '../templates/media.js';

const { 
    weightTitles, 
    mediasMapAlphabetic, 
    sortMediasByLikesDesc, 
    sortMediasByTitleAsc 
  } = sort;
  
const { photographer, medias } = datas;
const { updateLikeMedia } = events;
const { displayModal, closeModal } = contactForm;
const { readVideosFile } = ui;
console.log(photographer.name)
const h2Contact = document.querySelector('.modal h2');
h2Contact.innerHTML = `Contactez-moi ${photographer.name}`
const photographerTemplates = PhotographerTemplate(photographer)
let carousel = new List(medias[0], 'Media', 0);
const mediaTemplates = MediaTemplate(photographer, {carousel, valuesOpt:['-- trier par --','popularite', 'date', 'titre']});

// console.log('photographer:',photographer);

const mediasWeighted = weightTitles(photographer.medias);

const mediasAlphabetic = mediasMapAlphabetic(mediasWeighted);

const sortedMediaByTitleAsc = sortMediasByTitleAsc(mediasAlphabetic);

const sortedMediasByLikesDesc = sortMediasByLikesDesc(sortedMediaByTitleAsc.slice());

const sortBy = (orderBy) => orderBy === 'popularite' ? sortedMediasByLikesDesc : sortedMediaByTitleAsc;
const contactButton = document.querySelector('.contact_button');
const crossModal = document.querySelector('.modal img');

crossModal.addEventListener('click', closeModal, false);
contactButton.addEventListener('click', displayModal,false);

document.addEventListener('updateLikeMedia', updateLikeMedia, false);

// window.addEventListener('keyup', (e) => {
//     const container = document.querySelector('.container');
//     const body = document.querySelectorAll('article a, button, select');
//     const next = document.querySelector('.right');
//     const prev = document.querySelector('.left')
//     if(container){                                
//         body.forEach(element  => {
//             element.tabIndex = '-1'
//         })
//         // handleCarousel(carousel, (datasCarousel) => {
//         //     const {cursorCarousel, next, prev} = datasCarousel;
//         //     console.log('curs: ',cursorCarousel);
//         //     playNext({cursorCarousel, carousel}, next);
//         //     playPrev({cursorCarousel, carousel}, prev);
//         // })
//         if(e.keyCode === 39){
//             nextContent(carousel, container);
//             console.log(carousel.getCursor())
//         }
//     }
// });
window.onload = function(){
    mediaTemplates.render();
    photographerTemplates.render();
    const select = document.querySelector('select[name="sort"]');
    readVideosFile();
    select.addEventListener('change', function(e){
        const sectionMedias = document.querySelector('#medias');
        const mediaContainer = document.querySelector('#media');
        sectionMedias.removeChild(mediaContainer);
        const sortedMedias = sortBy(e.target.value);
        console.log('sortedMedias: ', sortedMedias);
        mediaTemplates.renderSortedMedias(sortedMedias);
    }, false)
}