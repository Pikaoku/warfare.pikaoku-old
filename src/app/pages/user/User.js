import React, {Component} from 'react';
import {connect} from 'react-redux';
import StandardPage from "../../components/layout/StandardPage";
import firebase from 'firebase/app';
import 'firebase/auth';
import {StyledFirebaseAuth} from "react-firebaseui";
import {Button} from "semantic-ui-react";
import {signInSuccess, signOut} from "../../../store/actions/auth";
import {feedFeatures} from "../../../utils/initialDataFeed";

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
