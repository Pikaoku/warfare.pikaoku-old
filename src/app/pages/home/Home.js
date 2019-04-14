import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import {Container, Segment} from "semantic-ui-react";

class Home extends Component {
    render() {
        return (
            <StandardPage title={'Home'} subtitle={'what an awesome landing page'} icon={'home'}>
                <Container text>
                    <Segment.Group>
                        <Segment content={'Test'} />
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
