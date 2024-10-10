const init = (version = 1) => {
    const opendb = indexedDB.open("Summify", version);
    opendb.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("History");
    }
    return opendb;
}

const saveData = (data, objStore = "History", key = 1) => {
    const request = init(1);
    request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(objStore, 'readwrite');
        const store = transaction.objectStore(objStore);
        store.put(data, key);
        transaction.oncomplete = () => {
            db.close();
        }
    }
}

const getData = (objStore = "History", key = 1) => {
    const request = init(1);
    return new Promise(resolve => {
        request.onsuccess = event => {
            const db = event.target.result;
            const transaction = db.transaction(objStore, 'readonly');
            const store = transaction.objectStore(objStore);
            const result = store.get(key);
            result.onsuccess = () => {
                resolve(result.result);
            }
            transaction.oncomplete = () => {
                db.close();
            }
        }
    });
}
export { saveData, getData }