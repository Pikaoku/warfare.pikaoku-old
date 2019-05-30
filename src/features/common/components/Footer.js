import React from 'react';
import {Container, Grid, Header, Icon, List, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <Segment inverted vertical style={{backgroundColor: 'teal', padding: '2em 0em'}}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='About'/>
                            <List link inverted>
                                <List.Item as={Link} to={'/sitemap'}>Sitemap</List.Item>
                                <List.Item as={Link} to={'/contact'}>Contact Me</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            {/*<Header inverted as='h4' content='Services'/>*/}
                            {/*<List link inverted>*/}
                            {/*    <List.Item as='a'>Banana Pre-Order</List.Item>*/}
                            {/*    <List.Item as='a'>DNA FAQ</List.Item>*/}
                            {/*</List>*/}
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as='h2' inverted>
                                warfare.pikaoku
                            </Header>
                            <List link inverted>
                                <List.Item as={'p'}>
                                    This site provides tools for use with <b>Matt Colville</b>'s <em>Stronghold &
                                    Followers</em>.
                                </List.Item>
                                <List.Item as={'a'} href={'https://twitter.com/pikaoku'}>
                                    Made by Sean McGarrity (@Pikaoku) <Icon name={'copyright outline'}/> All rights reserved
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    );
};

export default Footer;
