import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import {Button, Container, Divider, Grid} from "semantic-ui-react";
import BasicUnitCard from "../../components/unitCards/BasicUnitCard";
import './UnitMaker.css';
import AspectManager from "./components/AspectManager";
import UnitMakerCore from "./components/UnitMakerCore";
import FeatureManager from "./components/FeatureManager";
import UnitmakerButtonGroup from "./components/UnitmakerButtonGroup";
import * as domtoimage from "dom-to-image";
import {saveAs} from 'file-saver';


class UnitMaker extends Component {
    state = {
        unitCardImage: false
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
        return (
            <StandardPage title={'Unit Maker'} subtitle={'Make all those awesome units, yo!'} icon={'pencil'}>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            {
                                this.props.user &&
                                <UnitmakerButtonGroup/>
                            }
                            <UnitMakerCore/>
                            <AspectManager/>
                            <FeatureManager/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Container textAlign={'center'}>
                                <div className={'grid-center'}>
                                    <BasicUnitCard/>
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
                                    this.state.unitCardImage &&
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
