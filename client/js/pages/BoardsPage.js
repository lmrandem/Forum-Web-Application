import BoardsContainer from "../components/BoardsContainer";
import Button from "../components/Button";
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
        const { isLoggedIn } = this.app.auth.data;
        const boards = await this.#fetchBoards();

        return await this.wrapper(async (components) => {
            const title = document.createElement('h1');
            title.textContent = 'Discussion boards';
            components.push(title);

            if (isLoggedIn) {
                const createBtn = new Button(this.app, {
                    text: 'Create board',
                    type: 'button',
                    onClick: async () => {
                        await this.app.router.navigateTo('/boards/new');
                    }
                });
                components.push(await createBtn.render());
            }

            const boardsContainer = new BoardsContainer(this.app, {
                boards
            });
            components.push(await boardsContainer.render());
        });
    }

}

export default BoardsPage;
