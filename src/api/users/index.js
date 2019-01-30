import {ProtectedHttpClient} from "../protectedHttpClient";
import {HttpResponseError} from "@qiwi/let-fly-at-http/build";
import {AuthError} from "../../error/authError";
import {BaseError} from "../../error/baseError";

export class UsersApiService {
    constructor() {
        this.client = new ProtectedHttpClient();
    }

    async getUsersList() {
        try {
            return await this.client.get('users/items');
        } catch (err) {
            if (err instanceof HttpResponseError) {
                if (err.response.status === 401) {
                    throw new AuthError(AuthError.UNAUTHORIZED)
                }

                throw BaseError(BaseError.API_ERROR, await err.response.json());
            }

            throw err;
        }
    }
}
