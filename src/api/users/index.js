import {ProtectedHttpClient} from "../protectedHttpClient";
import {BaseError} from "../../error/baseError";

export class UsersApiService {
    constructor() {
        this.client = new ProtectedHttpClient();
    }

    async getUsersList() {
        try {
            return await this.client.get('users/items');
        } catch (err) {
            let errorBody;
            if (err && err.response && err.response.json) {
                errorBody = await err.response.json();
            }

            throw new BaseError(BaseError.API_ERROR, errorBody);
        }
    }
}
