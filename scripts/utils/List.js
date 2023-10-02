import { Link } from './link.js';

class List {
    constructor(value, type, index){
        this.firstLink = new Link(value, type, index);
        this.type = type;
    }
    getFirstLink(){
        return this.firstLink;
    }
    setLink(value, index){
        if(typeof this.nextLink !== 'undefined'){
            const link = new Link(value, 'Media', index);
            this.nextLink.setNextLink(link);
            link.setPrevLink(this.nextLink);
            this.nextLink = link;
            return this;
        }
        this.nextLink = new Link(value, 'Media', index);
        this.nextLink.setPrevLink(this.firstLink);
        this.firstLink.setNextLink(this.nextLink);
        return this;
    }

    getNextAt(current){
        if(typeof current.getNextLink() !== "undefined"){
            this.cursor = current.getNextLink();
        }else{
            this.cursor = this.firstLink;
        }
        // console.log('current: ',current)
        // console.log('cursor: ', this.cursor);
        return this.cursor
    }

    getPrevAt(current){
        console.log('getPrev: current', current.getPrevLink());
        if(typeof current.getPrevLink() !== "undefined"){
            this.cursor = current.getPrevLink();
        }else{
            this.cursor = this.firstLink;
        }
        this.firstLink.setPrevLink(this.getLastLink());
        return this.cursor
    }

    getNext(){
        if(typeof this.cursor !== 'undefined'){
            this.cursor = this.cursor;
            while(typeof this.cursor.getNextLink() !== 'undefined'){
                this.cursor = this.cursor.getNextLink();
                break;
            }
            // console.log('cursor: ', this.cursor.value);
            return this.cursor;
        }
        this.cursor = this.firstLink;
        return this.cursor;
    }

    resetCursor(){
        this.cursor = this.firstLink;
    }

    getLastLink(){
        let link = this.firstLink.getNextLink();
        while(link){
            if( !link.getNextLink()) break;
            link = link.getNextLink();
        }
        // console.log('last: link', link);
        return link;
    }

    getCursor(){
        return this.cursor;
    }

    // replaceLink(link, mediaDom){
    //   console.log('linked: ',link)
    // //   const newLink = new Link(link, this.type);
    // //   console.log('newLink: ',newLink);
    //   const currentLink = this.getNext();
    //   console.log('currentLink: ',currentLink.value);
    //   currentLink.replaceBy(link, mediaDom);
    //   return this;
    // }

    play(index){
        let count = 0;
        let nextLink = this.firstLink.getNextLink()
        let link = this.firstLink;
        if(index === 0){
            link = this.firstLink
            link.setPrevLink(this.getLastLink());
        }
        while(nextLink && count < index){
            link = nextLink
            nextLink = nextLink.getNextLink();
            count++;
        }
        this.cursor = link;
        return link;
    }
}

export default List;