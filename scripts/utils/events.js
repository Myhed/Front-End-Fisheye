import { storage } from '../helpers/storage.js';

export const eventPhotographer = new CustomEvent('updateLikeMedia', {
    bubbles: true,
    detail: {
        photographers: (JSON.parse(localStorage.getItem('Storage'))).photographers,
        photographer: (JSON.parse(localStorage.getItem('Storage'))).photographer
    }
})


export const updateLikeMedia = (e) => {
    const {photographers, incrementedLike, idMedia, photographer} = e.detail;
    const currentPhotographer = photographer;
    // console.log('currentPhotographer: ', currentPhotographer);
    const photographerMediaUpdated = photographer.medias.map(media => {
        if(media.id === idMedia){
            media.likes = incrementedLike;
        }

        return media;
    })
    console.log('photographers update: ', photographers);
    const photographerUpdated = photographers.map(photographer => {
        if(photographer.id === currentPhotographer.id){
            photographer.medias = photographerMediaUpdated;
        }
        return photographer;
    });

    storage
        .add('photographer', photographer)
        .add('photographers', photographerUpdated)
        .flush();
}