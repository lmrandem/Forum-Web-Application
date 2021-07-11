import AbstractComponent from '../utils/AbstractComponent';
import Input from './Input';
import Button from './Button';

class Form extends AbstractComponent {

    constructor(app, { objects, buttonText, onSubmit }) {
        super(app, { objects, buttonText, onSubmit });
    }

    async html() {
        const form = document.createElement('form');
        form.onsubmit = async (e) => await this.props.onSubmit(e);
        let objects = [];
        if (this.props.objects) {
            objects = await Promise.all(this.props.objects.map(async (object) => {
                const input = new Input(this.app, object);
                return await input.render();
            }));
        }
        const submitBtn = new Button(this.app, {
            text: this.props.buttonText,
            type: 'submit',
            className: `
                button-size-1 
                blue-background 
                text-color-white
                no-border 
                rounded-corners 
                text-uppercase
                hover-bg-red`
        });
        form.append(...objects, await submitBtn.render());
        return form;
    }

}

export default Form;
