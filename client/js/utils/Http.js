class Http {

    #baseUrl;
    #request;

    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
        this.#request = new XMLHttpRequest();
    }

    async #sendRequest(path, requestMethod, data = null) {
        return new Promise((resolve, reject) => {
            this.#request.open(requestMethod, `${this.#baseUrl}${path}`, true);
            this.#request.withCredentials = true;
            this.#request.onreadystatechange = () => {
                if (this.#request.readyState === 4) {
                    if (this.#request.status === 200) {
                        resolve(JSON.parse(this.#request.responseText));
                    }
                    else {
                        reject(JSON.parse(this.#request.responseText));
                    }
                }
            }
            this.#request.send(JSON.stringify(data));
        });
    }

    async get(path) {
        return await this.#sendRequest(path, 'GET');
    }

    async post(path, data = null) {
        return await this.#sendRequest(path, 'POST', data);
    }

    async put(path, data = null) {
        return await this.#sendRequest(path, 'PUT', data);
    }

    async delete(path) {
        return await this.#sendRequest(path, 'DELETE');
    }
}

export default Http;
