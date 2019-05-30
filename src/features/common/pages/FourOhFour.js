import React from 'react';
import StandardPage from "../components/StandardPage";
import {Grid, GridColumn, Message} from "semantic-ui-react";

const FourOhFour = () => {
    return (
        <StandardPage metaTitle={'404 Page Not Found'} icon={'warning sign'}
                      canonical={'https://warfare.pikaoku.com/404'} title={'Error'}
                      description={'404 page not found'}>
            <Grid columns={1}>
                <GridColumn verticalAlign={'middle'}>
                    <Message
                        icon={'warning sign'}
                        header={'404: Page not found'}
                        content={"You're lost, mate."}
                        error
                        size={'massive'}
                    />
                </GridColumn>
            </Grid>
        </StandardPage>
    );
};

export default FourOhFour;
