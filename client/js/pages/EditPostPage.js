import Form from "../components/Form";
import Title from "../components/Title";
import AbstractPage from "../utils/AbstractPage";
import PostService from "../utils/postService";
import Forbidden from "./Forbidden";
import NoMatch from "./NoMatch";

class EditPostPage extends AbstractPage {

    #formData;

    constructor(app, params) {
        super(app, params);
        this.#formData = {
            title: '',
            content: ''
        }
    }

    async #fetchPost(id) {
        const post = await PostService.getPost(id);
        if (post?.success) {
            this.#formData = {
                title: post.data.title,
                content: post.data.content
            }
            return post.data;
        }
        return null;
    }

    #handleChange(e) {
        e.preventDefault();
        this.#formData = {
            ...this.#formData,
            [e.target.id]: e.target.value
        }
    }

    async #submitPostUpdate(e) {
        e.preventDefault();
        const updated = await PostService.updatePost(this.params.id, this.#formData);
        if (updated?.success) {
            this.app.router.navigateTo(`/posts/${this.params.id}`);
        }
    }

    async html() {
        const { user } = this.app.auth.data;
        const { id } = this.params;
        if (!id) {
            const noMatch = new NoMatch(this.app);
            return await noMatch.render();
        }
        const post = await this.#fetchPost(id);
        if (!post) {
            const noMatch = new NoMatch(this.app);
            return await noMatch.render();
        }
        if (user.username !== post.username) {
            const forbidden = new Forbidden(this.app);
            return await forbidden.render();
        }
        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: `Edit post ${post.id} - ${post.title}`
            });
            components.push(await title.render());
            const form = new Form(this.app, {
                objects: [
                    {
                        label: 'Title',
                        id: 'title',
                        value: post.title,
                        onInput: (e) => this.#handleChange(e),
                        type: 'text'
                    },
                    {
                        label: 'Content',
                        id: 'content',
                        value: post.content,
                        onInput: (e) => this.#handleChange(e),
                        type: 'text'
                    }
                ],
                buttonText: 'Edit',
                onSubmit: async (e) => await this.#submitPostUpdate(e)
            });
            components.push(await form.render());
        });
    }

}

export default EditPostPage;
