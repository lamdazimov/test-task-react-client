import UsersListPage from './usersList';
import {connect} from 'react-redux';
import {select} from "../../../model";

export default connect((state) => ({
    router: state.router,
    usersLoaded: select.usersList.usersLoaded(state),
    loadingUsers: select.usersList.loadingUsers(state),
    loadingUsersError: select.usersList.loadingUsersError(state),
    errorMessage: select.usersList.errorMessage(state),
    users: state.usersList.data.items,
}))(UsersListPage);
