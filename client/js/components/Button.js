import AbstractComponent from "../utils/AbstractComponent";

class Button extends AbstractComponent {

    constructor(app, { text, onClick = null, type, className = null }) {
        super(app, { text, onClick, type, className });
    }

    async html() {
        const button = document.createElement('button');
        button.textContent = this.props.text;
        if (this.props.onClick) {
            button.onclick = this.props.onClick;
        }
        if (this.props.className) {
            button.className = this.props.className;
        }
        button.type = this.props.type;
        return button;
    }

}

export default Button;
