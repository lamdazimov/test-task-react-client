import React, {PureComponent} from "react";
import {styled} from '@qiwi/pijma-core';
import PropTypes from "prop-types";

const ViewContainer = styled('div')`
    text-align: center;
`;

export class UsersListItem extends PureComponent {
    static propTypes = {
        user: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            userEmail: PropTypes.string.isRequired,
        }),
    };

    render() {
        return <ViewContainer>
            Имя: {this.props.user.userName} <br/>
            Почта: {this.props.user.userEmail}
        </ViewContainer>;
    }
}
