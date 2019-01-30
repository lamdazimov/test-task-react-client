import {ProtectedHttpClient} from "../protectedHttpClient";

export class UsersApiService {
    constructor() {
        this.client = new ProtectedHttpClient();
    }

    async getUsersList() {
        return await this.client.get('users/items');
    }
}
