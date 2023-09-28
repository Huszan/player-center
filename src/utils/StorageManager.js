const collection = {
    user: 'user'
}

const storageManager = {
    has: (collection) => { 
        let item = window.localStorage.getItem(collection);
        return item && item.length > 0 
    },
    get: (collection) => {
        return JSON.parse(window.localStorage.getItem(collection));
    },
    set: (collection, value) => {
        value = JSON.stringify(value);
        window.localStorage.setItem(collection, value);
    }
}

export { collection, storageManager }