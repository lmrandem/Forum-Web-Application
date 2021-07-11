import AbstractComponent from "../utils/AbstractComponent";
import Link from "./Link";

class Navbar extends AbstractComponent {

    constructor(app) {
        super(app);
    }

    async html() {
        const navbar = document.createElement('nav');
        const home = new Link(this.app, {
            text: 'Home',
            href: '/',
            activeClassName: 'link--active'
        });
        const posts = new Link(this.app, {
            text: 'All posts',
            href: '/posts',
            activeClassName: 'link--active'
        });
        const boards = new Link(this.app, {
            text: 'Boards',
            href: '/boards',
            activeClassName: 'link--active'
        });
        navbar.append(
            await home.render(),
            await posts.render(),
            await boards.render()
        );
        return navbar;
    }

}

export default Navbar;
