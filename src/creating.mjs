import setText, { appendText } from "./results.mjs";

export function timeout() {
    var wait = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Timeout!");
        },1500)
    });

    wait.then(text => setText(text));

}

export function interval() {
    let counter = 0;
    var wait = new Promise((resolve) => {
        setInterval(() => {//set multiple times
            console.log("Interval")
            resolve(`Timeout! ${++counter}`);
        },1500)
    });

    wait.then(text => setText(text))
    .finally(() => appendText(` -- Done ${counter}`));
}

export function clearIntervalChain() {
    let counter = 0;
    let interval;
    var wait = new Promise((resolve) => {
        interval = setInterval(() => {//set multiple times
            console.log("Interval")
            resolve(`Timeout! ${++counter}`);
        },1500)
    });

    wait.then(text => setText(text))
    .finally(() => clearInterval(interval));
}

export function xhr() {
    let request = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/7");
        xhr.onload = () => {
            if(xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        } 
        xhr.onerror = () => reject("Request Failed");
        xhr.send();
    });

    request.then(result => setText(result))
           .catch(reason => setText(reason))
}

export function allPromises() {

    //all of them are promises
    //either all fullfil or the first one is rejected

    let categories = axios.get('http://localhost:3000/itemCategories');
    let statuses = axios.get('http://localhost:3000/orderStatuses');
    let userTypes =  axios.get('http://localhost:3000/userTypes');
    let addressesTypes = axios.gte("http://localhost:3000/addressTypes");
    Promise.all([categories, statuses, userTypes,addressesTypes])
            .then(([cat, stat, type,address]) => {
                setText("");
                appendText(JSON.stringify(cat.data));
            }).catch(reasons => {
                setText(reasons);
            })
}

export function allSettled() {
    //all of them are promises
    //either all fullfil or the first one is rejected

    let categories = axios.get('http://localhost:3000/itemCategories');
    let statuses = axios.get('http://localhost:3000/orderStatuses');
    let userTypes =  axios.get('http://localhost:3000/userTypes');
    let addressesTypes = axios.gte("http://localhost:3000/addressTypes");
    Promise.allSettled([categories, statuses, userTypes,addressesTypes])
            .then((values) => {
                let results = values.map(v => {
                    if(v.status === 'fulfilled') {
                        return `FULFILLED: ${JSON.stringify(v.value.data[0])}`;
                    }
                    return `REJECTED: ${v.reason.message}`;
                })
                setText(results);
            }).catch(reasons => {
                setText(reasons);
            })
}
//resolved {status:"fulfilled",value:{}}
//rejected {status:"rejected",reason:{}}
export function race() {
    //i want to fire off both of these requests
    //but we want the results of te first one to settle
    //so we won't use all or allSettled 
    // because both of them would wait to settle
    let users = axios.get("http://localhost:3000/users");
    let backup = axios.get("http://localhost:3001/users");

    Promise.race([users,backup])
    .then(users => setText(JSON.stringify(users.data)))
    .catch(reason => setText(reason));

}
