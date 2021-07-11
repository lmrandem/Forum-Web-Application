import AbstractComponent from "../utils/AbstractComponent";
import PostService from "../utils/postService";
import PostElement from "./PostElement";

class PostsContainer extends AbstractComponent {

    constructor(app, { fetchPosts }) {
        super(app, { fetchPosts });
    }

    async #deletePost(id) {
        const del = await PostService.deletePost(id);
        if (del?.success) {
            this.render();
        }
    }

    async html() {
        const posts = await this.props.fetchPosts();

        const list = document.createElement('section');
        const postElements = await Promise.all(posts.map(async (post) => {
            const listElement = new PostElement(this.app, {
                id: post.id,
                title: post.title,
                slug: post.slug,
                date: post.updatedAt,
                username: post.username,
                onClick: async () => {
                    await this.#deletePost(post.id);
                }
            });
            return await listElement.render();
        }));
        list.append(...postElements);
        return list;
    }

}

export default PostsContainer;
