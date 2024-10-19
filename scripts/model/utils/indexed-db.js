// Function to initialize or upgrade the IndexedDB database.
const init = (version = 1) => {
    // Opens a connection to the "Summify" IndexedDB database with the specified version.
    const opendb = indexedDB.open("Summify", version);
    // Event handler for when the database needs to be upgraded.
    opendb.onupgradeneeded = (event) => {
        const db = event.target.result; // Gets the database object.
        db.createObjectStore("History"); // Creates an object store named "History".
    };
    return opendb; // Returns the database open request.
};

// Function to save data to the IndexedDB database.
const saveData = (data, objStore = "History", key = 1) => {
    const request = init(1); // Initializes the database.
    request.onsuccess = event => { // Handles successful database opening.
        const db = event.target.result; // Gets the database object.
        // Starts a read-write transaction on the specified object store.
        const transaction = db.transaction(objStore, 'readwrite');
        const store = transaction.objectStore(objStore); // Gets the object store.
        store.put(data, key); // Puts the data into the object store with the given key.
        //Event handler for when the transaction completes successfully.
        transaction.oncomplete = () => {
            db.close(); // Closes the database connection.
        };
    };
};

// Function to retrieve data from the IndexedDB database.
const getData = (objStore = "History", key = 1) => {
    const request = init(1); // Initializes the database.
    return new Promise(resolve => { // Returns a Promise to handle the asynchronous operation.
        request.onsuccess = event => { // Handles successful database opening.
            const db = event.target.result; // Gets the database object.
            // Starts a read-only transaction on the specified object store.
            const transaction = db.transaction(objStore, 'readonly');
            const store = transaction.objectStore(objStore); // Gets the object store.
            const result = store.get(key); // Gets the data from the object store with the given key.
            //Event handler for when the data retrieval is successful.
            result.onsuccess = () => {
                resolve(result.result); // Resolves the Promise with the retrieved data.
            };
            //Event handler for when the transaction completes successfully.
            transaction.oncomplete = () => {
                db.close(); // Closes the database connection.
            };
        };
    });
};
// Exports the saveData and getData functions.
export { saveData, getData };
