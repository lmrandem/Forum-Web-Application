import UserService from './userService';

class Authentication {

    #user;
    #isLoggedIn;

    constructor() {
        this.#user = null;
        this.#isLoggedIn = false;
    }

    async authenticate() {
        const user = await UserService.getCurrentUser();
        if (user?.success) {
            this.#user = user.data;
            this.#isLoggedIn = true;
        }
        else {
            this.#user = null;
            this.#isLoggedIn = false;
        }
    }

    get data() {
        return {
            user: this.#user,
            isLoggedIn: this.#isLoggedIn
        }
    }

}

export default Authentication;
