import AbstractPage from "../utils/AbstractPage";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Title from "../components/Title";
import Button from "../components/Button";
import BoardService from "../utils/BoardService";

class CreateBoardPage extends AbstractPage {

    #formData;

    constructor(app, params) {
        super(app, params);
        this.#formData = {
            name: '',
            title: '',
            description: ''
        }
    }

    async #submitBoard(e) {
        e.preventDefault();
        const created = await BoardService.createBoard(this.#formData);
        if (created?.success) {
            await this.app.router.navigateTo(`/b/${this.#formData.name}`);
        }
    }

    #handleChange(e) {
        this.#formData = {
            ...this.#formData,
            [e.target.id]: e.target.value
        }
        console.log(this.#formData);
    }

    async html() {
        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: 'Create board'
            });
            components.push(await title.render());

            const form = document.createElement('form');
            form.onsubmit = async (e) => await this.#submitBoard(e);

            const nameInput = new Input(this.app, {
                label: 'Name',
                id: 'name',
                value: this.#formData.name,
                onInput: (e) => this.#handleChange(e),
                type: 'text'
            });

            const titleInput = new Input(this.app, {
                label: 'Title',
                id: 'title',
                value: this.#formData.title,
                onInput: (e) => this.#handleChange(e),
                type: 'text'
            });

            const descriptionInput = new TextArea(this.app, {
                label: 'Description',
                id: 'description',
                value: this.#formData.description,
                onInput: (e) => this.#handleChange(e)   
            });

            const btn = new Button(this.app, {
                text: 'Create',
                type: 'submit'
            })

            form.append(
                await nameInput.render(),
                await titleInput.render(),
                await descriptionInput.render(),
                await btn.render()
            );
            
            components.push(form);
        });
    }

}

export default CreateBoardPage;
