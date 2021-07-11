import AbstractComponent from "../utils/AbstractComponent";

class Input extends AbstractComponent {

    constructor(app, { label, id, value, onInput, type }) {
        super(app, { label, id, value, onInput, type });
    }

    async html() {
        return await this.wrapper(async (components) => {
            const label = document.createElement('label');
            label.textContent = this.props.label;
            label.htmlFor = this.props.id;
            components.push(label);

            const input = document.createElement('input');
            input.id = this.props.id;
            input.value = this.props.value;
            input.type = this.props.type;
            input.oninput = this.props.onInput;
            components.push(input);
        });
    }

}

export default Input;
