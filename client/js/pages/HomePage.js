import Button from '../components/Button';
import Text from '../components/Text';
import Title from '../components/Title';
import AbstractPage from '../utils/AbstractPage';
import UserService from '../utils/userService';

class HomePage extends AbstractPage {

    #isActive;

    constructor(app, params) {
        super(app, params);
        this.setTitle('Home');
        this.#isActive = false;
    }

    async html() {
        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: 'Home'
            });
            components.push(await title.render());
            
            const text = new Text(this.app, {
                text: 'This is a small web app for creating posts.'
            });
            components.push(await text.render());
            
            const button = new Button(this.app, {
                text: 'Click me',
                onClick: async () => {
                    this.#isActive = !this.#isActive;
                    await this.render();
                },
                type: 'button'
            });
            components.push(await button.render());

            if (this.#isActive) {
                const clicked = new Text(this.app, {
                    text: 'The button has been clicked!'
                });
                components.push(await clicked.render());
            }
        });
    }

}

export default HomePage;