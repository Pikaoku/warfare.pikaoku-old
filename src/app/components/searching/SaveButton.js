import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon} from "semantic-ui-react";
import PropTypes from "prop-types";

class SaveButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: this.props.saved || false
        };
    }

    save = () => {
        this.setState({saved: true});
        this.props.saveFunc(this.props.objectId, this.props.user.uid);
    };

    unsave = () => {
        this.setState({saved: false});
        this.props.unsaveFunc(this.props.objectId, this.props.user.uid);
    };

    render() {
        const {saved} = this.state;

        const sharedProps = {
            fitted: true,
            size: 'large',
            color: 'pink'
        };

        return (
            <div className={'grid-center'}>
                <Icon
                    onClick={saved ? this.unsave : this.save}
                    name={saved ? 'heart' : 'heart outline'}
                    {...sharedProps}
                />
            </div>
        )
    }
}

SaveButton.propTypes = {
    objectId: PropTypes.string.isRequired,
    saved: PropTypes.bool,
    saveFunc: PropTypes.func.isRequired,
    unsaveFunc: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(
    mapStateToProps,
    null
)(SaveButton);
