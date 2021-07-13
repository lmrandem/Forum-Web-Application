import AbstractService from './AbstractService';
import QueryCreator from './QueryCreator';

class CommentService extends AbstractService {

    static async listComments(query) {
        let queryString = '';
        if (query) {
            queryString = QueryCreator.create(query);
        }
        try {
            return await this.http.get(`/comments/${queryString}`);
        }
        catch (err) {
            return err;
        }
    }

    static async createComment(data) {
        console.log(data);
        try {
            return await this.http.post(`/comments`, data);
        }
        catch (err) {
            return err;
        }
    }

}

export default CommentService;
