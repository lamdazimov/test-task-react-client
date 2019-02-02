import React, {PureComponent} from "react";
import {Card} from '@qiwi/pijma-core';
import {Paragraph} from '@qiwi/pijma-desktop';
import PropTypes from "prop-types";

export class UsersListItem extends PureComponent {
    static propTypes = {
        user: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            userEmail: PropTypes.string.isRequired,
        }),
    };

    render() {
        return <Card p={4} bb="1px solid #e6e6e6">
            <Paragraph size="m">
                Имя: {this.props.user.userName}<br />
                Почта: {this.props.user.userEmail}
            </Paragraph>
        </Card>;
    }
}
