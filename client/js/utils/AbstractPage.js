import AbstractComponent from "./AbstractComponent";

class AbstractPage extends AbstractComponent {

    #params;

    constructor(app, params = null) {
        super(app);
        this.#params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    get params() {
        return this.#params;
    }
    
    async html() {
        return null;
    }

}

export default AbstractPage;