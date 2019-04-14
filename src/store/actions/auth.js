import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AUTH_HANDLE_CHANGE, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT} from "../reducer";
import {fetchAllUserData} from "./firestore";

export const handleAuthStateChange = user => ({
    type: AUTH_HANDLE_CHANGE,
    payload: {user}
});

export const signInSuccess = response => (
    (dispatch, getState, firebase) => {
        dispatch({
            type: AUTH_SIGN_IN_SUCCESS,
            payload: {user: response.user}
        });
        dispatch(fetchAllUserData(response.user.id))
    }
);

export const signInFailure = (error) => ({});

export const signOut = () => {
    firebase.auth().signOut();
    return {type: AUTH_SIGN_OUT, payload: {user: false}}
};