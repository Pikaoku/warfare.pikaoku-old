import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container, Menu, Responsive, Segment } from 'semantic-ui-react'

import { AUTH } from '../../../reducer'
import NavUserLink from '../../auth/components/NavUserLink'
import { AUTH_USER } from '../../auth/store/authReducer'

class Navigation extends Component {
    render() {
        const
            { user, location } = this.props,
            path = location.pathname,
            isActive = (to) => path.startsWith(to);

        const authItemProps = {
            active: isActive('/user'), as: Link, to: '/user', icon: 'user'
        };

        const authItem = user === false
            ? <Menu.Item content={'Log In'} {...authItemProps} />
            : <NavUserLink navProps={authItemProps} />;

        return (
            <nav>
                <Segment attached color={'teal'} inverted style={{ border: 0 }}>
                    <Responsive {...Responsive.onlyMobile}>
                        <Menu vertical fluid secondary inverted color={'teal'} size={'large'} className={'attached'}>
                            <Menu.Item
                                to={'/info'}
                                active={path === '/info'}
                                as={Link}
                                content={'warfare.pikaoku'}
                                icon={'info'}
                            />
                            <Menu.Item
                                icon={'pencil'}
                                to={'/'}
                                active={path === '/'}
                                as={Link}
                                content={'Unit Maker'} />
                            <Menu.Item
                                icon={'globe'}
                                to={'/shared/aspects'}
                                active={path.includes('/shared')} as={Link}
                                content={'Shared'}
                            />
                            <Menu.Item
                                icon={'book'}
                                to={'/rules'}
                                active={path === '/rules'}
                                as={Link}
                                content={'Rules'} />
                            <Menu.Item
                                icon={"flag"}
                                to={"/initiative"}
                                active={path === "/initiative"}
                                as={Link}
                                content={"Warfare"}
                            />
                            {authItem}
                        </Menu>
                    </Responsive>
                    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                        <Menu pointing secondary inverted size={'massive'} className={'attached'}>
                            <Container>
                                <Menu.Menu position={'left'}>
                                    <Menu.Item to={'/info'} active={path === '/info'} as={Link}
                                        content={'warfare.pikaoku'} />
                                    <Menu.Item to={'/'} active={path === '/'} as={Link} content={'Unit Maker'} />
                                    <Menu.Item to={'/shared/aspects'} active={path.includes('/shared/aspects')} as={Link} content={'Shared'} />
                                    <Menu.Item to={'/rules'} active={path === '/rules'} as={Link} content={'Rules'} />
                                    <Menu.Item
                                        to={"/initiative"}
                                        active={path === "/initiative"}
                                        as={Link}
                                        content={"Warfare"}
                                    />
                                </Menu.Menu>
                                <Menu.Menu position={'right'}>
                                    {authItem}
                                </Menu.Menu>
                            </Container>
                        </Menu>
                    </Responsive>
                </Segment>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state[AUTH][AUTH_USER] || false
});

export default connect(
    mapStateToProps,
    null
)(withRouter(Navigation));
