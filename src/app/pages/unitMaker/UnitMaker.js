import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import {Card, Container, Divider, Grid} from "semantic-ui-react";
import BasicUnitCard from "../../components/unitCards/BasicUnitCard";
import './UnitMaker.css';
import AspectSelect from "./components/AspectCard";
import UnitMakerCore from "./components/UnitMakerCore";
import FeatureManager from "./components/FeatureManager";
import UnitmakerButtonGroup from "./components/UnitmakerButtonGroup";

class UnitMaker extends Component {
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
                                <BasicUnitCard styles={'centered'}/>
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
