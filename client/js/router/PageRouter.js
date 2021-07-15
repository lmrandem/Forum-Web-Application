import Forbidden from "../pages/Forbidden";
import LoginPage from "../pages/LoginPage";
import NoMatch from "../pages/NoMatch";
import PostPage from "../pages/PostPage";
import PostsPage from "../pages/PostsPage";
import RegisterPage from "../pages/RegisterPage";
import AbstractComponent from "../utils/AbstractComponent";
import CreatePostPage from "../pages/CreatePostPage";
import EditPostPage from "../pages/EditPostPage";
import UserPage from "../pages/UserPage";
import BoardsPage from "../pages/BoardsPage";
import BoardPage from "../pages/BoardPage";

class PageRouter extends AbstractComponent {

    constructor(app) {
        super(app, null);
        const router = app.router;
        // Home
        router.route('/').to(PostsPage);
        // Auth
        router.authRoute('/login').to(Forbidden).fallback(LoginPage);
        router.authRoute('/register').to(Forbidden).fallback(RegisterPage);
        // Posts
        router.authRoute('/posts/new').to(CreatePostPage).fallback(Forbidden);
        router.authRoute('/posts/:id/:slug/edit').to(EditPostPage).fallback(Forbidden);
        router.route('/posts/:id').to(PostPage);
        router.route('/posts/:id/:slug').to(PostPage);
        // Boards
        router.route('/boards').to(BoardsPage);
        router.route('/boards/:name').to(BoardPage);
        // User
        router.route('/users/:username').to(UserPage);
        // Fallback page
        router.fallback(NoMatch);
    }

    async html() {
        let match = await this.app.router.findMatch();
        return match.render();
    }

}

export default PageRouter;
