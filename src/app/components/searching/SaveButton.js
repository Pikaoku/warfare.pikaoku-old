import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Icon} from "semantic-ui-react";
import {saveAspectToUser, unsaveAspectFromUser} from "../../../store/actions/firestore";
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

        if (saved) {
            return (
                <Button
                    attached={'bottom'}
                    onClick={this.unsave}
                    basic>
                    <Icon
                        fitted
                        size={'large'}
                        name={'heart'}
                        color={'pink'}
                    />
                </Button>
            );
        } else {
            return (
                <Button
                    attached={'bottom'}
                    onClick={this.save}
                    basic>
                    <Icon
                        fitted
                        size={'large'}
                        name={'heart outline'}
                        color={'pink'}
                    />
                </Button>
            )
        }
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
