import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Header, Segment, TransitionablePortal} from "semantic-ui-react";
import {umAddFeature} from "../../../../store/actions/unitmaker";
import {emptyFeature} from "../../../../utils/unitMakerUtils";

class AddCustomFeaturePopup extends PureComponent {
    componentWillMount() {
        this.reset();
    }

    handleClose = () => this.setState({open: false});
    handleOpen = () => this.setState({open: true});

    reset = () =>
        this.setState({
            customFeature: emptyFeature('trait'),
            open: false
        });

    handleCustomFeatureChange = (field) => ({target}) =>
        this.setState({customFeature: {...this.state.customFeature, [field]: target.value}});

    handleCustomFeatureType = (x, {value}) =>
        this.setState({customFeature: {...this.state.customFeature, 'type': value}});

    handleCustomFeatureConfirm = () => {
        const {customFeature} = this.state;
        this.props.umAddFeature({...customFeature, cost: parseInt(customFeature.cost)});
        this.setState({customFeature: emptyFeature('trait'), open: false})
    };

    render() {
        const selectOptions = [
            {key: 'trait', value: 'trait', text: 'Trait'},
            {key: 'action', value: 'action', text: 'Action'},
            {key: 'attachment', value: 'attachment', text: 'Attachment'},
        ];

        return (
            <TransitionablePortal
                open={this.state.open}
                onOpen={() => this.setState({customFeature: emptyFeature('trait')})}
                transition={{animation: 'fly left', duration: 300}}
                closeOnTriggerClick openOnTriggerClick
                trigger={<Button positive content={'Add Custom'} onClick={this.handleOpen}/>}
            >
                <Segment textAlign={'center'} className={'popup-position'} raised
                         style={{maxWidth: '250px'}}>
                    <Header content={'Custom Feature'} size={'large'}/>
                    <Form>
                        <Form.Input
                            required
                            onChange={this.handleCustomFeatureChange('name')}
                            placeholder={'Name'}/>
                        <Form.Field
                            onChange={this.handleCustomFeatureChange('effect')}
                            control={'textarea'}
                            rows={2}
                            required
                            placeholder={'Effect'}/>
                        <Form.Input
                            onChange={this.handleCustomFeatureChange('cost')}
                            fluid placeholder={'Cost'}
                            required
                            onKeyDown={e => e.keyCode === 69 && e.preventDefault()}
                            type={'number'} step={1}/>
                        <Form.Dropdown
                            selection
                            placeholder={'Feature Type'}
                            defaultValue={'trait'}
                            options={selectOptions}
                            onChange={this.handleCustomFeatureType}
                        />
                        <Form.Button
                            onSubmit={this.handleCustomFeatureConfirm}
                            fluid
                            positive
                            content={'Add'}
                            onClick={this.handleCustomFeatureConfirm}
                        />
                    </Form>
                </Segment>
            </TransitionablePortal>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
    {umAddFeature}
)(AddCustomFeaturePopup);
