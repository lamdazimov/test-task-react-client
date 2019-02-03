import React from 'react';
import {AuthLayout} from "../../common/AuthLayout/";
import {Loader} from "../../common/Loader";
import {Card, LinedBlock} from '@qiwi/pijma-core';
import {Paragraph} from '@qiwi/pijma-desktop';
import LoadingUsersError from "./LoadingUsersError";
import {FixedSizeList} from 'react-window';
import {UsersListItem} from "./UsersListItem";

export class UsersListPage extends React.Component {
    componentDidMount() {
        this.loadUsers();
    }

    loadUsers() {
        this.props.loadUsersList();
    }

    render() {
        const {isLoadingUsers, hasLoadingUsersError, errorMessage, isUsersLoaded, users} = this.props;

        const UsersListRow = ({index, style}) => <UsersListItem style={style} user={users[index]}/>;

        return (
            <AuthLayout>
                <LinedBlock>
                    <Card p={7}>
                        <Paragraph size="m">
                            Список пользователей
                        </Paragraph>
                    </Card>
                    {isLoadingUsers && <Loader/>}
                    {hasLoadingUsersError && <LoadingUsersError
                        message={errorMessage}
                        onTryReload={this.loadUsers.bind(this)}
                    />}
                    {isUsersLoaded &&
                    <FixedSizeList
                        height={600}
                        itemCount={users.length}
                        itemSize={81}
                    >
                        {UsersListRow}
                    </FixedSizeList>}
                </LinedBlock>
            </AuthLayout>
        );
    }
}
