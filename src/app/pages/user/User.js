import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import firebase from 'firebase/app';
import 'firebase/auth';
import {StyledFirebaseAuth} from "react-firebaseui";
import {Button, Container, Grid, Message} from "semantic-ui-react";
import {signInSuccess, signOut} from "../../../store/auth/authActions";
import UserAspectTable from "./components/UserAspectTable";
import UserFeatureTable from "./components/UserFeatureTable";
import UserSettings from "./components/UserSettings";
import {AUTH, SETTINGS} from "../../../store/reducer";
import {AUTH_USER} from "../../../store/auth/authReducer";
import {SETTINGS_USERNAME} from "../../../store/settings/settingsReducer";

class User extends Component {
    render() {
        const {user, username, signOut, signInSuccess} = this.props;
        const authConfig = {
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                signInSuccessWithAuthResult: signInSuccess
            }
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
                title={username}
                icon={'users'}
            >
                <Grid stackable>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <UserSettings/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <UserFeatureTable/>
                        </Grid.Column>
                        <Grid.Column>
                            <UserAspectTable/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Button content={'Sign Out'} onClick={signOut} color={'orange'}/>
                    </Grid.Row>
                </Grid>
            </StandardPage>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state[AUTH][AUTH_USER],
    username: state[SETTINGS][SETTINGS_USERNAME]
});

export default connect(
    mapStateToProps,
    {signOut, signInSuccess}
)(User);
