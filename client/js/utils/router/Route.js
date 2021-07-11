class Route {

    #path;
    #page;

    constructor(path) {
        this.#path = path;
        this.#page = null;
    }

    to(page) {
        this.#page = page;
        return this;
    }

    get path() {
        return this.#path;
    }

    get page() {
        return this.#page;
    }

}

export default Route;
