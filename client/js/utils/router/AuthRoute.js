import Route from "./Route";

class AuthRoute extends Route {

    #auth;
    #fallbackPage;

    constructor(path, auth) {
        super(path);
        this.#auth = auth;
        this.#fallbackPage = null;
    }

    fallback(page) {
        this.#fallbackPage = page;
    }

    get page() {
        const page = super.page;
        const { isLoggedIn } = this.#auth.data;
        if (isLoggedIn && page) {
            return page;
        }
        else {
            return this.#fallbackPage;
        }
    }

}

export default AuthRoute;
