import AbstractComponent from "../utils/AbstractComponent";

class TextArea extends AbstractComponent {

    constructor(app, { label, id, value, onInput }) {
        super(app, { label, id, value, onInput });
    }

    async html() {
        return await this.wrapper(async (components) => {
            const label = document.createElement('label');
            label.textContent = this.props.label;
            components.push(label);

            const textarea = document.createElement('textarea');
            textarea.id = this.props.id;
            textarea.value = this.props.value;
            textarea.oninput = (e) => this.props.onInput(e);
            components.push(textarea);
        });
    }

}

export default TextArea;
