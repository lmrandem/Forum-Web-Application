import Button from '../components/Button';
import PostsContainer from '../components/PostsContainer';
import Title from '../components/Title';
import AbstractPage from '../utils/AbstractPage';
import PostService from '../utils/postService';

class PostsPage extends AbstractPage {

    #showAll;

    constructor(app, params) {
        super(app, params);
        this.setTitle('Posts');
        this.#showAll = false;
    }

    async #listPosts() {
        const posts = await PostService.listPosts();
        if (posts?.success) {
            return posts.data;
        }
        return [];
    }

    async #listSubscribedPosts() {
        const posts = await PostService.listSubscribedPosts();
        if (posts?.success) {
            return posts.data;
        }
        return [];
    }

    async html() {
        const { isLoggedIn } = this.app.auth.data;
        if (!isLoggedIn) {
            this.#showAll = true;
        }

        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: 'Posts'
            });
            components.push(await title.render());
            
            if (isLoggedIn) {
                const toggleBtn = new Button(this.app, {
                    text: this.#showAll ? 'Your feed' : 'All posts',
                    onClick: async () => {
                        this.#showAll = !this.#showAll;
                        this.render();
                    },
                    type: 'button'
                });
                components.push(await toggleBtn.render());
            }

            const postsList = new PostsContainer(this.app, {
                fetchPosts: this.#showAll ? (
                    () => this.#listPosts()
                ) : (
                    () => this.#listSubscribedPosts()
                )
            });
            components.push(await postsList.render());
        });
    }

}

export default PostsPage;