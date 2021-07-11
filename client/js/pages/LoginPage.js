import Form from "../components/Form";
import Link from "../components/Link";
import Title from "../components/Title";
import AbstractPage from "../utils/AbstractPage";
import UserService from "../utils/UserService";

class LoginPage extends AbstractPage {

    #formData;

    constructor(app, params) {
        super(app, params);
        this.setTitle('Login');
        this.#formData = {
            email: '',
            password: ''
        }
    }

    async #login(e) {
        e.preventDefault();
        const loggedIn = await UserService.login(this.#formData);
        if (loggedIn?.success) {
            this.app.auth.authenticate();
            this.app.router.navigateTo('/');
        }
    }

    #handleChange(e) {
        this.#formData = {
            ...this.#formData,
            [e.target.id]: e.target.value
        }
    }

    async html() {
        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: 'Login'
            });
            components.push(await title.render());

            const form = new Form(this.app, {
                objects: [
                    {
                        label: 'Email',
                        id: 'email',
                        value: '',
                        onInput: (e) => this.#handleChange(e),
                        type: 'email'
                    },
                    {
                        label: 'Password',
                        id: 'password',
                        value: '',
                        onInput: (e) => this.#handleChange(e),
                        type: 'password'
                    }
                ],
                buttonText: 'Login',
                onSubmit: async (e) => await this.#login(e)
            });
            components.push(await form.render());

            const link = new Link(this.app, {
                text: 'Create an account',
                href: `/register`
            });
            components.push(await link.render());
        });
    }

}

export default LoginPage;