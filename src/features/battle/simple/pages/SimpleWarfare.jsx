import React, {useState} from 'react';
import StandardPage from "../../../common/components/StandardPage";
import {Container, Grid, GridColumn, GridRow, Header, Segment, SegmentGroup} from "semantic-ui-react";
import SWStrengthInput from "../components/SWStrengthInput";

const SimpleWarfare = () => {

    const [leftStrength, setLeftStrength] = useState(0);
    const [rightStrength, setRightStrength] = useState(0);
    const [lStratAdv, setLStratAdv] = useState(0);
    const [rStratAdv, setRStratAdv] = useState(0);

    const ls = leftStrength || 0, rs = rightStrength || 0;

    const leftAdv = ls > rs ? Math.floor((+(((ls - rs) / rs)).toFixed(2)) * 100) : 0;
    const rightAdv = rs > ls ? Math.floor((+((rs - ls) / ls).toFixed(2)) * 100) : 0;

    return (
        <StandardPage
            title={'Simple Warfare'}
            subtitle={'Make all those awesome units, yo!'}
            icon={'calculator'}
            canonical={'https://warfare.pikaoku.com/simple'}
            description={"Calculator the winning armour using Matt Colville's simplified version of his Warfare rules"}
            metaTitle={'Simple Warfare Calculator'}
        >
            <Container text>
                <Grid>
                    <GridRow columns={2}>
                        <GridColumn>
                            <SegmentGroup>
                                <Segment>
                                    <SWStrengthInput str={leftStrength} setStr={setLeftStrength} adv={leftAdv}/>
                                </Segment>
                                <Segment>
                                </Segment>
                            </SegmentGroup>
                        </GridColumn>
                        <GridColumn>
                            <Segment>
                                <SWStrengthInput str={rightStrength} setStr={setRightStrength} adv={rightAdv}/>
                            </Segment>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Container>
        </StandardPage>
    );
};

export default SimpleWarfare;
