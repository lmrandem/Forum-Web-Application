import AbstractComponent from "../utils/AbstractComponent";
import UserService from "../utils/userService";
import Button from "./Button";
import Link from "./Link";
import Navbar from "./Navbar";
import Text from "./Text";

class PageHeader extends AbstractComponent {

    constructor(app) {
        super(app);
    }

    async #handleLogout() {
        const logout = await UserService.logout();
        if (logout?.success) {
            await this.app.router.navigateTo('/');
        }
    }

    async html() {
        const { isLoggedIn, user } = await this.app.auth.data;

        const header = document.createElement('header');

        const navbar = new Navbar(this.app);
        header.append(await navbar.render());
        if (isLoggedIn) {
            const userName = new Link(this.app, {
                text: user.name,
                href: `/users/${user.username}`,
                activeClassName: 'link--active'
            })
            const button = new Button(this.app, {
                text: 'Logout',
                type: 'button',
                onClick: async () => {
                    await this.#handleLogout();
                }
            });
            header.append(
                await userName.render(),    
                await button.render()
            );
        }
        else {
            const button = new Button(this.app, {
                text: 'Login',
                type: 'button',
                onClick: async () => {
                    await this.app.router.navigateTo('/login');
                }
            });
            header.append(await button.render());
        }

        return header;
    }

}

export default PageHeader;
