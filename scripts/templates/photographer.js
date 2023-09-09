import { addAriaAttr } from '../utils/attribut.js';
import { p, appends, createElement } from '../utils/generic.js';

export function photographerTemplate(data) {
    const { first, last, id, country, city, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    const name = `${first} ${last}`;

    function userCardDOM() {
        const [article, img, h2, a] = createElement(['article', 'img', 'h2', 'a']);
        let link = a;
        img.setAttribute("src", picture)
        h2.textContent = name;
        link.href = `photographer.html?photographerId=${id}`
        link = appends(link, [img, h2])
        article.appendChild(addAriaAttr(link, name));
        return (article);
    }

    function userDescriptionDOM(){
        const div = document.createElement('div');
        const located = p(`${country}, ${city}`);
        const catchPhrase = p(`${tagline}`);
        const cost = p(`${price}€/jour`);
        return appends(div, [located, catchPhrase, cost]);
    }

    function getUserCardDOM(){
        const userCard = userCardDOM();
        const userDescription = userDescriptionDOM();
        userCard.appendChild(userDescription);
        return userCard;
    }

    return { name, picture, getUserCardDOM }
}