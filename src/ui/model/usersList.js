import Machine from '@qiwi/cyclone';
import {UsersApiService} from "../../api/users";

const INITIAL = 'init';
const LOADING_USERS = 'loading_users';
const OK = 'ok';
const LOADING_USERS_ERROR = 'loading_users_error';

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
                this.next(LOADING_USERS_ERROR, {error: {...err, userMessage: 'Что-то пошло не так'}});
            }
        },
    },
    selectors: (slice) => ({
        usersLoaded() {
            return slice(usersList => {
                return usersList.state === OK;
            })
        },
        loadingUsers() {
            return slice(usersList => {
                return usersList.state === LOADING_USERS
            });
        },
        loadingUsersError() {
            return slice(usersList => {
                return usersList.state === LOADING_USERS_ERROR;
            })
        },
        errorMessage() {
            return slice(usersList => {
                return (usersList.data && usersList.data.error && usersList.data.error.userMessage) || undefined;
            })
        }
    })
}
