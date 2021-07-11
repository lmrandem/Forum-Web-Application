import Title from "../components/Title";
import AbstractPage from "../utils/AbstractPage";

class NoMatch extends AbstractPage {

    constructor(app) {
        super(app);
        this.setTitle('Page not found');
    }

    async html() {
        const title = new Title(this.app, {
            text: 'Page not found'
        });
        return await title.render();
    }

}

export default NoMatch;
