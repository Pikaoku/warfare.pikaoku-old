import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import {Button, Checkbox, Container, Divider, Grid, Popup, Segment} from "semantic-ui-react";
import BasicUnitCard from "../../components/unitCards/BasicUnitCard";
import './UnitMaker.css';
import AspectManager from "./components/AspectManager";
import UnitMakerCore from "./components/UnitMakerCore";
import FeatureManager from "./components/FeatureManager";
import UnitmakerButtonGroup from "./components/UnitmakerButtonGroup";
import * as domtoimage from "dom-to-image";
import {saveAs} from 'file-saver';
import ColorPicker from "../../components/ColorPicker";
import {AUTH, SETTINGS, UNITMAKER} from "../../../store/reducer";
import {UNITMAKER_ACTIVE} from "../../../store/unitmaker/unitmakerReducer";
import {AUTH_USER} from "../../../store/auth/authReducer";
import {Link} from "react-router-dom";
import {SETTINGS_LABEL_FEATURE_GROUPS, TOGGLE_LABEL_FEATURE_GROUPS} from "../../../store/settings/settingsReducer";


class UnitMaker extends Component {
    state = {
        unitCardImage: false,
        backgroundColor: 'white',
        borderColor: 'black',
        cardType: 'saf'
    };

    generateImage = () => {
        domtoimage
            .toPng(document.getElementById('UnitCard'))
            .then(dataUrl => {
                this.setState({unitCardImage: dataUrl})
            });
    };

    downloadImage = () => {
        domtoimage
            .toBlob(document.getElementById('UnitCard'))
            .then(blob => {
                saveAs(blob, (this.props.unit.name.replace(/[^a-z0-9.-]/gi, '') || 'unit') + '.png')
            });

    };

    render() {
        const {labelGroups, updateFeatureGroupLabelSetting} = this.props;
        const {unitCardImage, backgroundColor, borderColor, cardType} = this.state;

        return (
            <StandardPage title={'Unit Maker'} subtitle={'Make all those awesome units, yo!'} icon={'pencil'}>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <UnitmakerButtonGroup/>
                        </Grid.Column>
                        <Grid.Column textAlign={'right'} verticalAlign={'middle'}>
                            <Link to={'https://www.kickstarter.com/projects/255133215/strongholds-and-streaming'}>
                                Made using <em>Strongholds & Followers</em> by <b>Matt Colville</b>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <UnitMakerCore/>
                            <AspectManager/>
                            <FeatureManager/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment>
                                <ColorPicker
                                    label={'Border Color'}
                                    onChange={(color) => this.setState({borderColor: color})}
                                />
                                <Divider/>
                                <Checkbox
                                    toggle
                                    label={'Label Feature Groups'}
                                    checked={labelGroups}
                                    onChange={updateFeatureGroupLabelSetting}
                                />
                            </Segment>
                            <Container textAlign={'center'}>
                                <div className={'grid-center'}>
                                    <BasicUnitCard borderColor={borderColor}/>
                                </div>
                                <Divider hidden/>
                                <Button.Group size={'large'} color={'teal'}>
                                    <Button icon={'cog'} content={'Generate'}
                                            onClick={this.generateImage}/>
                                    <Button icon={'download'} content={'Download'}
                                            onClick={this.downloadImage}/>
                                </Button.Group>
                                <Divider hidden/>
                                {
                                    unitCardImage &&
                                    <img id={'UnitCardImage'} src={this.state.unitCardImage} alt={'broke'}/>
                                }
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </StandardPage>
        );
    }
}

const mapStateToProps = (state) => ({
    unit: state[UNITMAKER][UNITMAKER_ACTIVE],
    user: state[AUTH][AUTH_USER],
    labelGroups: state[SETTINGS][SETTINGS_LABEL_FEATURE_GROUPS]
});

const mapDispatchToProps = dispatch => ({
    updateFeatureGroupLabelSetting: () => dispatch({
        type: TOGGLE_LABEL_FEATURE_GROUPS
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitMaker);
