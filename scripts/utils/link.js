import Media from './media.js';

const classLink = {Media}
export class Link {
    constructor(link, type, index){
        this.value= new classLink[type](index, link);
        this.type = type;
    }

    setNextLink(link){
        this.nextLink = link;
    }

    setPrevLink(prevLink){
        this.prevLink = prevLink;
    }

    getNextLink(){
        return this.nextLink;
    }

    // replaceBy(value, mediaDom){
    //     // console.log('link replace by: ',link)
    //     // const value = new classLink[this.type](link, this.type);
    //     this.value.replaceDom(value, mediaDom);
    //     // this.value = new classLink[this.type](link, this.type);
    //     return this;
    // }
    getPrevLink(){
        return this.prevLink;
    }
}