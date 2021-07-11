import AbstractComponent from "../utils/AbstractComponent";

class Title extends AbstractComponent {

    constructor(app, { text }) {
        super(app, { text });
    }

    async html() {
        const title = document.createElement('h1');
        title.textContent = this.props.text;
        return title;
    }

}

export default Title;
