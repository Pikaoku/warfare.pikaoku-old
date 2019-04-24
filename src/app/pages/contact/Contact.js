import React from 'react';
import StandardPage from "../../components/layout/StandardPage";
import {Button, Container, Divider} from "semantic-ui-react";

const Contact = () => {
    return (
        <StandardPage
            canonical={'https://warfare.pikaoku.com/contact'}
            description={'Contact information for warfare.pikaoku'}
            icon={'mail'}
            metaTitle={'Contact Me | warfare.pikaoku'} title={'Contact Me'}
        >
            <Container text textAlign={'center'}>
                <Button fluid color={'twitter'} size={'massive'} icon={'twitter'} as={'a'}
                        href={'https://twitter.com/Pikaoku'} content={'@Pikaoku'}/>
                <Divider hidden/>
                <Button fluid color={'vk'} size={'massive'} icon={'discord'} as={'a'}
                        href={'https://discordapp.com/'} content={'Pikaoku#1234'}/>
                <Divider hidden/>
            </Container>
        </StandardPage>
    );
};

export default Contact;
