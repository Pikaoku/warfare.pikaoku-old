import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import firebase from 'firebase/app';
import 'firebase/auth';
import {StyledFirebaseAuth} from "react-firebaseui";
import {Button, Grid} from "semantic-ui-react";
import {signInSuccess, signOut} from "../../../store/actions/auth";
import {feedFeatures} from "../../../utils/initialDataFeed";
import UserAspectTable from "./components/UserAspectTable";
import CreateAspect from "../../components/crud/CreateAspect";

class User extends Component {
    render() {
        const {user, signOut, signInSuccess} = this.props;
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

        if (user === false) {
            return (
                <StandardPage title={'User'} subtitle={'Look at all the cool stuff you made!'} icon={'users'}>
                    <div id={'login'}>
                        <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                </StandardPage>
            );
        }

        return (
            <StandardPage title={user.displayName} subtitle={'Look at all the cool stuff you made!'} icon={'users'}>
                <CreateAspect/>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <UserAspectTable aspect={'ancestry'}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <UserAspectTable aspect={'equipment'}/>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <UserAspectTable aspect={'experience'}/>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <UserAspectTable aspect={'type'}/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Button content={'Sign Out'} onClick={signOut} color={'orange'}/>
                <Button content={'data feed'} onClick={feedFeatures}/>
            </StandardPage>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(
    mapStateToProps,
    {signOut, signInSuccess}
)(User);
