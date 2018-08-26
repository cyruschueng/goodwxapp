export default function query(queryObject) {
    for (let param in queryObject) {
        if (queryObject.hasOwnProperty(param) && (queryObject[param] === undefined || queryObject[param] === '' || queryObject[param] === null) ) {
            delete queryObject[param];
        }
    }
    return queryObject;
}