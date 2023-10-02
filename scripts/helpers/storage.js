class Database {
    constructor(key, value){
        this._key = key;
        this.storage = {};
        this._value = value;
    }

    get getStorage() {
        return this.storage;
    }

    get key(){
        return this._key;
    }

    get value(){
        return this._value;
    }

    add(key, value){
        this._value = Object.assign(this._value, {[key]: value});
        return this;
    }   

    flush(){
        localStorage.setItem(this._key, JSON.stringify(this._value));
        this.storage = localStorage.getItem(this._key);
        return this;
    }
}


const storage = new Database('Storage', {});

export  {storage};