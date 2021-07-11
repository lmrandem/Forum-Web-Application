import AbstractComponent from "../utils/AbstractComponent";

class Link extends AbstractComponent {

    constructor(app, { text, href, className = null, activeClassName = null }) {
        super(app, { text, href, className, activeClassName });
    }

    #isActive() {
        return location.pathname === this.props.href;
    }

    async html() {
        const link = document.createElement('a');
        link.textContent = this.props.text;
        link.href = this.props.href;
        link.dataset.link = true;
        if (this.props.className) {
            link.className = this.props.className;
        }
        if (this.props.activeClassName && this.#isActive()) {
            link.className = this.props.activeClassName;
        }
        return link;
    }

}

export default Link;
