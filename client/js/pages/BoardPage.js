import PostsContainer from "../components/PostsContainer";
import AbstractPage from "../utils/AbstractPage";
import BoardService from "../utils/BoardService";
import PostService from "../utils/postService";

class BoardPage extends AbstractPage {

    constructor(app, params) {
        super(app, params);
    }

    async #fetchBoard() {
        const board = await BoardService.getBoard(this.params.name);
        if (board?.success) {
            return board.data;
        }
        return null;
    }

    async #fetchPosts() {
        const posts = await PostService.listPosts({
            board: this.params.name
        });
        if (posts?.success) {
            return posts.data;
        }
        return [];
    }

    async html() {
        const { name, title, description } = await this.#fetchBoard();
        // const posts = this.#getBoardPosts();

        this.setTitle(`${name}: ${title}`);

        return await this.wrapper(async (components) => {
            const boardTitle = document.createElement('h1');
            boardTitle.textContent = title;
            components.push(boardTitle);

            const boardDesc = document.createElement('p');
            boardDesc.textContent = description;
            components.push(boardDesc);

            const boardPosts = new PostsContainer(this.app, {
                fetchPosts: () => this.#fetchPosts()
            });
            components.push(await boardPosts.render());
        });
    }

}

export default BoardPage;
