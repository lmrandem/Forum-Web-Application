import BoardsContainer from "../components/BoardsContainer";
import AbstractPage from "../utils/AbstractPage";
import BoardService from "../utils/BoardService";

class BoardsPage extends AbstractPage {

    constructor(app, params) {
        super(app, params);
    }

    async #fetchBoards() {
        const boards = await BoardService.listBoards();
        if (boards?.success) {
            return boards.data;
        }
        return [];
    }

    async html() {
        const boards = await this.#fetchBoards();

        return await this.wrapper(async (components) => {
            const title = document.createElement('h1');
            title.textContent = 'Discussion boards';
            components.push(title);

            const boardsContainer = new BoardsContainer(this.app, {
                boards
            });
            components.push(await boardsContainer.render());
        });
    }

}

export default BoardsPage;
