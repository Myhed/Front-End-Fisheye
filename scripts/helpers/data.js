export function request(url, opts = {}){
    const request = new Request(url, opts);
    return fetch(request)
        .then(res => res.json())
}

async function _getPhotographers(){
    const { photographers } = await request('./data/photographers.json');
    return photographers.map(photographer => {
        const [first, last] = photographer.name.split(' ');
        photographer.last = last;
        photographer.first = first;
        return photographer;
    });
}

async function _getMedias(){
    const { media } =  await request('./data/photographers.json');
    return media;
}

async function _findAllMediaPhotographer(name){
    const [photographer, medias] = await Promise.all([getPhotographerByName(name), _getMedias()])
    return medias
        .filter(media => media.photographerId === photographer.id)
        .reduce((acc, media) => {
            const {id, title, image, likes , video} = media;
            const whatMediaIs = image || video;
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

export async function getPhotographerByName(name, photographersMap){
    const photographers = photographersMap || await _getPhotographers()
    return photographers.find(photographer => photographer.first === name);
}

export async function getPhotographerById(id, photographersMap){
    const photographers = photographersMap || await  _getPhotographers();
    return photographers.find(photographer => photographer.id == id);
}


export async function getPhotographersWithHisMedia(photographersMap){
    const photographers = photographersMap || await _getPhotographers();
    return photographers.map(photographer => _findAllMediaPhotographer(photographer.first));
}
