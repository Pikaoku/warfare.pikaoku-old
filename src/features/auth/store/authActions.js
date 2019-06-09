import { AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_OUT, AUTH_USER_SETTINGS_FETCHED } from "./authReducer";
import { fsUpdate } from "../../../firebase";

import User from "../types/User";

const onSignIn = user => ({
    type: AUTH_SIGN_IN_SUCCESS,
    payload: {
        user: new User(user)
    }
})

const onSignOut = () =>
    (dispatch, getState, firebase) => {
        firebase.auth().signOut()
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: {}
        })
    }

const updateUserSettings = (snapshot) => ({
    type: AUTH_USER_SETTINGS_FETCHED,
    payload: {
        username: snapshot.data().username,
        settings: snapshot.data().warfare
    }
})

const saveUserSetting = (field, value) =>
    (dispatch, getState, firebase) =>
        fsUpdate('users', firebase.auth().currentUser.uid, { [field]: value });

export { onSignIn, onSignOut, saveUserSetting, updateUserSettings }