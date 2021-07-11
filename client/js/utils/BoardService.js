import AbstractService from "./AbstractService";
import QueryCreator from "./QueryCreator";

class BoardService extends AbstractService {

    static async listBoards(query = null) {
        let queryString = '';
        if (query) {
            queryString = QueryCreator.create(query);
        }
        try {
            return await this.http.get(`/boards/${queryString}`);
        }
        catch (err) {
            return err;
        }
    }

    static async getBoard(name) {
        try {
            return await this.http.get(`/boards/${name}`);
        }
        catch (err) {
            return err;
        }
    }

    static async createBoard(data) {
        try {
            return await this.http.post('/boards', data);
        }
        catch (err) {
            return err;
        }
    }

    static async subscribeToBoard(data) {
        try {
            return await this.http.post('/boards/subscribe', data);
        }
        catch (err) {
            return err;
        }
    }

    static async unsubscribeFromBoard(data) {
        try {
            return await this.http.post('/boards/unsubscribe', data);
        }
        catch (err) {
            return err;
        }
    }

}

export default BoardService;
