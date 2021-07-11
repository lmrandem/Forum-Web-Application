import AbstractComponent from "../utils/AbstractComponent";

class Text extends AbstractComponent {

    constructor(app, { text, className = null }) {
        super(app, { text, className });
    }

    async html() {
        const text = document.createElement('p');
        text.textContent = this.props.text;
        if (this.props.className) {
            text.className = this.props.className;
        }
        return text;
    }

}

export default Text;
