import AbstractService from './AbstractService';
import QueryCreator from './QueryCreator';

class PostService extends AbstractService {

    static async getPost(id) {
        try {
            return await this.http.get(`/posts/${id}`);
        }
        catch (err) {
            return err;
        }
    }

    static async listPosts(query) {
        let queryString = '';
        if (query) {
            queryString = QueryCreator.create(query);
        }
        try {
            return await this.http.get(`/posts/${queryString}`);
        }
        catch (err) {
            return err;
        }
    }

    static async listSubscribedPosts() {
        try {
            return await this.http.get('/posts/subscribed');
        }
        catch (err) {
            return err;
        }
    }

    static async createPost(data) {
        try {
            return await this.http.post('/posts', data);
        }
        catch (err) {
            return err;
        }
    }

    static async updatePost(id, data) {
        try {
            return await this.http.put(`/posts/${id}`, data);
        }
        catch (err) {
            return err;
        }
    }

    static async deletePost(id) {
        try {
            return await this.http.delete(`/posts/${id}`);
        }
        catch (err) {
            return err;
        }
    }

}

export default PostService;
