import {Actions, Button, Paragraph} from "@qiwi/pijma-desktop";
import React, {PureComponent} from "react";
import {Card, Flex, Spacer} from "@qiwi/pijma-core";
import PropTypes from 'prop-types';

class LoadingUsersError extends PureComponent {
    static defaultProps = {
        message: '',
        onTryReload: () => {},
    };

    static propTypes = {
        onTryReload: PropTypes.func,
        message: PropTypes.string,
    };

    render() {
        return <Flex justify="center">
            <Spacer>
                <Card p={7}>
                    <Paragraph>{this.props.message}</Paragraph>
                    <Actions size="minor">
                        <Button type='submit'
                                kind='brand'
                                size='minor'
                                text='Попробовать ещё'
                                onClick={this.props.onTryReload}
                        />
                    </Actions>
                </Card>
            </Spacer>
        </Flex>;
    }
}

export default LoadingUsersError;
