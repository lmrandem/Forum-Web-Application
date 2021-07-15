import AbstractComponent from "../utils/AbstractComponent";
import Link from "./Link";

class Navbar extends AbstractComponent {

    constructor(app) {
        super(app);
    }

    async html() {
        const navbar = document.createElement('nav');
        const posts = new Link(this.app, {
            text: 'Posts',
            href: '/',
            activeClassName: 'link--active'
        });
        const boards = new Link(this.app, {
            text: 'Boards',
            href: '/boards',
            activeClassName: 'link--active'
        });
        navbar.append(
            await posts.render(),
            await boards.render()
        );
        return navbar;
    }

}

export default Navbar;
