import * as datas from '../../data/photographers.json' assert {type: "json"};


function _getPhotographers(){
    const { photographers } = datas.default;
    
    return photographers.map(photographer => {
        const [first, last] = photographer.name.split(' ');
        photographer.last = last;
        photographer.first = first;
        return photographer;
    });
}

function _getMedias(){
    const { media } = datas.default;
    return media;
}

function _findAllMediaPhotographer(name){
    const photographer = getPhotographerByName(name);
    const medias = _getMedias();
    return medias
        .filter(media => media.photographerId === photographer.id)
        .reduce((acc, media) => {
            const {id, title, image, likes , video} = media;
            const whatMediaIs = image ?? video;
            acc = {...photographer, medias: acc?.medias.concat([{id, title,
                media: _mediaType(`images/${photographer.first}/${whatMediaIs}`), likes}])}
            return acc;
        }, {medias: []});
}

function _mediaType(media = ''){
    const videoRegex = new RegExp(/[\.mp4|\.mkv]+$/g)
    if(videoRegex.test(media)){
        return {type: 'video', path: media}
    }
    return {type: 'image', path: media }
}

export function getPhotographerByName(name, photographersMap){
    const photographers = photographersMap || _getPhotographers();
    return photographers.find(photographer => photographer.first === name);
}

export function getPhotographerById(id, photographersMap){
    const photographers = photographersMap || _getPhotographers() ;
    return photographers.find(photographer => photographer.id === id);
}


export function getPhotographersWithHisMedia(){
    const photographers = _getPhotographers();
    return photographers.map(photographer => _findAllMediaPhotographer(photographer.first));
}