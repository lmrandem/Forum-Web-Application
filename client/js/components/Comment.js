import AbstractComponent from '../utils/AbstractComponent';
import Button from './Button';

class Comment extends AbstractComponent {

    #reply;
    #writeReply;

    constructor(app, { id, comment, username, post, createdAt, updatedAt, replies, onSubmit }) {
        super(app, { id, comment, username, post, createdAt, updatedAt, replies, onSubmit });
        this.#reply = '';
        this.#writeReply = false;
    }

    async #handleReplyView() {
        this.#writeReply = !this.#writeReply;
        await this.render();
    }

    async html() {
        const { isLoggedIn } = this.app.auth.data;

        const commentContainer = document.createElement('article');
        commentContainer.className = 'comment';

        const header = document.createElement('header');
        
        const username = document.createElement('h3');
        username.textContent = this.props.username;

        const createdDate = document.createElement('p');
        createdDate.textContent = this.props.createdAt;

        const updatedDate = document.createElement('p');
        updatedDate.textContent = this.props.updatedAt;

        header.append(username, createdDate, updatedDate);

        const comment = document.createElement('p');
        comment.textContent = this.props.comment;
        
        const replySection = document.createElement('section');

        if (isLoggedIn) {
            if (this.#writeReply) {
                const form = document.createElement('form');
                form.onsubmit = async (e) => {
                    e.preventDefault();
                    await this.props.onSubmit({
                        comment: this.#reply,
                        post: this.props.post,
                        user: this.app.auth.data.user.id,
                        parentId: this.props.id
                    });
                }

                const label = document.createElement('label');
                label.textContent = 'Your reply:';
                label.htmlFor = `reply${this.props.id}`;

                const textarea = document.createElement('textarea');
                textarea.id = `reply${this.props.id}`;
                textarea.oninput = (e) => {
                    this.#reply = e.target.value;
                }

                const cancelBtn = new Button(this.app, {
                    text: 'Cancel',
                    type: 'button',
                    onClick: async () => await this.#handleReplyView()
                })

                const postBtn = new Button(this.app, {
                    text: 'Post',
                    type: 'submit',
                })

                form.append(
                    label, 
                    textarea, 
                    await cancelBtn.render(), 
                    await postBtn.render()
                );

                replySection.append(form);
            }
            else {
                const btn = new Button(this.app, {
                    text: 'Reply',
                    type: 'button',
                    onClick: async () => await this.#handleReplyView()
                })
                replySection.append(await btn.render());
            }
        }

        commentContainer.append(
            header,
            comment,
            replySection
        );

        if (this.props.replies) {
            const childComments = document.createElement('section');

            const replies = await Promise.all(this.props.replies.map(async (reply) => {
                const comment = new Comment(this.app, {
                    ...reply,
                    onSubmit: this.props.onSubmit 
                });
                return await comment.render();
            }));

            childComments.append(...replies);

            commentContainer.append(childComments);
        }
        
        return commentContainer;
    }

}

export default Comment;
