import React from 'react';
import {Grid, Message} from "semantic-ui-react";

const MultipleTabs = () => {
    return (
        <Grid textAlign={'center'} style={{height: '105vh', backgroundColor: 'darkslategrey'}} verticalAlign={'middle'}>
            <Grid.Column style={{maxWidth: '500px'}}>
                <Message
                    error
                    icon={'warning sign'}
                    header='Multiple Tabs Detected'
                    content={[
                        'Multiple tabs cause Firestore to go bonkers and not work. But, Firestore will still charge me for those queries.'
                    ]}
                />
            </Grid.Column>
        </Grid>
    );
};

export default MultipleTabs;
