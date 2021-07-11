import PostsContainer from "../components/PostsContainer";
import Text from "../components/Text";
import AbstractPage from "../utils/AbstractPage";
import PostService from "../utils/postService";
import UserService from "../utils/userService";
import NoMatch from "./NoMatch";

class UserPage extends AbstractPage {

    constructor(app, params) {
        super(app, params);
    }

    async #getUser() {
        const user = await UserService.getUser(this.params.username);
        if (user?.success) {
            return user.data;
        }
        else {
            return null;
        }
    }

    async #listPosts() {
        const posts = await PostService.listPosts({ 
            username: this.params.username 
        });
        if (posts?.success) {
            return posts.data;
        }
        else {
            return null;
        }
    }

    async html() {
        const visitedUser = await this.#getUser();
        if (!visitedUser) {
            const noMatch = new NoMatch(this.app);
            return await noMatch.render();
        }

        this.setTitle(`User: ${visitedUser.username}`);

        const container = document.createElement('div');

        const text = new Text(this.app, {
            text: `${visitedUser.name} - ${visitedUser.email}`
        });

        const postsList = new PostsContainer(this.app, {
            fetchPosts: () => this.#listPosts()
        })

        container.append(
            await text.render(),
            await postsList.render()
        )

        return container;
    }

}

export default UserPage;
