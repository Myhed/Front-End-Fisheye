import { createElement, appends, p, getAsset } from '../utils/ui.js';
import { displayModal } from '../utils/contactForm.js';
export function PhotographerTemplate({country, city, tagline, name, portrait}){
    const header = document.querySelector('.photograph-header');
    
    function descriptionPhotograph(){
        const [div, h1] = createElement(['div','h1'])
        const located = p(`${country}, ${city}`);
        const catchPhrase = p(tagline);
        const textName = document.createTextNode(name);
        h1.appendChild(textName);
        const descriptionProfil = appends(div, [h1, located, catchPhrase]);

        descriptionProfil.setAttribute('class', 'descriptionProfil')
        header.appendChild(descriptionProfil);
    }

    function buttonContact(){
        let [button] = createElement(['button']);
        const textNode = document.createTextNode('Contacter-Moi');
        button.appendChild(textNode);
        button.setAttribute('class', 'contact_button');
        button.addEventListener('click', displayModal, false);
        header.appendChild(button);
    }

    function imageProfil(){
        const [img] = createElement(['img']);
        img.src = getAsset('photographers', portrait);
        img.setAttribute('class', 'imgProfile')
        img.setAttribute('alt', name);
        header.appendChild(img);
    }


    function render(){
        descriptionPhotograph();
        buttonContact();
        imageProfil();
    }

    return {render}
}