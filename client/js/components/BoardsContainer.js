import AbstractComponent from "../utils/AbstractComponent";
import BoardElement from "./BoardElement";

class BoardsContainer extends AbstractComponent {

    constructor(app, { boards }) {
        super(app, { boards });
    }

    async html() {
        const list = document.createElement('section');
        const boardElements = await Promise.all(
            this.props.boards.map(async (board) => {
                const listElement = new BoardElement(this.app, {
                    name: board.name,
                    title: board.title
                });
                return await listElement.render();
            })
        );
        list.append(...boardElements);
        return list;
    }

}

export default BoardsContainer;
