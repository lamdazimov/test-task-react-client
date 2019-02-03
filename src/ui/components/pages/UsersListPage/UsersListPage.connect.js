import {UsersListPage} from './UsersListPage';
import {connect} from 'react-redux';
import {select} from '../../../model';

export default connect((state) => {
        return {
            router: state.router,
            isUsersLoaded: select.usersList.isUsersLoaded(state),
            isLoadingUsers: select.usersList.isLoadingUsers(state),
            hasLoadingUsersError: select.usersList.hasLoadingUsersError(state),
            errorMessage: select.usersList.getErrorMessage(state),
            users: select.usersList.getUsers(state),
        }
    },
    (dispatch) => ({
        loadUsersList: dispatch.usersList.loadUsersList,
    })
)(UsersListPage);
