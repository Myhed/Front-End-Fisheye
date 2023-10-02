import { createElement, appends, addAriaAttr, p } from '../utils/ui.js';
export function AccueilTemplate(data) {
    const { first, last, portrait, id, country, city, tagline, price} = data;
    const picture = `assets/photographers/${portrait}`;
    const name = `${first} ${last}`;

    function userCardDOM() {
        const [figure, img, h2, a] = createElement(['figure','img', 'h2', 'a']);
        let link = a;
        img.setAttribute("src", picture)
        img.setAttribute("alt", name);
        h2.textContent = name;
        link.href = `index.html?photographerId=${id}`
        link = appends(link, [img, h2])
        figure.appendChild(addAriaAttr(link, name));
        return (figure);
    }

    function userDescriptionDOM(){
        const div = document.createElement('figcaption');
        div.setAttribute('class', 'description');
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
