import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import {Button, Container, Segment} from "semantic-ui-react";

class Home extends Component {
    render() {
        return (
            <StandardPage
                title={'Info'}
                subtitle={''}
                icon={'info circle'}
                canonical={'https://warfare.pikaoku.com/info'}
                description={"A site that provides tools for Matt Colville's Strongholds & Followers for Dungeons & Dragons 5th Edition"}
                metaTitle={'Info'}
            >
                <Container text>
                    <Segment.Group>
                        <Segment>
                            <p>Hey. This is a unit maker for <em>Strongholds & Followers</em> by <b>Matt Colville</b>.
                            </p>

                            <p>If you run into any issues or have some suggestions message me on twitter @pikaoku.</p>

                            <p>Hate the new site? The old one is (or will be) available at:
                                https://legacy.warfare.pikaoku.com!</p>
                        </Segment>
                    </Segment.Group>

                    <Button as={'a'} href={'https://www.patreon.com/bePatron?u=9218037'} color={'google plus'}
                            icon={'patreon'} content={'Become a Patron!'}/>
                </Container>
            </StandardPage>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(Home);
