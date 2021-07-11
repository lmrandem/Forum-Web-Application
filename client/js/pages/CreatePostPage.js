import Form from "../components/Form";
import Title from "../components/Title";
import AbstractPage from "../utils/AbstractPage";
import PostService from "../utils/postService";

class CreatePostPage extends AbstractPage {

    #formData;

    constructor(app, params) {
        super(app, params);
        this.setTitle('Create post');
        this.#formData = {
            title: '',
            content: ''
        }
    }

    async #submitPost(e) {
        e.preventDefault();
        const created = await PostService.createPost(this.#formData);
        if (created?.success) {
            await this.app.router.navigateTo('/posts');
        }
    }

    #handleChange(e) {
        e.preventDefault();
        this.#formData = {
            ...this.#formData,
            [e.target.id]: e.target.value
        }
    }

    async html() {
        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: 'Create post'
            });
            components.push(await title.render());
            const form = new Form(this.app, {
                objects: [
                    {
                        label: 'Title',
                        id: 'title',
                        value: this.#formData.title,
                        onInput: async (e) => this.#handleChange(e),
                        type: 'text'
                    },
                    {
                        label: 'Content',
                        id: 'content',
                        value: this.#formData.content,
                        onInput: async (e) => this.#handleChange(e),
                        type: 'text'
                    }
                ],
                buttonText: 'Create',
                onSubmit: (e) => this.#submitPost(e)
            });
            components.push(await form.render());
        });
    }

}

export default CreatePostPage;
