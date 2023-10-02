
const AlphabetPos = Array(26).fill([]);
const SumOfWeightLettersTitle = (lettersTitle) => 
    Object.values(lettersTitle).reduce((acc, poundLetter) => acc += parseInt(poundLetter),0);

const weightLetters = (lettersTitle, titleKeyObject) => lettersTitle
.map(letter => letter.charCodeAt(0))
.reduce((acc, asciiCode) =>  
    (acc[titleKeyObject][getLetterFromAsciiCode(asciiCode)] = asciiCodeToAlphabeticLetterPos(asciiCode), 
acc), {[titleKeyObject]: {}})

const getLetterFromAsciiCode = (AsciiCodeLetter) => String.fromCharCode(AsciiCodeLetter);

const asciiCodeToAlphabeticLetterPos = (AsciiCodeLetter) => (AsciiCodeLetter - 122) + 26;

const findFirstCharacterTitle = (lettersTitle,titleKeyObject) =>
Object.keys(lettersTitle[titleKeyObject])
    .find((letter, index) => letter === titleKeyObject.substr(0, index+1));
    

export function weightTitles(medias){
     return medias
     .map(({title}) => title.replace(/[\W\d]+/gi,''))
     .map((title, index) => {
        const lettersTitle = title.toLowerCase().split('').filter(alphabet => alphabet !== ' ')
        const titleKeyObject = lettersTitle.join('');
        const titleWeight = weightLetters(lettersTitle, titleKeyObject);
        // console.log('titleWeight: ', titleWeight);
        const sumOfWeightLettersTitle = SumOfWeightLettersTitle(Object.values(titleWeight[titleKeyObject]));        
        const firstLetterWord = findFirstCharacterTitle(titleWeight,titleKeyObject);
        const weightFirstLetterWord = titleWeight[titleKeyObject][firstLetterWord];
        return {[titleKeyObject]:title ,titleWeight: sumOfWeightLettersTitle - weightFirstLetterWord, weightFirstLetterWord, media: medias[index]};
    });
}

export const mediasMapAlphabetic = (mediasWeighted) => mediasWeighted.reduce((acc, media) => {
    const weightFirstLetterWord = media.weightFirstLetterWord;
    // console.log('poundFirstLetterWord:', weightFirstLetterWord);
    acc[weightFirstLetterWord-1] = [...acc[weightFirstLetterWord-1], media];
    return acc;
}, AlphabetPos)

export const sortMediasByTitleAsc = (mediasMapAlphabetics) => mediasMapAlphabetics
    .filter(mediaMapAlphabetic => mediaMapAlphabetic.length > 0)
    .sort((media1, media2) => media1.titleWeight > media2.titleWeight)
    .reduce((acc, mediaMapAlphabetic) => acc = [...acc, ...mediaMapAlphabetic], [])


export const sortMediasByLikesDesc = (medias) => medias.sort((a,b) => a.media.likes < b.media.likes)

