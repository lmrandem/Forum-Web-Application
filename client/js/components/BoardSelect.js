import AbstractComponent from "../utils/AbstractComponent";

class BoardSelect extends AbstractComponent {

    constructor(app, { id, label, placeholder, boards, onChange }) {
        super(app, { id, label, placeholder, boards, onChange });
    }

    async html() {
        return await this.wrapper((components) => {
            const label = document.createElement('label');
            label.textContent = this.props.label;
            label.htmlFor = this.props.id;
            components.push(label);

            const select = document.createElement('select');
            select.id = this.props.id;
            select.onchange = (e) => this.props.onChange(e);

            const placeholder = document.createElement('option');
            placeholder.textContent = this.props.placeholder;
            placeholder.value = '';
            placeholder.disabled = true;
            placeholder.selected = true;
            placeholder.hidden = true;

            if (this.props.boards) {
                const options = this.props.boards.map((board) => {
                    const o = document.createElement('option');
                    o.textContent = board.name;
                    o.value = board.name;
                    return o;
                });
                select.append(placeholder, ...options);
            }
            components.push(select);
        });
    }

}

export default BoardSelect;
