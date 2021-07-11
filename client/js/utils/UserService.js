import AbstractService from './AbstractService';

class UserService extends AbstractService {

    static async getUser(username) {
        try {
            return await this.http.get(`/users/${username}`);
        }
        catch (err) {
            return err;
        }
    }

    static async getCurrentUser() {
        try {
            return await this.http.get('/me');
        }
        catch (err) {
            return err;
        }
    }

    static async register(data) {
        try {
            return await this.http.post(`/register`, data);
        }
        catch (err) {
            return err;
        }
    }

    static async login(data) {
        try {
            return await this.http.post('/login', data);
        }
        catch (err) {
            return err;
        }
    }

    static async logout() {
        try {
            return await this.http.post(`/logout`);
        }
        catch (err) {
            return err;
        }
    }

}

export default UserService;
