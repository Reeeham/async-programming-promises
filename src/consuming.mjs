import setText, {appendText, showWaiting, hideWaiting} from './results.mjs';

export function get(){
}

export function getCatch(){
}

export function chain(){
}

export function chainCatch(){
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAdress}`);
    }).then(({data}) => {
        setText(`City: ${data.city}`);
    }).catch(err => setText(err));
}
export function final(){
    showWaiting();
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAdress}`);
    }).then(({data}) => {
        setText(`City: ${data.city}`);
        hideWaiting();
    }).catch(err => setText(err))
    .finally(()=> {
        setTimeout(() => {
            hideWaiting();
        }, 1500);
        appendText(" -- Completely Done");
    });
}