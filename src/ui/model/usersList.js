import Machine from '@qiwi/cyclone';
import {UsersApiService} from "../../api/users";
import {HttpResponseError} from "@qiwi/let-fly-at-http/build";
import ls from '../../storage/localStorage';

const INITIAL = 'init';
const LOADING_USERS = 'loading_users';
const OK = 'ok';
const LOADING_USERS_ERROR = 'loading_users_error';
const UNAUTHORIZED = 'unauthorized';

const machine = new Machine({
    initialState: INITIAL,
    initialData: {
        items: [],
        error: {
            userMessage: '',
        },
    },
    transitions: {
        'init>loading_users': true,
        'loading_users>ok': (state, res) => res,
        'loading_users>loading_users_error': (state, res) => res,
        'loading_users_error>loading_users': true,
        'loading_users>unauthorized': true,
        'unauthorized>loading_users': true,
    },
});

const usersApi = new UsersApiService();

export default {
    state: machine.current(),
    reducers: {
        next(prev, next, ...payload) {
            return machine.next(next, ...payload).current()
        },
    },
    effects: {
        async loadUsersList() {
            this.next(LOADING_USERS);
            try {
                const items = await usersApi.getUsersList();
                this.next(OK, {
                    items,
                });
            } catch (err) {
                if (err instanceof HttpResponseError && err.response.status === 401) {
                    ls.removeItem('jwt');
                    this.next(UNAUTHORIZED);
                    return;
                }
                this.next(LOADING_USERS_ERROR, {error: {userMessage: 'Что-то пошло не так'}});
            }
        },
    },
    selectors: (slice) => ({
        unauthorized() {
            return slice(usersList => usersList.state === UNAUTHORIZED);
        },
        usersLoaded() {
            return slice(usersList => usersList.state === OK);
        },
        loadingUsers() {
            return slice(usersList => usersList.state === LOADING_USERS);
        },
        loadingUsersError() {
            return slice(usersList => usersList.state === LOADING_USERS_ERROR);
        },
        errorMessage() {
            return slice(usersList => {
                return (usersList.data && usersList.data.error && usersList.data.error.userMessage) || undefined;
            })
        }
    })
}
