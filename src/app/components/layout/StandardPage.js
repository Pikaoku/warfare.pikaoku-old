import React from 'react';
import {Container, Divider, Header, Icon} from "semantic-ui-react";

const StandardPage = ({children, title, subtitle, icon, color}) => {
    return (
        <div className={'m0'}>
            <div style={{backgroundColor: color || 'teal'}} className={'m0'}>
                <Container>
                    <Divider hidden fitted/>
                    <Header inverted as={'h1'}>
                        <Icon name={icon}/>
                        <Header.Content>
                            {title}
                            <Header.Subheader>
                                {subtitle}
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Divider hidden fitted/>
                </Container>
            </div>
            <Divider hidden/>
            <Container>
                {children}
            </Container>
        </div>
    );
};

export default StandardPage;
