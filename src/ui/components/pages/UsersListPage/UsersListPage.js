import React from 'react';
import {AuthLayout} from "../../common/AuthLayout/";
import {Loader} from "../../common/Loader";
import {Card, LinedBlock} from '@qiwi/pijma-core';
import {Paragraph} from '@qiwi/pijma-desktop';
import LoadingUsersError from "./LoadingUsersError";
import {FixedSizeList} from 'react-window';
import {UsersListItem} from "./UsersListItem";

export default class UsersListPage extends React.Component {
    componentDidMount() {
        this.loadUsers();
    }

    loadUsers() {
        this.props.dispatch.usersList.loadUsersList();
    }

    render() {
        if (this.props.unauthorized) {
            this.props.dispatch.auth.checkAuth();
            return null;
        }

        const UsersListRow = ({index, style}) => <UsersListItem style={style} user={this.props.users[index]}/>;

        return (
            <AuthLayout>
                <LinedBlock>
                    <Card p={7}>
                        <Paragraph size="m">
                            Список пользователей
                        </Paragraph>
                    </Card>
                    {this.props.loadingUsers && <Loader/>}
                    {this.props.loadingUsersError && <LoadingUsersError
                        message={this.props.errorMessage}
                        onTryReload={this.loadUsers.bind(this)}
                    />}
                    {this.props.usersLoaded &&
                    <FixedSizeList
                        height={600}
                        itemCount={this.props.users.length}
                        itemSize={81}
                    >
                        {UsersListRow}
                    </FixedSizeList>}
                </LinedBlock>
            </AuthLayout>
        );
    }
}
