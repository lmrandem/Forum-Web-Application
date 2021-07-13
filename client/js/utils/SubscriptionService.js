import AbstractService from './AbstractService';

class SubscriptionService extends AbstractService {

    static async getSubscription(board) {
        try {
            return await this.http.get(`/subscriptions/${board}`)
        }
        catch (err) {
            return err;
        }
    }

    static async subscribe(board) {
        try {
            return await this.http.put(`/subscriptions/${board}`);
        }
        catch (err) {
            return err;
        }
    }

    static async unsubscribe(board) {
        try {
            return await this.http.delete(`/subscriptions/${board}`);
        }
        catch (err) {
            return err;
        }
    }

}

export default SubscriptionService;
