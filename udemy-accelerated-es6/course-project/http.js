export class Http {
    static fetchData(url) {
        return new Promise((resolve, reject) => {
           const HTTP = new XMLHttpRequest();
           HTTP.open('GET', url);
           HTTP.onreadystatechange = function () {
               if(HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200) {
                   const RESPONSE_DATA = JSON.parse(HTTP.responseText);
                   resolve(RESPONSE_DATA);
               } else if (HTTP.readyState == XMLHttpRequest.DONE) {
                   reject('Error happen');
               }
           };
           HTTP.send();
        });
    }

    // or we can use FETCH
    static status(response) {
        if(response.status >=200 && response.status < 300) {
            return Promise.resolve(response)
        }
        else {
            return Promise.reject(new Error(response.status))
        }
    }

    static json(response) {
        return response.json()
    }
}
