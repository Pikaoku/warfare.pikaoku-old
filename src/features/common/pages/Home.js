import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../components/StandardPage";
import {Button, Container, Divider, Header, Segment} from "semantic-ui-react";

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
                            <Header as={'h2'}>About</Header>
                            <p>
                                Hey. This is a unit maker for <em>Strongholds & Followers</em> by <b>Matt Colville</b>.
                            </p>
                            <p><span>It was made by me, Sean. If you run into any issues or have some suggestions message me on twitter</span>
                                <a href={'https://twitter.com/Pikaoku'}> @pikaoku</a>.</p>

                            <p>
                                <span>Hate the new site? The old one is (or will be) available at: </span>
                                <a
                                    href={'https://legacy.warfare.pikaoku.com'}>https://legacy.warfare.pikaoku.com</a>!
                            </p>
                            <Divider/>

                            <Header as={'h3'}>Road Map</Header>
                            <p>I want to add a lot more to this tool. For example, the code is there to hot-swap unit
                                card types/designs. But just creating the unit cards is what will take time. I'm
                                currently in the final weeks of my degree so I will be fixing bugs but not adding new
                                features to this site until july, likely.</p>
                            <p>If you have designed a <em>Strongholds & Followers</em> unit card message me and I can
                                add it to the options later!</p>

                            <Header as={'h3'}>Contributing</Header>
                            <p>If you want to add a feature to this site go ahead and message me on twitter and I'll add
                                you to the repo.</p>

                            <Header as={'h3'}>Thanks</Header>
                            <p>Firstly, to <a href={'https://twitter.com/mattcolville'}>@mattcolville</a> and the rest
                                of MCDM for Strongholds & Followers.</p>
                            <p>To <a href="https://twitter.com/caelreader">CaelReader</a> for letting me include his <a
                                href="https://www.reddit.com/r/mattcolville/comments/acmr0a/warfare_unit_attachments/">attachments
                                addition.</a></p>
                            <p>And @BuurmanDeBurrman and @CheddarCheez on Discord whose suggetions prompted me to remake
                                the site!</p>

                            <Header as={'h3'}>Patreon</Header>
                            <Button as={'a'} href={'https://www.patreon.com/bePatron?u=9218037'} color={'google plus'}
                                    icon={'patreon'} content={'Become a Patron!'}/>
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
