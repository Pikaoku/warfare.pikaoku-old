import React from 'react';
import { Container, Divider, Header, Icon } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import ReactGA from 'react-ga';
import { pure } from "recompose";
import { connect } from 'react-redux';

const StandardPage = pure(
    (
        {
            children,
            title,
            canonical,
            metaTitle,
            description,
            icon,
            color,
            notification
        }
    ) => {

        ReactGA.pageview(window.location.pathname);

        return (
            <div className={'m0'} style={{ minHeight: '85vh' }}>
                <Helmet>
                    <link rel="canonical" href={canonical} />
                    <meta name="description" content={description} />
                    <title>{metaTitle} | warfare.pikaoku</title>
                </Helmet>
                <div style={{ backgroundColor: color || 'teal' }} className={'m0'}>
                    <Container>
                        <Divider hidden fitted />
                        <Header inverted>
                            <Icon name={icon} />
                            <Header.Content as={'h1'}>
                                {title}
                            </Header.Content>
                        </Header>
                        <Divider hidden fitted />
                    </Container>
                </div>
                {
                    !!notification &&
                    <div style={{ backgroundColor: '#9cc' }} className={'m0'}>
                        <Container style={{paddingTop: '15px'}}>
                            <Header inverted size={'small'}>
                                <Icon name={'warning sign'} />
                                <Header.Content>
                                    {notification}
                                </Header.Content>
                            </Header>
                            <Divider hidden fitted />
                        </Container>
                    </div>
                }
                <Divider hidden />
                <Container>

                    {children}
                    <Divider hidden />
                    <Divider hidden />
                </Container>
            </div>
        );
    }
);

StandardPage.propTypes = {
    title: PropTypes.string.isRequired,
    canonical: PropTypes.string.isRequired,
    metaTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string
};

const mapStateToProps = state => ({
    notification: state.settings.notification
})

export default connect(
    mapStateToProps, null
)(StandardPage);
