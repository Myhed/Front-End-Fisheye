import { data, storage, url } from '../helpers/index.js';
import { AccueilTemplate } from '../templates/accueil.js'
const { getPhotographersWithHisMedia, getPhotographerById } = data;
const { paramsUrl } = url;


console.log('storage: ', storage.storage);

const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const { getUserCardDOM } = AccueilTemplate(photographer);
        const userCardDOM =  getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

const init = async () => {
    // Récupère les datas des photographes
    const photographers = await Promise.all( await getPhotographersWithHisMedia());
    // console.log('photographers: ', photographers);
    displayData(photographers);
    return {storage, photographers};
}

function Click(photographers, storage){
    const link = async (e) => {
      e.preventDefault();
      const href = e.target.href || e.target.parentNode.href;
      const params = paramsUrl(href);
      const photographerId = params.get('photographerId');
      console.log('photographerId: ', photographerId);

      const photographer = await getPhotographerById(photographerId, photographers);
      console.log('storage: ', storage)
        storage.storage
        .add('photographer', photographer)
        .add('photographers', photographers)
        .flush();
        // console.log(storage);
        console.log('async: ',photographers);
        window.location = 'photographer.html'
    }  
    return {link};
}


// function clickeableElement(element, obj){
//     let elementDom;
//     console.log('obj: ', obj);
//     if(typeof element !== 'NodeList' && typeof element !== 'HTMLElement'){
//         elementDom = document.querySelector(element);
//     }else{
//         elementDom = element;
//     }
//     if(elementDom.children.length < 0 || !elementDom.children){
//         return 0;
//     }

//     const children = elementDom.children;
//     console.log(Array.from(children));
//     return Array.from(children).reduce((acc, child, index) => {
//         const selector = child.className === '' && child.id === '' ? child.tagName: child.className !== '' ? document.querySelectorAll(`.${child.className}`) : document.querySelector(`#${child.id}`);
//         console.log('className: ', child.className !== '');
//         console.log('id: ', child.id !== '');
//         console.log('href: ',child.href)
//         // console.log('selector',selector.toLowerCase());
//         // console.log('element tag: ', elementDom.tagName);
//         console.log('clickeable: ', child.clickeable);
//         if(child.clickeable){
//             acc[index] = {...acc, child}
//         }
//         // console.log('selector: ',`${elementDom.tagName.toLowerCase()} ${selector.toLowerCase()}`);
//         clickeableElement(selector, acc);
//         console.log('acc: ', acc);
//         return acc;
//     }, [...obj]);
// }



window.onload = function(){
    init()
    .then(({storage, photographers}) => {
        const accessibilityElements = document.querySelectorAll('a');
        console.log('accessibilityElements: ', accessibilityElements);
        console.log('photographers: ', photographers);
        // if(localStorage.getItem('Storage')){
        //     photographers = JSON.parse(localStorage.getItem('Storage')).photographers;
        // }
        const { link } = new Click(photographers, storage)
        const linkPhotographers = document.querySelectorAll('figure > a');
        Array.from(linkPhotographers).map(linkPhotographer => {
            linkPhotographer.addEventListener('click', link, false); 
            linkPhotographer.clickeable = true;
            console.log([linkPhotographer])
        })
        // console.log('returned value: ',clickeableElement('body', []));
    })
}