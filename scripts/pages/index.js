    import { photographerTemplate } from '../templates/photographer.js';
    import { closeModal, displayModal } from '../utils/contactForm.js';
    import {getPhotographersWithHisMedia} from '../helpers/data.js';

    function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            console.log(userCardDOM);
            photographersSection.appendChild(userCardDOM);
        });
    }

    function init() {
        // Récupère les datas des photographes
        const photographers = getPhotographersWithHisMedia();
        console.log(photographers);
        displayData(photographers);
    }
    
    init();