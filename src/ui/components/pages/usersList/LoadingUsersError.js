import {Button} from "@qiwi/pijma-desktop";
import React, {PureComponent} from "react";
import {styled} from "@qiwi/pijma-core";
import PropTypes from 'prop-types';

const ViewContainer = styled('div')`
    text-align: center;
`;

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
        return <ViewContainer>
            <div>{this.props.message}</div>
            <Button type='submit'
                    kind='brand'
                    size='minor'
                    text='Попробовать ещё'
                    onClick={this.props.onTryReload}
            />
        </ViewContainer>;
    }
}

export default LoadingUsersError;
