import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Menu, Responsive, Segment} from "semantic-ui-react";
import {Link, withRouter} from 'react-router-dom';
import NavUserLink from "./NavUserLink";

class Navigation extends Component {
    render() {
        const
            {user} = this.props,
            path = this.props.location.pathname,
            isActive = (to) => path.startsWith(to);

        const authItemProps = {
            active: isActive('/user'), as: Link, to: '/user', icon: 'user'
        };

        const authItem =
            user === false
                ? <Menu.Item content={'Log In'} {...authItemProps}/>
                : <NavUserLink navProps={authItemProps}/>;

        return (
            <nav>
                <Segment attached color={'teal'} inverted style={{border: 0}}>
                    <Responsive {...Responsive.onlyMobile}>
                        <Menu pointing secondary inverted color={'teal'} size={'large'} className={'attached'}>
                            <Menu.Menu position={'left'}>
                                {/*<Menu.Item {...NAV_LOGO}/>*/}
                                <Menu.Item>
                                    <Menu borderless size={'large'}>
                                    </Menu>
                                </Menu.Item>
                            </Menu.Menu>
                            <Menu.Menu position={'right'}>{authItem}</Menu.Menu>
                        </Menu>
                    </Responsive>
                    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                        <Menu pointing secondary inverted size={'massive'} className={'attached'}>
                            <Container>
                                <Menu.Menu position={'left'}>
                                    <Menu.Item to={'/info'} active={path === '/info'} as={Link}
                                               content={'warfare.pikaoku'}/>
                                    <Menu.Item to={'/'} active={path === '/'} as={Link} content={'Unit Maker'}/>
                                    <Menu.Item to={'/shared'} active={path === '/shared'} as={Link} content={'Shared'}/>
                                    <Menu.Item to={'/rules'} active={path === '/rules'} as={Link} content={'Rules'}/>
                                    <Menu.Item to={'/compare'} active={path === '/compare'} as={Link}
                                               content={'Compare'}/>
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
    user: state.user
});

export default connect(
    mapStateToProps,
    null
)(withRouter(Navigation));
