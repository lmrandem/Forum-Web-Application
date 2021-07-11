import Button from '../components/Button';
import PostsContainer from '../components/PostsContainer';
import Title from '../components/Title';
import AbstractPage from '../utils/AbstractPage';
import PostService from '../utils/postService';

class PostsPage extends AbstractPage {

    constructor(app, params) {
        super(app, params);
        this.setTitle('Posts');
    }

    async #listPosts() {
        const posts = await PostService.listPosts();
        if (posts?.success) {
            return posts.data;
        }
        else {
            console.log('error');
        }
        return [];
    }

    async html() {
        const { isLoggedIn } = this.app.auth.data;
        // const posts = await this.#listPosts();

        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: 'Posts'
            });
            components.push(await title.render());
            
            if (isLoggedIn) {
                const createBtn = new Button(this.app, {
                    text: 'Create',
                    onClick: async () => {
                        await this.app.router.navigateTo(`/posts/new`);
                    },
                    type: 'button'
                });
                components.push(await createBtn.render());
            }

            const postsList = new PostsContainer(this.app, {
                fetchPosts: () => this.#listPosts()
            });
            components.push(await postsList.render());
        });
    }

}

export default PostsPage;