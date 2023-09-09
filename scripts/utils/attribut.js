export function addAriaAttr(HtmlElement, content){
    HtmlElement.setAttribute('aria-label', content)
    return HtmlElement
}