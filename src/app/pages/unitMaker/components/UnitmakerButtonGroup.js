import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Popup} from "semantic-ui-react";

class UnitmakerButtonGroup extends Component {
    render() {
        return (
            <Button.Group icon size={'large'}>
                <Popup
                    trigger={
                        {/*<Button icon={'file'} color={'yellow'}/>*/}
                        <Dropdown />
                    }
                    content={'Load existing unit'}
                    on={'hover'}
                />
                <Popup
                    trigger={<Button icon={'save'} positive/>}
                    content={'Save unit'}
                    on={'hover'}
                />
                <Popup
                    trigger={<Button icon={'save outline'} positive/>}
                    content={'Save as a new unit'}
                    on={'hover'}
                />
                <Popup
                    trigger={<Button icon={'repeat'} color={'orange'}/>}
                    content={'Reset all changes'}
                    on={'hover'}
                />
            </Button.Group>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(UnitmakerButtonGroup);
