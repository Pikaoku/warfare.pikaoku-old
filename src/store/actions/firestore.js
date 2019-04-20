import {
    ASPECTS_FETCH_SUCCESS,
    AUTH_USER_SETTINGS_FETCHED,
    CORE,
    FEATURES_FETCH_SUCCESS,
    FIRESTORE_REQUEST_FAILURE,
    SAVED,
    UNITMAKER_CREATE_UNIT_SUCCESS,
    UNITS_FETCH_SUCCESS,
    USER
} from "../reducer";
import {
    FIRESTORE_COLLECTION_ASPECTS,
    FIRESTORE_COLLECTION_FEATURES,
    FIRESTORE_COLLECTION_UNITS
} from "../../utils/firebaseUtils";
import * as firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

export const fsListen = (collection, where, type, category) => (
    (dispatch, getState, firebase) => {
        return firebase.firestore().collection(collection)
            .where(...where)
            .onSnapshot(
                response => dispatch({
                    type: type,
                    payload: {
                        category,
                        values: response.docs
                    }
                }),
                error => dispatch({
                    type: FIRESTORE_REQUEST_FAILURE,
                    payload: {
                        category: category,
                        error: error
                    }
                })
            );
    }
);

export const fsAdd = (collection, data, author) =>
    firebase
        .firestore()
        .collection(collection)
        .add({
            saved: [],
            saves: 0,
            ...data,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            updated: firebase.firestore.FieldValue.serverTimestamp(),
            author: author,
            authorId: firebase.auth().currentUser.uid,
        });

export const fsUpdate = (collection, id, data) =>
    (dispatch, getState, firebase) => {
        return firebase
            .firestore()
            .collection(collection)
            .doc(id)
            .update({
                ...data,
                updated: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(
                success => true,
                failure => true
            );
    };

export const fsDelete = (collection, id) =>
    (dispatch, getState, firebase) => {
        return firebase
            .firestore()
            .collection(collection)
            .doc(id)
            .delete()
            .then(
                success => true,
                failure => true
            )
    };

export const createAspect = (aspect) =>
    (dispatch, getState, firebase) =>
        fsAdd(FIRESTORE_COLLECTION_ASPECTS, aspect, getState().settings.username || 'user');

export const updateAspect = (id, data) =>
    fsUpdate(FIRESTORE_COLLECTION_ASPECTS, id, data);

export const deleteAspect = id =>
    fsDelete(FIRESTORE_COLLECTION_ASPECTS, id);

export const createFeature = feature =>
    fsAdd(FIRESTORE_COLLECTION_FEATURES, feature);

export const updateFeature = (id, feature) =>
    fsUpdate(FIRESTORE_COLLECTION_FEATURES, id, feature);

export const deleteFeature = id =>
    fsDelete(FIRESTORE_COLLECTION_FEATURES, id);

export const addUnit = () =>
    (dispatch, getState, firebase) =>
        fsAdd(FIRESTORE_COLLECTION_UNITS, getState().unitmaker.active)
            .then(
                success => {
                    dispatch({
                        type: UNITMAKER_CREATE_UNIT_SUCCESS,
                        payload: {id: success.id}
                    })
                },
                failure => true
            );

export const updateUnit = () =>
    (dispatch, getState, firebase) => {
        let unit = getState().unitmaker.active;
        return firebase.firestore()
            .collection(FIRESTORE_COLLECTION_UNITS)
            .doc(getState().unitmaker.id)
            .update(unit)
    };

export const deleteUnit = id =>
    fsDelete(FIRESTORE_COLLECTION_UNITS, id);


export const addUserToRecordSaved = (collection, recordId, userId) =>
    fsUpdate(collection, recordId, {
        saves: firebase.firestore.FieldValue.increment(1),
        saved: firebase.firestore.FieldValue.arrayUnion(userId),
    });

export const removeUserFromRecordSaved = (collection, recordId, userId) =>
    fsUpdate(collection, recordId, {
        saves: firebase.firestore.FieldValue.increment(-1),
        saved: firebase.firestore.FieldValue.arrayRemove(userId),
    });

export const saveUnitToUser = (unitId, userId) =>
    addUserToRecordSaved(FIRESTORE_COLLECTION_UNITS, unitId, userId);

export const saveAspectToUser = (aspectId, userId) =>
    addUserToRecordSaved(FIRESTORE_COLLECTION_ASPECTS, aspectId, userId);

export const saveFeatureToUser = (featureId, userId) =>
    addUserToRecordSaved(FIRESTORE_COLLECTION_FEATURES, featureId, userId);

export const unsaveUnitFromUser = (unitId, userId) =>
    removeUserFromRecordSaved(FIRESTORE_COLLECTION_UNITS, unitId, userId);

export const unsaveAspectFromUser = (aspectId, userId) =>
    removeUserFromRecordSaved(FIRESTORE_COLLECTION_ASPECTS, aspectId, userId);

export const unsaveFeatureFromUser = (featureId, userId) =>
    removeUserFromRecordSaved(FIRESTORE_COLLECTION_FEATURES, featureId, userId);

export const fetchAllCoreData = () => (
    (dispatch, getState, firebase) => {
        let unsubs = [];
        unsubs.push(dispatch(fetchFeaturesCore()));
        unsubs.push(dispatch(fetchAspectsCore()));
        return unsubs;
    }
);

export const fetchAllUserData = userId => (
    (dispatch, getState, firebase) => {
        let unsubs = [];
        unsubs.push(dispatch(fetchUserSettings()));
        unsubs.push(dispatch(fetchFeaturesUser(userId)));
        unsubs.push(dispatch(fetchFeaturesSaved(userId)));
        unsubs.push(dispatch(fetchAspectsUser(userId)));
        unsubs.push(dispatch(fetchAspectsSaved(userId)));
        unsubs.push(dispatch(fetchUnitsUser(userId)));
        unsubs.push(dispatch(fetchUnitsSaved(userId)));
        return unsubs;
    }
);

export const fetchUserSettings = () =>
    (dispatch, getState, firebase) =>
        firebase.firestore()
            .doc('users/' + firebase.auth().currentUser.uid)
            .onSnapshot(
                response =>
                    dispatch({
                        type: AUTH_USER_SETTINGS_FETCHED,
                        payload: {
                            settings: response.data()
                        }
                    }),
                error => dispatch({
                    type: FIRESTORE_REQUEST_FAILURE,
                    payload: {
                        category: 'auth',
                        error: error
                    }
                })
            );


export const updateUserSetting = (field, value) =>
    (dispatch, getState, firebase) =>
        firebase.firestore()
            .doc('users/' + firebase.auth().currentUser.uid)
            .update({
                [field]: value
            });

export const fetchFeaturesCore = () =>
    fsListen(
        FIRESTORE_COLLECTION_FEATURES,
        ['official', '==', true],
        FEATURES_FETCH_SUCCESS,
        CORE
    );

export const fetchFeaturesUser = (userId) =>
    fsListen(
        FIRESTORE_COLLECTION_FEATURES,
        ['authorId', '==', userId],
        FEATURES_FETCH_SUCCESS,
        USER
    );

export const fetchFeaturesSaved = userId =>
    fsListen(
        FIRESTORE_COLLECTION_FEATURES,
        ['saved', 'array-contains', userId],
        FEATURES_FETCH_SUCCESS,
        SAVED
    );


export const fetchAspectsCore = () =>
    fsListen(
        FIRESTORE_COLLECTION_ASPECTS,
        ['official', '==', true],
        ASPECTS_FETCH_SUCCESS,
        CORE
    );

export const fetchAspectsUser = userId =>
    fsListen(
        FIRESTORE_COLLECTION_ASPECTS,
        ['authorId', '==', userId],
        ASPECTS_FETCH_SUCCESS,
        USER
    );

export const fetchAspectsSaved = userId =>
    fsListen(
        FIRESTORE_COLLECTION_ASPECTS,
        ['saved', 'array-contains', userId],
        ASPECTS_FETCH_SUCCESS,
        SAVED
    );

export const fetchUnitsUser = userId =>
    fsListen(
        FIRESTORE_COLLECTION_UNITS,
        ['authorId', '==', userId],
        UNITS_FETCH_SUCCESS,
        USER
    );

export const fetchUnitsSaved = userId =>
    fsListen(
        FIRESTORE_COLLECTION_UNITS,
        ['saved', 'array-contains', userId],
        UNITS_FETCH_SUCCESS,
        SAVED
    );