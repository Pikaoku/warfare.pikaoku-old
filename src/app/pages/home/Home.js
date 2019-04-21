import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import {Container, Segment} from "semantic-ui-react";

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
                        <Segment content={'Test'}/>
                        <Segment>
                            We out here folks!
                        </Segment>
                    </Segment.Group>
                </Container>
            </StandardPage>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
)(Home);
