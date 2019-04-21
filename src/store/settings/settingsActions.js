import {fsUpdate} from "../firestoreUtils";
import {fetchFailure} from "../data/dataActions";
import {FETCH_SETTINGS_SUCCESS} from "./settingsReducer";

export const fetchUserSettings = () =>
    (dispatch, getState, firebase) =>
        firebase.firestore()
            .doc('users/' + firebase.auth().currentUser.uid)
            .onSnapshot(
                response =>
                    dispatch({
                        type: FETCH_SETTINGS_SUCCESS,
                        payload: {
                            username: response.data().username,
                            settings: {...response.data().warfare}
                        }
                    }),
                fetchFailure
            );

export const updateUserSetting = (field, value) =>
    (dispatch, getState, firebase) =>
        fsUpdate('users', firebase.auth().currentUser.uid, {[field]: value});
