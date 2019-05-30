import React from 'react';
import StandardPage from "../components/StandardPage";
import {Container, Header, List} from "semantic-ui-react";
import {Link} from "react-router-dom";

const SiteMap = () => {
    return (
        <StandardPage metaTitle={'Site Map'} icon={'map'} canonical={'https://warfare.pikaoku.com/sitemap'}
                      title={'Site Map'} description={'User facing site map for https://warfare.pikaoku.com'}>
            <Container text>
                <Header as={'h2'} size={'huge'} color={'teal'} content={'Internal'}/>
                <nav>
                    <List>
                        <List.Item content={'Unit Maker'} as={Link} to={'/'}/>
                        <List.Item content={'Shared'} as={Link} to={'/shared'}/>
                        <List.Item content={'Info'} as={Link} to={'/info'}/>
                        <List.Item content={'Rules'} as={Link} to={'/rules'}/>
                        <List.Item content={'User'} as={Link} to={'/user'}/>
                        <List.Item content={'Contact'} as={Link} to={'/contact'}/>
                        <List.Item content={'Sitemap'} as={Link} to={'/sitemap'}/>
                    </List>
                </nav>
                <Header as={'h2'} size={'huge'} color={'teal'} content={'External'}/>
                <List>
                    <List.Item
                        content={'Legacy Unit Maker'}
                        as={'a'}
                        href={'https://warfare.pikaoku.com'}/>
                    <List.Item
                        content={'My Twitter'}
                        as={'a'}
                        href={'https://twitter.com/Pikaoku'}/>
                    <List.Item
                        content={'Strongholds and Followers Kickstarter'}
                        as={'a'}
                        href={'https://www.kickstarter.com/projects/255133215/strongholds-and-streaming'}/>
                    <List.Item
                        content={'MCDM Productions'}
                        as={'a'}
                        href={'https://www.mcdmproductions.com/'}/>
                </List>
            </Container>
        </StandardPage>
    );
};

export default SiteMap;
