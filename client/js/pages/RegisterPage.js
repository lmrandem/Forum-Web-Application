import Form from "../components/Form";
import Title from "../components/Title";
import AbstractPage from "../utils/AbstractPage";
import UserService from "../utils/userService";

class RegisterPage extends AbstractPage {

    #formData;

    constructor(app, params) {
        super(app, params);
        this.setTitle('Register');
        this.#formData = {
            username: '',
            name: '',
            email: '',
            password: ''
        }
    }

    async #register(e) {
        e.preventDefault();
        const register = await UserService.register(this.#formData);
        if (register?.success) {
            this.app.router.navigateTo('/');
        }
    }

    #handleChange(e) {
        const data = this.#formData;
        this.#formData = {
            ...data,
            [e.target.id]: e.target.value
        }
    }

    async html() {
        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: 'Register'
            });
            components.push(await title.render());

            const form = new Form(this.app, {
                objects: [
                    {
                        label: 'Username',
                        id: 'username',
                        value: this.#formData.username,
                        onInput: (e) => this.#handleChange(e),
                        type: 'text' 
                    },
                    {
                        label: 'Name',
                        id: 'name',
                        value: this.#formData.name,
                        onInput: (e) => this.#handleChange(e),
                        type: 'text' 
                    },
                    {
                        label: 'Email',
                        id: 'email',
                        value: this.#formData.email,
                        onInput: (e) => this.#handleChange(e),
                        type: 'email'
                    },
                    {
                        label: 'Password',
                        id: 'password',
                        value: this.#formData.password,
                        onInput: (e) => this.#handleChange(e),
                        type: 'password'
                    }
                ],
                buttonText: 'Register',
                onSubmit: async (e) => await this.#register(e)
            });
            components.push(await form.render());
        });
    }

}

export default RegisterPage;
