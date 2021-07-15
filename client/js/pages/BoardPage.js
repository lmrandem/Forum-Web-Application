import Button from "../components/Button";
import PostsContainer from "../components/PostsContainer";
import AbstractPage from "../utils/AbstractPage";
import BoardService from "../utils/BoardService";
import PostService from "../utils/postService";
import SubscriptionService from "../utils/SubscriptionService";

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

    async subscribe() {
        const subscribe = await SubscriptionService.subscribe(this.params.name);
        if (subscribe?.success) {
            this.render();
        }
    }

    async unsubscribe() {
        const unsubscribe = await SubscriptionService.unsubscribe(this.params.name);
        if (unsubscribe?.success) {
            this.render();
        }
    }

    async isSubscribed() {
        const subscription = await SubscriptionService.getSubscription(this.params.name);
        if (subscription?.success) {
            return true;
        }
        return false;
    }

    async html() {
        const { isLoggedIn } = this.app.auth.data;
        const { name, title, description } = await this.#fetchBoard();

        const isSubscribed = await this.isSubscribed();

        this.setTitle(`${name}: ${title}`);

        return await this.wrapper(async (components) => {
            const boardTitle = document.createElement('h1');
            boardTitle.textContent = title;
            components.push(boardTitle);

            const boardDesc = document.createElement('p');
            boardDesc.textContent = description;
            components.push(boardDesc);

            const subscribeBtn = new Button(this.app, {
                text: isSubscribed ? 'Unsubscribe' : 'Subscribe',
                type: 'button',
                onClick: isSubscribed ? (
                    () => this.unsubscribe()
                ) : (
                    () => this.subscribe()
                )
            });
            components.push(await subscribeBtn.render());

            if (isLoggedIn) {
                const createBtn = new Button(this.app, {
                    text: 'Create',
                    onClick: async () => {
                        await this.app.router.navigateTo(`/b/${this.params.name}/new`);
                    },
                    type: 'button'
                });
                components.push(await createBtn.render());
            }

            const boardPosts = new PostsContainer(this.app, {
                fetchPosts: () => this.#fetchPosts()
            });
            components.push(await boardPosts.render());
        });
    }

}

export default BoardPage;
