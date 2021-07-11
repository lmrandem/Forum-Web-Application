import AbstractComponent from './AbstractComponent';
import Authentication from './Authentication';
import Renderer from './Renderer';
import Router from './router/Router';

class App {

    // #rootNode;

    #auth;
    #renderer;
    #router;
    #component;
    #rootNode;

    constructor(rootNode) {
        this.#auth = new Authentication();
        this.#router = new Router(this);
        this.#renderer = new Renderer(rootNode);
        this.#rootNode = rootNode;
    }

    async render() {
        await this.#auth.authenticate();
        await this.#renderer.render(this.#component);
    } 

    async start(component) {
        if (!(component instanceof AbstractComponent)) {
            return;
        }
        
        this.#component = component;
        
        window.addEventListener('popstate', async () => {
            await this.render();
        });
        
        document.addEventListener('DOMContentLoaded', async () => {
            document.body.addEventListener('click', async (e) => {
                if (e.target.matches('[data-link]')) {
                    e.preventDefault();
                    this.#router.navigateTo(e.target.href);
                }
            });
            await this.render();
        });
    }

    get auth() {
        return this.#auth;
    }

    get router() {
        return this.#router;
    }

    get rootNode() {
        return this.#rootNode;
    }

}

export default App;
