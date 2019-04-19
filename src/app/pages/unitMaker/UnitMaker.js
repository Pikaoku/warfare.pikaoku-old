import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import {Button, Container, Divider, Grid, Segment} from "semantic-ui-react";
import BasicUnitCard from "../../components/unitCards/BasicUnitCard";
import './UnitMaker.css';
import AspectManager from "./components/AspectManager";
import UnitMakerCore from "./components/UnitMakerCore";
import FeatureManager from "./components/FeatureManager";
import UnitmakerButtonGroup from "./components/UnitmakerButtonGroup";
import * as domtoimage from "dom-to-image";
import {saveAs} from 'file-saver';
import ColorPicker from "../../components/ColorPicker";


class UnitMaker extends Component {
    state = {
        unitCardImage: false,
        backgroundColor: 'white',
        borderColor: 'black'
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
        const {user} = this.props;
        const {unitCardImage, backgroundColor, borderColor} = this.state;

        return (
            <StandardPage title={'Unit Maker'} subtitle={'Make all those awesome units, yo!'} icon={'pencil'}>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            {
                                user &&
                                <UnitmakerButtonGroup/>
                            }
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
                            </Segment>
                            <Container textAlign={'center'}>
                                <div className={'grid-center'}>
                                    <BasicUnitCard borderColor={borderColor} backgroundColor={backgroundColor}/>
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
    unit: state.unitmaker.active,
    user: state.user
});

export default connect(
    mapStateToProps,
    {}
)(UnitMaker);
