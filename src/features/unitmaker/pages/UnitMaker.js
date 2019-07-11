import '../../cards/saf/SafUnitCard.css'

import { toSvg } from 'dom-to-image'
import { saveAs } from 'file-saver'
import { toBlob } from 'html-to-image'
import React, { Component, createContext } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Container, Divider, Dropdown, Grid, Message, Segment } from 'semantic-ui-react'

import { firestore } from '../../../firebase'
import { AUTH, UNITMAKER } from '../../../reducer'
import { AUTH_USER } from '../../auth/store/authReducer'
import BasicUnitCard from '../../cards/basic/BasicUnitCard'
import SafUnitCard from '../../cards/saf/SafUnitCard'
import ColorPicker from '../../common/components/ColorPicker'
import StandardPage from '../../common/components/StandardPage'
import AspectManager from '../components/AspectManager'
import FeatureManager from '../components/FeatureManager'
import UnitmakerButtonGroup from '../components/UnitmakerButtonGroup'
import UnitMakerCore from '../components/UnitMakerCore'
import UnitEntity from '../entities/UnitEntity'
import { UNITMAKER_ACTIVE } from '../store/unitmakerReducer'

export const UnitmakerContext = createContext(new UnitEntity())

class UnitMaker extends Component {
    col = 'sites/warfare/units'

    constructor(props) {
        super(props)
        this.state = {
            unit: new UnitEntity(),
            unitCardImage: false,
            backgroundColor: 'white',
            borderColor: 'teal',
            cardType: 'basic',
            closedMessage: window.localStorage.getItem('closedMessage') || !!this.props.user
        };

        this.setUnit = this.setUnit.bind(this)
        this.addUnit = this.addUnit.bind(this)
        this.copyUnit = this.copyUnit.bind(this)
        this.deleteUnit = this.deleteUnit.bind(this)
        this.updateUnit = this.updateUnit.bind(this)
        this.resetUnit = this.resetUnit.bind(this)
        this.loadUnit = this.loadUnit.bind(this)
        this.blankCanvas = this.blankCanvas.bind(this)
    }

    componentDidMount() {
        this.blankCanvas()
    }

    blankCanvas() {
        this.setUnit(new UnitEntity())
    }

    setUnit(unit) {
        this.setState({
            unit: unit,
            original: unit
        })
    }

    addUnit() {
        firestore.collection(this.col)
            .add(this.state.unit.prepareAdd())
            .then(
                docRef => this.loadUnit(docRef.id)
            )
    }

    copyUnit() {
        firestore.collection(this.col)
            .add(this.state.unit.prepareCopy())
    }

    updateUnit() {
        firestore.doc(this.col + '/' + this.state.unit.id)
            .update(this.state.unit.prepareUpdate())
            .then(
                success => this.setUnit(this.state.unit)
            )
    }

    deleteUnit() {
        firestore.doc(this.col + '/' + this.state.unit.id)
            .delete()
        this.blankCanvas()
    }

    resetUnit() {
        this.setState({ unit: this.state.original })
    }

    loadUnit(id) {
        firestore.doc('sites/warfare/units/' + id).get()
            .then(doc => this.setUnit({ ...doc.data(), id: doc.id }))
    }

    generateImage = () => {
        toSvg(document.getElementById('UnitCard'), { style: { color: 'red' } })
            .then(dataUrl => {
                this.setState({ unitCardImage: dataUrl })
            });
    };

    downloadImage = () => {
        toBlob(document.getElementById('UnitCard'))
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
                <UnitmakerContext.Provider value={this.state}>
                    <Grid stackable>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <UnitmakerButtonGroup />
                            </Grid.Column>
                            <Grid.Column textAlign={'right'} verticalAlign={'middle'}>
                                <a style={{ color: 'teal' }}
                                    href={'https://www.kickstarter.com/projects/255133215/strongholds-and-streaming'}>
                                    Unit creation rules from <em>Strongholds & Followers</em> by <b>Matt Colville</b>
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
                </UnitmakerContext.Provider>
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
