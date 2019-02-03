import {HttpService} from '@qiwi/let-fly-at-http/build';
import config from '../config';
import ls from '../storage/localStorage';
import {dispatch} from '../ui/model/';

export class ProtectedHttpClient extends HttpService {
    constructor() {
        super(config.apiUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }, 5000);
    }

    _request(url, options) {
        options.headers['Authorization'] = `Bearer ${ls.getItem('jwt')}`;

        return super._request(url, options).catch((err) => {
            if (err.response.status === 401) {
                dispatch.auth.logout();
            }

            throw err;
        })
    }
}
