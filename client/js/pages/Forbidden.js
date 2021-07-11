import Title from "../components/Title";
import AbstractPage from "../utils/AbstractPage";

class Forbidden extends AbstractPage {

    constructor(app) {
        super(app);
        this.setTitle('Forbidden');
    }

    async html() {
        const title = new Title(this.app, {
            text: 'Forbidden'
        });
        return await title.render();
    }

}

export default Forbidden;
