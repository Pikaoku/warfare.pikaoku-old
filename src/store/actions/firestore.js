import {
    ASPECTS_FETCH_SUCCESS,
    CORE,
    FEATURES_FETCH_SUCCESS,
    FIRESTORE_REQUEST_FAILURE,
    SAVED,
    UNITMAKER_CREATE_UNIT_REQUEST,
    UNITMAKER_CREATE_UNIT_SUCCESS,
    UNITS_FETCH_SUCCESS,
    USER
} from "../reducer";
import {
    FIRESTORE_COLLECTION_ASPECTS,
    FIRESTORE_COLLECTION_FEATURES,
    FIRESTORE_COLLECTION_UNITS
} from "../../utils/firebaseUtils";

export const fsFetch = (collection, where, type, category) => (
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

export const fsUpdate = (collection, id, data) =>
    (dispatch, getState, firebase) => {
        return firebase
            .firestore()
            .collection(collection)
            .doc(id)
            .update(data)
            .then(
                success => true,
                failure => true
            )
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
    (dispatch, getState, firebase) => {
        const user = firebase.auth().currentUser;
        const data = {...aspect, authorId: user.uid, author: user.displayName};
        return firebase
            .firestore()
            .collection(FIRESTORE_COLLECTION_ASPECTS)
            .add(data)
            .then(
                success => true,
                failure => true
            );
    };

// TODO: Actually HANDLE SHIT
export const updateAspect = (id, data) => fsUpdate(FIRESTORE_COLLECTION_ASPECTS, id, data);

// TODO: Actually HANDLE SHIT
export const deleteAspect = id => fsDelete(FIRESTORE_COLLECTION_ASPECTS, id);

export const createFeature = feature =>
    (dispatch, getState, firebase) => {
        const user = firebase.auth().currentUser;
        const data = {...feature, authorId: user.uid, author: user.displayName};
        return firebase
            .firestore()
            .collection(FIRESTORE_COLLECTION_FEATURES)
            .add(data)
            .then(
                success => true,
                failure => true
            );
    };

export const updateFeature = (id, feature) => fsUpdate(FIRESTORE_COLLECTION_FEATURES, id, feature);

export const deleteFeature = id => fsDelete(FIRESTORE_COLLECTION_FEATURES, id);

export const addUnit = () =>
    (dispatch, getState, firebase) => {
        let unit = getState().unitmaker.active;
        const user = firebase.auth().currentUser;
        const data = {...unit, authorId: user.uid, author: user.displayName};
        dispatch({type: UNITMAKER_CREATE_UNIT_REQUEST});
        return firebase.firestore()
            .collection(FIRESTORE_COLLECTION_UNITS)
            .add(data)
            .then(
                success => {
                    dispatch({
                        type: UNITMAKER_CREATE_UNIT_SUCCESS,
                        payload: {id: success.id}
                    })
                },
                failure => true
            )

    };

export const updateUnit = () =>
    (dispatch, getState, firebase) => {
        let unit = getState.unitmaker.active;
        return firebase.firestore()
            .collection(FIRESTORE_COLLECTION_UNITS)
            .doc(getState.unitmaker.id)
            .update(unit)
    };

export const deleteUnit = id => fsDelete(FIRESTORE_COLLECTION_UNITS, id);

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
        unsubs.push(dispatch(fetchFeaturesUser(userId)));
        unsubs.push(dispatch(fetchFeaturesSaved(userId)));
        unsubs.push(dispatch(fetchAspectsUser(userId)));
        unsubs.push(dispatch(fetchAspectsSaved(userId)));
        unsubs.push(dispatch(fetchUnitsUser(userId)));
        unsubs.push(dispatch(fetchUnitsSaved(userId)));
        return unsubs;
    }
);

export const fetchFeaturesCore = () =>
    fsFetch(
        FIRESTORE_COLLECTION_FEATURES,
        ['official', '==', true],
        FEATURES_FETCH_SUCCESS,
        CORE
    );

export const fetchFeaturesUser = (userId) =>
    fsFetch(
        FIRESTORE_COLLECTION_FEATURES,
        ['authorId', '==', userId],
        FEATURES_FETCH_SUCCESS,
        USER
    );

export const fetchFeaturesSaved = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_FEATURES,
        ['saved', 'array-contains', userId],
        FEATURES_FETCH_SUCCESS,
        SAVED
    );

export const fetchAspectsCore = () =>
    fsFetch(
        FIRESTORE_COLLECTION_ASPECTS,
        ['official', '==', true],
        ASPECTS_FETCH_SUCCESS,
        CORE
    );

export const fetchAspectsUser = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_ASPECTS,
        ['authorId', '==', userId],
        ASPECTS_FETCH_SUCCESS,
        USER
    );

export const fetchAspectsSaved = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_ASPECTS,
        ['saved', 'array-contains', userId],
        ASPECTS_FETCH_SUCCESS,
        SAVED
    );

export const fetchUnitsUser = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_UNITS,
        ['authorId', '==', userId],
        UNITS_FETCH_SUCCESS,
        USER
    );

export const fetchUnitsSaved = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_UNITS,
        ['savedBy', '==', userId],
        UNITS_FETCH_SUCCESS,
        SAVED
    );