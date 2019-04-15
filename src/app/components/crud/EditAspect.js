import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react";

class EditAspect extends Component {
    state = {
        aspect: this.props.aspect
    };

    save = () => {

    };

    render() {
        const {trigger, aspect, title} = this.props;

        return (
            <Modal
                trigger={trigger || <Button>Basic Modal</Button>}
                size={'mini'}
            >
                <Header icon={'edit outline'} content={title || 'Editing' + aspect.name}/>
                <Modal.Content>
                    <Form>
                        <Form.Input label={'Label'}/>
                        <Form.Input label={'Description'}/>
                        <Form.Group>
                            <Form.Input label={'Attack'}/>
                            <Form.Input label={'Defense'}/>
                            <Form.Input label={'Description'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label={'Description'}/>
                            <Form.Input label={'Description'}/>
                        </Form.Group>
                        <Form.Input label={'Name'}/>
                        <Form.Input label={'Label'}/>
                        <Form.Input label={'Label'}/>
                        <Form.Input label={'Label'}/>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red'>
                        <Icon name='remove'/> No
                    </Button>
                    <Button color='green' inverted>
                        <Icon name='checkmark'/> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(EditAspect);
