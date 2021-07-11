import Button from '../components/Button';
import Text from '../components/Text';
import Title from '../components/Title';
import AbstractPage from '../utils/AbstractPage';
import PostService from '../utils/postService';
import NoMatch from './NoMatch';

class PostPage extends AbstractPage {

    constructor(app, params) {
        super(app, params);
    }

    async #getPost() {
        const { id } = this.params;
        const post = await PostService.getPost(id);
        if (post?.success) {
            this.setTitle(`${post.data.id} - ${post.data.title}`);
            return post.data;
        }
        return null;
    }

    async html() {
        const { isLoggedIn, user } = this.app.auth.data;
        const post = await this.#getPost();

        if (!post) {
            const noMatch = new NoMatch(this.app);
            return await noMatch.render();
        }

        const fullPath = `/posts/${post.id}/${post.slug}`;

        if (location.pathname !== fullPath) {
            await this.app.router.navigateTo(fullPath, false);
        }

        return await this.wrapper(async (components) => {
            const title = new Title(this.app, {
                text: `${post.id} - ${post.title}`
            });
            components.push(await title.render());
            const date = new Text(this.app, {
                text: `${post.updatedAt}`
            });
            components.push(await date.render());

            if (isLoggedIn && user.username === post.username) {
                const editBtn = new Button(this.app, {
                    text: 'Edit',
                    onClick: async () => {
                        await this.app.router.navigateTo(`/posts/${post.id}/${post.slug}/edit`);
                    },
                    type: 'button'
                });
                components.push(await editBtn.render());
            }

            const content = new Text(this.app, {
                text: post.content
            });
            components.push(await content.render());
        });
    }

}

export default PostPage;