export function p(text){
    const p = document.createElement('p');
    const textNode = document.createTextNode(text);
    p.appendChild(textNode);
    return p;
}

export const appends = (HtmlElement, childs) => 
    childs.reduce((acc, child) => (acc.appendChild(child), acc), HtmlElement)

export const createElement = (arrayHtmlTags) => arrayHtmlTags.map(htmlTag => document.createElement(htmlTag));