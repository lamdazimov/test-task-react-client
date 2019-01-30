import React from 'react';
import {AuthLayout} from "../../common/AuthLayout/";
import {Loader} from "../../common/Loader";
import {styled} from '@qiwi/pijma-core';
import LoadingUsersError from "./LoadingUsersError";
import {FixedSizeList} from 'react-window';
import {UsersListItem} from "./UsersListItem";

const LoadingUsersHeadline = styled('div')`
    font-size: 20px;
    text-align: center;
`;

const LoadingUsers = () =>
    <>
        <LoadingUsersHeadline>Загружается список пользователей</LoadingUsersHeadline>
        <Loader/>
    </>;

export default class UsersListPage extends React.Component {
    componentDidMount() {
        this.loadUsers();
    }

    loadUsers() {
        this.props.dispatch.usersList.loadUsersList();
    }

    render() {
        const UsersListRow = ({index, style}) => <div style={style}>
            <UsersListItem user={this.props.users[index]}/>
        </div>;

        return (
            <AuthLayout>
                {this.props.loadingUsers && <LoadingUsers/>}
                {this.props.loadingUsersError && <LoadingUsersError
                    message={this.props.errorMessage}
                    onTryReload={this.loadUsers.bind(this)}
                />}
                {this.props.usersLoaded && <FixedSizeList
                    height={600}
                    itemCount={this.props.users.length}
                    itemSize={50}
                >
                    {UsersListRow}
                </FixedSizeList>
                }
            </AuthLayout>
        );
    }
}
