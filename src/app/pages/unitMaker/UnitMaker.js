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

    copyToClipboard = () => {
        domtoimage
            .toPng(document.getElementById('UnitCard'))
            .then(dataUrl => {
                this.setState(
                    {unitCardImage: dataUrl},
                    () => {
                        var img = document.querySelector('#UnitCardImage');
                        var r = document.createRange();
                        r.setStartBefore(img);
                        r.setEndAfter(img);
                        r.selectNode(img);
                        var sel = window.getSelection();
                        sel.addRange(r);
                        document.execCommand('Copy');
                    }
                )
            });

    };

    render() {
        const {unit} = this.props;

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
                            <Divider hidden/>
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
                                </Button.Group>
                                <Divider hidden/>
                                {
                                    this.state.unitCardImage &&
                                    <>
                                        <img id={'UnitCardImage'} src={this.state.unitCardImage} alt={'broke'}/>
                                        <Divider hidden/>
                                        <Button.Group size={'large'} color={'teal'}>
                                            <Button icon={'copy'} content={'Copy'}
                                                    onClick={this.copyToClipboard}/>
                                            <Button icon={'download'} content={'Download'}
                                                    onClick={this.generateImage}/>
                                        </Button.Group>
                                    </>
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
