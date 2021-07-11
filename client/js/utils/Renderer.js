class Renderer {

    #rootNode;

    constructor(rootNode) {
        this.#rootNode = rootNode;
    }

    async render(content) {
        this.#rootNode.replaceChildren(await content.render());
    }

}

export default Renderer;
