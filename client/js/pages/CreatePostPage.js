import BoardSelect from "../components/BoardSelect";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Title from "../components/Title";
import AbstractPage from "../utils/AbstractPage";
import BoardService from "../utils/BoardService";
import PostService from "../utils/postService";

class CreatePostPage extends AbstractPage {

    #formData;

    constructor(app, params) {
        super(app, params);
        this.setTitle('Create post');
        this.#formData = {
            board: params.name,
            title: '',
            content: ''
        }
    }

    async #submitPost(e) {
        e.preventDefault();
        const created = await PostService.createPost(this.#formData);
        if (created?.success) {
            await this.app.router.navigateTo(`/b/${this.params.name}`);
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
                text: 'Create post'
            });
            components.push(await title.render());

            const form = document.createElement('form');
            form.onsubmit = async (e) => await this.#submitPost(e);

            const titleInput = new Input(this.app, {
                label: 'Title',
                id: 'title',
                value: this.#formData.title,
                onInput: (e) => this.#handleChange(e),
                type: 'text'
            });

            const contentInput = new TextArea(this.app, {
                label: 'Content',
                id: 'content',
                value: this.#formData.content,
                onInput: (e) => this.#handleChange(e)   
            });

            const btn = new Button(this.app, {
                text: 'Post',
                type: 'submit'
            })

            form.append(
                await titleInput.render(),
                await contentInput.render(),
                await btn.render()
            );
            
            components.push(form);
        });
    }

}

export default CreatePostPage;
