import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../common/components/StandardPage";
import {StyledFirebaseAuth} from "react-firebaseui";
import {Button, Container, Grid, Message, Divider} from "semantic-ui-react";
import {onSignOut} from "../store/authActions";
import AccountAspectTable from "../components/AccountAspectTable";
import AccountFeatureTable from "../components/AccountFeatureTable";
import AccountSettings from "../components/settings/AccountSettings";
import {AUTH} from "../../../reducer";
import {AUTH_USER} from "../store/authReducer";
import firebase from '../../../firebase'

class Account extends Component {
    render() {
        const {user, onSignOut} = this.props;
        const authConfig = {
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            ]
        };

        if ((user === false) || (user === null)) {
            return (
                <StandardPage
                    title={'User'}
                    subtitle={'Look at all the cool stuff you made!'}
                    icon={'users'}
                    canonical={'https://warfare.pikaoku.com/user'}
                    description={'User generated content management and settings for warfare.pikaoku'}
                    metaTitle={'User'}
                >
                    <Container text>
                        <Message
                            size={'large'}
                            color={'teal'}
                            content={<div><p>You can create custom ancestries, experiences, equipments, types,
                                traits, actions etc on your user page if you login. This will be saved to your
                                account and can be applied to any unit in the unit maker, on any device you log
                                in on.</p><p>You can also find stuff other people created in the Shared tab, hit
                                the heart to save it to your account and use those in the unit maker!</p></div>}
                            onDismiss={() => {
                                this.setState('closedMessage', true);
                                window.localStorage.setItem('closedMessage', true);
                            }}
                        />
                    </Container>

                    <Divider hidden/>

                    <Container text>
                        <Message
                            size={'large'}
                            color={'yellow'}
                            content={<div>If Twitter signin fails just try again, it's a twitter problem.</div>}
                        />
                    </Container>
                    <div id={'login'}>
                        <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                </StandardPage>
            );
        }

        return (
            <StandardPage
                canonical={'https://warfare.pikaoku.com/user'}
                description={'User generated content management and settings for warfare.pikaoku'}
                metaTitle={'User'}
                title={user.username}
                icon={'users'}
            >
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <AccountSettings/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <AccountFeatureTable/>
                        </Grid.Column>
                        <Grid.Column>
                            <AccountAspectTable/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Button content={'Sign Out'} onClick={onSignOut} color={'orange'}/>
                    </Grid.Row>
                </Grid>
            </StandardPage>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state[AUTH][AUTH_USER]
});

export default connect(
    mapStateToProps,
    {onSignOut}
)(Account);
