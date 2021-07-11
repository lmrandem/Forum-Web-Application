import AbstractComponent from "../utils/AbstractComponent";
import Link from "./Link";

class BoardElement extends AbstractComponent {

    constructor(app, { name, title }) {
        super(app, { name, title });
    }

    async html() {
        const boardElement = document.createElement('article');

        const boardHeader = document.createElement('header');
        const boardHeaderText = document.createElement('h2');

        const title = new Link(this.app, {
            text: `${this.props.name}: ${this.props.title}`,
            href: `/boards/${this.props.name}`
        });
        boardHeaderText.append(await title.render());

        boardHeader.append(boardHeaderText);

        boardElement.append(boardHeader);

        return boardElement;
    }

}

export default BoardElement;
