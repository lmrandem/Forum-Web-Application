class AbstractComponent {

    #app;
    #properties;
    #element;

    constructor(app, properties = null) {
        this.#app = app;
        this.#properties = properties;
        this.#element = null;
    }

    get app() {
        return this.#app;
    }

    get props() {
        return this.#properties;
    }

    get element() {
        return this.#element;
    }

    async wrapper(callback) {
        const div = document.createElement('div');
        const components = [];
        await callback(components);
        div.append(...components);
        return div;
    }

    async render() {
        const el = await this.html();
        if (this.#element) {
            this.#element.replaceWith(el);
        }
        this.#element = el;
        return this.#element;
    }

    async html() {
        return null;
    }

}

export default AbstractComponent;