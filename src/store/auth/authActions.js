import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {AUTH_HANDLE_CHANGE, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT} from "./authReducer";

export const handleAuthStateChange =
    user => ({
        type: AUTH_HANDLE_CHANGE,
        payload: {user}
    });

export const signInSuccess =
    response => (
        (dispatch, getState, firebase) => {
            if (response.additionalUserInfo.isNewUser) {
                firebase.firestore()
                    .doc('users/' + response.user.uid)
                    .set({
                        username: response.user.displayName,
                        warfare: {
                            baseDefense: 10,
                            baseToughness: 10
                        }
                    })
            }
            dispatch({
                type: AUTH_SIGN_IN_SUCCESS,
                payload: {user: response.user}
            });
        }
    );

export const signOut =
    () => {
        firebase.auth().signOut();
        return {type: AUTH_SIGN_OUT, payload: {user: false}}
    };