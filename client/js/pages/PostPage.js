import Button from '../components/Button';
import Comment from '../components/Comment';
import Text from '../components/Text';
import Title from '../components/Title';
import AbstractPage from '../utils/AbstractPage';
import CommentService from '../utils/CommentService';
import PostService from '../utils/postService';
import NoMatch from './NoMatch';

class PostPage extends AbstractPage {

    #comment;

    constructor(app, params) {
        super(app, params);
        this.#comment = '';
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

    async #listComments() {
        const { id } = this.params;
        const comments = await CommentService.listComments({ post: id });
        if (comments?.success) {
            return comments.data;
        }
        return [];
    }

    async #submitReply(data) {
        const reply = await CommentService.createComment(data);
        if (reply?.success) {
            this.render();
        }
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

        const comments = await this.#listComments();

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

            const commentForm = document.createElement('form');
            commentForm.onsubmit = async (e) => {
                e.preventDefault();
                await this.#submitReply({
                    comment: this.#comment,
                    post: post.id,
                    user: this.app.auth.data.user.id
                });
            }

            const label = document.createElement('label');
            label.textContent = 'Your comment:';
            label.htmlFor = 'comment';

            const textarea = document.createElement('textarea');
            textarea.id = 'comment';
            textarea.oninput = (e) => {
                this.#comment = e.target.value;
            }

            const postBtn = new Button(this.app, {
                text: 'Post',
                type: 'submit'
            });

            commentForm.append(
                label,
                textarea,
                await postBtn.render()
            );

            components.push(commentForm);

            const commentSection = document.createElement('section');

            const postComments = await Promise.all(comments.map(async (comment) => {
                const c = new Comment(this.app, {
                    ...comment,
                    onSubmit: async (data) => await this.#submitReply(data)
                });
                return await c.render();
            }));
            commentSection.append(...postComments);

            components.push(commentSection);
        });
    }

}

export default PostPage;