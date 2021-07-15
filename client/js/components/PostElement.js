import AbstractComponent from "../utils/AbstractComponent";
import Button from "./Button";
import Link from "./Link";
import Text from "./Text";

class PostElement extends AbstractComponent {

    constructor(app, { id, title, slug, date, username, board, onClick }) {
        super(app, { id, title, slug, date, username, board, onClick });
    }

    async html() {
        const { isLoggedIn, user } = this.app.auth.data;

        const postElement = document.createElement('article');
        postElement.className = 'post';

        const postHeader = document.createElement('header');
        const postHeaderText = document.createElement('h2');

        const title = new Link(this.app, {
            text: this.props.title,
            href: `/b/${this.props.board}/${this.props.id}/${this.props.slug}`,
            className: 'post__title'
        });
        postHeaderText.append(await title.render());

        postHeader.append(postHeaderText);

        const date = new Text(this.app, {
            text: this.props.date
        });

        postElement.append(
            postHeader,
            await date.render()
        );

        const footer = document.createElement('footer');
        footer.className = 'post__footer';

        const createdBy = document.createElement('p');
        createdBy.textContent = 'Created by ';

        const author = new Link(this.app, {
            text: this.props.username,
            href: `/users/${this.props.username}`
        })

        createdBy.append(await author.render());

        footer.append(createdBy);
        
        if (isLoggedIn && user.username === this.props.username) {
            const deleteBtn = new Button(this.app, {
                text: 'Delete',
                onClick: this.props.onClick,
                type: 'text'
            });
            footer.append(await deleteBtn.render());
        }

        postElement.append(footer);

        return postElement;
    }

}

export default PostElement;
