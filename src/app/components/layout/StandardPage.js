import React from 'react';
import {Container, Divider, Header, Icon} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import PropTypes from "prop-types";
import ReactGA from 'react-ga';

const StandardPage = (
    {
        children,
        title,
        canonical,
        metaTitle,
        description,
        icon,
        color
    }
) => {

    ReactGA.pageview(window.location.pathname);

    return (
        <div className={'m0'} style={{minHeight: '80vh'}}>
            <Helmet>
                <link rel="canonical" href={canonical}/>
                <meta name="description" content={description}/>
                <title>{metaTitle} | warfare.pikaoku</title>
            </Helmet>
            <div style={{backgroundColor: color || 'teal'}} className={'m0'}>
                <Container>
                    <Divider hidden fitted/>
                    <Header inverted>
                        <Icon name={icon}/>
                        <Header.Content as={'h1'}>
                            {title}
                        </Header.Content>
                    </Header>
                    <Divider hidden fitted/>
                </Container>
            </div>
            <Divider hidden/>
            <Container>
                {children}
                <Divider hidden/>
                <Divider hidden/>
            </Container>
        </div>
    );
};

StandardPage.propTypes = {
    title: PropTypes.string.isRequired,
    canonical: PropTypes.string.isRequired,
    metaTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default StandardPage;
