import React, { Component } from 'react';
import { connect } from 'react-redux';
import StandardPage from "../../common/components/StandardPage";
import {
    Button,
    Checkbox,
    Container,
    Divider,
    Grid,
    Message,
    Segment,
    Dropdown
} from 'semantic-ui-react';
import AspectManager from "../components/AspectManager";
import UnitMakerCore from "../components/UnitMakerCore";
import FeatureManager from "../components/FeatureManager";
import UnitmakerButtonGroup from "../components/UnitmakerButtonGroup";
import * as domtoimage from "dom-to-image";
import { saveAs } from 'file-saver';
import ColorPicker from "../../common/components/ColorPicker";
import { AUTH, UNITMAKER } from "../../../reducer";
import { UNITMAKER_ACTIVE } from "../store/unitmakerReducer";
import { AUTH_USER } from "../../auth/store/authReducer";
import BasicUnitCard from "../../cards/basic/BasicUnitCard";
import '../../cards/saf/SafUnitCard.css';
import SafUnitCard from '../../cards/saf/SafUnitCard';


class UnitMaker extends Component {
    state = {
        unitCardImage: false,
        backgroundColor: 'white',
        borderColor: 'teal',
        cardType: 'basic',
        closedMessage: window.localStorage.getItem('closedMessage') || !!this.props.user
    };

    generateImage = () => {
        domtoimage
            .toPng(document.getElementById('UnitCard'))
            .then(dataUrl => {
                this.setState({ unitCardImage: dataUrl })
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
        const { labelGroups, updateFeatureGroupLabelSetting } = this.props;
        const { unitCardImage, backgroundColor, borderColor, cardType, closedMessage } = this.state;

        return (
            <StandardPage
                title={'Unit Maker'}
                subtitle={'Make all those awesome units, yo!'}
                icon={'pencil'}
                canonical={'https://warfare.pikaoku.com/'}
                description={"A unit creator based on Matt Colville's Strongholds & Followers supplament for Dungeons & Dragons 5th Edition"}
                metaTitle={'Unit Maker'}
            >
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <UnitmakerButtonGroup />
                        </Grid.Column>
                        <Grid.Column textAlign={'right'} verticalAlign={'middle'}>
                            <a style={{ color: 'teal' }}
                                href={'https://www.kickstarter.com/projects/255133215/strongholds-and-streaming'}>
                                Made using <em>Strongholds & Followers</em> by <b>Matt Colville</b>
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <UnitMakerCore />
                            {
                                !closedMessage &&
                                <Message
                                    size={'large'}
                                    color={'teal'}
                                    content={
                                        <div>
                                            <p>
                                                You can create custom ancestries, experiences, equipments, types,
                                                traits, actions etc on your user page if you login. Once saved, your
                                                stuff will popup in the below dropdowns.
                                            </p>
                                            <p>
                                                Settings such as Base Defense and Base Toughness can also be set on your
                                                user page.
                                                If you load a unit made by someone with different settings the unit will
                                                still use your settings.
                                            </p>
                                            <p>
                                                You can also find stuff other people created in the Shared tab, hit
                                                the heart to save it to your account and use those in the unit
                                                maker!
                                            </p>
                                        </div>}
                                    onDismiss={() => {
                                        this.setState({ 'closedMessage': true });
                                        window.localStorage.setItem('closedMessage', true);
                                    }}
                                />
                            }
                            <AspectManager />
                            <FeatureManager />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment>
                                <ColorPicker
                                    color={borderColor}
                                    label={'Border Color'}
                                    onChange={(color) => this.setState({ borderColor: color })}
                                />
                                <ColorPicker
                                    color={backgroundColor}
                                    label={'Background Color'}
                                    onChange={(color) => this.setState({ backgroundColor: color })}
                                    colors={['white', 'whitesmoke', 'beige', 'indianred', 'black',]}
                                />
                                <Divider />
                                <Checkbox
                                    toggle
                                    label={'Label Feature Groups'}
                                    checked={labelGroups}
                                    onChange={updateFeatureGroupLabelSetting}
                                />
                                <Divider />
                                <div>Card Type:</div>
                                <Dropdown
                                    onChange={(a, { value }) => this.setState({ cardType: value })}
                                    selection
                                    defaultValue='basic'
                                    options={
                                        [
                                            { key: 'basic', value: 'basic', text: 'Basic' },
                                            { key: 'saf', value: 'saf', text: 'S&F (Beta)' }
                                        ]
                                    }
                                />
                            </Segment>
                            <Container textAlign={'center'}>
                                <div className={'grid-center'}>
                                    {
                                        this.state.cardType === 'saf' &&
                                        <SafUnitCard borderColor={borderColor} backgroundColor={backgroundColor} />
                                    }
                                    {
                                        this.state.cardType === 'basic' &&
                                        <BasicUnitCard borderColor={borderColor} backgroundColor={backgroundColor} />
                                    }
                                </div>
                                <Divider hidden />
                                <Button.Group size={'large'} color={'teal'}>
                                    <Button icon={'cog'} content={'Generate'}
                                        onClick={this.generateImage} />
                                    <Button icon={'download'} content={'Download'}
                                        onClick={this.downloadImage} />
                                </Button.Group>
                                <Divider hidden />
                                {
                                    unitCardImage &&
                                    <img id={'UnitCardImage'} src={this.state.unitCardImage} alt={'broke'} />
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
    labelGroups: state.auth.settings.labelFeatureGroups
});

const mapDispatchToProps = dispatch => ({
    updateFeatureGroupLabelSetting: () => dispatch({
        type: 'TOGGLE_LABEL_FEATURE_GROUPS'
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitMaker);
