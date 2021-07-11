import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Navbar from "../components/Navbar";
import Text from "../components/Text";
import PageRouter from "../router/PageRouter";
import AbstractComponent from "../utils/AbstractComponent";
import UserService from "../utils/userService";

class MainLayout extends AbstractComponent {
    
    constructor(app) {
        super(app);
    }

    async html() {
        return this.wrapper(async (components) => {
            const header = new PageHeader(this.app);
            components.push(await header.render());

            const main = document.createElement('main');
            const pageRouter = new PageRouter(this.app);
            main.append(await pageRouter.render());
            components.push(main);
        });
    }

}

export default MainLayout;
