import {BaseError} from "./baseError";

export class AuthError extends BaseError {
    static BAD_CREDENTIALS = 'BAD_CREDENTIALS';
    static UNAUTHORIZED = 'UNAUTHORIZED';

    constructor(code, details) {
        super(code, details);
        Object.setPrototypeOf(this, AuthError.prototype);
    }

}
