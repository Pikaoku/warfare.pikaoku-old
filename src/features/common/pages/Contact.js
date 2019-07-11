import React from 'react'
import { Button, Container, Divider } from 'semantic-ui-react'

import StandardPage from '../components/StandardPage'

const Contact = () => {
    return (
        <StandardPage
            canonical={'https://warfare.pikaoku.com/contact'}
            description={'Contact information for warfare.pikaoku'}
            icon={'mail'}
            metaTitle={'Contact Me | warfare.pikaoku'} title={'Contact Me'}
        >
            <Container text textAlign={'center'}>
                <Button fluid color={'vk'} size={'massive'} icon={'discord'} as={'a'}
                    href={'https://discord.gg/njeuFWp'} content={'On My Discord'} />
                <Divider hidden />
                <Button fluid color={'twitter'} size={'massive'} icon={'twitter'} as={'a'}
                    href={'https://twitter.com/Pikaoku'} content={'On Twitter'} />
                <Divider hidden />
                <Button fluid color={'google plus'} size={'massive'} icon={'patreon'} as={'a'}
                    href={'https://www.patreon.com/pikaoku'} content={'On Patreon'} />

            </Container>
        </StandardPage>
    );
};

export default Contact;
