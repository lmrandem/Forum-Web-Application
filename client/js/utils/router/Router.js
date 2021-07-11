import AuthRoute from './AuthRoute';
import Route from './Route';

class Router {

    #app;
    #routes;
    #fallbackPage;

    constructor(app) {
        this.#app = app;
        this.#routes = [];
        this.#fallbackPage = null;

        /*
        window.addEventListener('popstate', async () => {
            app.render();
        });
        
        document.addEventListener('DOMContentLoaded', async () => {
            document.body.addEventListener('click', async (e) => {
                if (e.target.matches('[data-link]')) {
                    e.preventDefault();
                    await this.navigateTo(e.target.href);
                }
            });
            app.render();
        });
        */
    }

    #pathToRegex(path) { 
        return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '([^\/]+)') + '(\/|)$');
    }

    #getParams(match) {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

        return Object.fromEntries(keys.map((key, i) => ([key, values[i]])));
    }

    async findMatch() {
        const potentialMatches = this.#routes.map((route) => ({
            route,
            result: location.pathname.match(this.#pathToRegex(route.path))
        }));

        const match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

        if (!match) {
            if (this.#fallbackPage) {
                return new this.#fallbackPage();
            }
            return null;
        }
        const page = match.route.page;
        return new page(this.#app, this.#getParams(match));
    }

    async navigateTo(url, rerender = true) {
        history.pushState(null, null, url);
        if (rerender) {
            this.#app.render();
        }
    }

    #addRoute(route) {
        this.#routes.push(route);
        return route;
    }

    route(path) {
        const route = new Route(path);
        return this.#addRoute(route);
    }

    authRoute(path) {
        const authRoute = new AuthRoute(path, this.#app.auth);
        return this.#addRoute(authRoute);
    }

    fallback(page) {
        this.#fallbackPage = page;
    }
}

export default Router;
