import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import {Button, Card, Container, Divider, Grid} from "semantic-ui-react";
import BasicUnitCard from "../../components/unitCards/BasicUnitCard";
import './UnitMaker.css';
import AspectSelect from "./components/AspectCard";
import UnitMakerCore from "./components/UnitMakerCore";
import FeatureManager from "./components/FeatureManager";
import UnitmakerButtonGroup from "./components/UnitmakerButtonGroup";
import * as domtoimage from "dom-to-image";

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

    render() {
        return (
            <StandardPage title={'Unit Maker'} subtitle={'Make all those awesome units, yo!'} icon={'pencil'}>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <UnitmakerButtonGroup/>
                            <UnitMakerCore/>
                            <Card.Group itemsPerRow={2} stackable>
                                <AspectSelect aspect={'ancestry'}/>
                                <AspectSelect aspect={'experience'}/>
                                <AspectSelect aspect={'equipment'}/>
                                <AspectSelect aspect={'type'}/>
                            </Card.Group>
                            <Divider hidden/>
                            <FeatureManager/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Container textAlign={'center'}>
                                <div id={'UnitCard'}>
                                    <BasicUnitCard styles={'centered'}/>
                                </div>
                                <Divider hidden/>
                                <Button color={'olive'} content={'Generate'} onClick={this.generateImage}/>
                                <Divider hidden/>
                                {
                                    this.state.unitCardImage &&
                                    <img src={this.state.unitCardImage} alt={'broke'}/>
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
    unit: state.unitmaker.active
});

export default connect(
    mapStateToProps,
    {}
)(UnitMaker);
