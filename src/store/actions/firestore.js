import {ASPECTS_FETCH_SUCCESS, FEATURES_FETCH_SUCCESS, FIRESTORE_REQUEST_FAILURE} from "../reducer";
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
        'core'
    );

export const fetchFeaturesUser = (userId) =>
    fsFetch(
        FIRESTORE_COLLECTION_FEATURES,
        ['authorId', '==', userId],
        FEATURES_FETCH_SUCCESS,
        'user'
    );

export const fetchFeaturesSaved = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_FEATURES,
        ['saved', 'array-contains', userId],
        FEATURES_FETCH_SUCCESS,
        'saved'
    );

export const fetchAspectsCore = () =>
    fsFetch(
        FIRESTORE_COLLECTION_ASPECTS,
        ['official', '==', true],
        ASPECTS_FETCH_SUCCESS,
        'core'
    );

export const fetchAspectsUser = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_ASPECTS,
        ['authorId', '==', userId],
        ASPECTS_FETCH_SUCCESS,
        'user'
    );

export const fetchAspectsSaved = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_ASPECTS,
        ['saved', 'array-contains', userId],
        ASPECTS_FETCH_SUCCESS,
        'saved'
    );

export const fetchUnitsUser = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_UNITS,
        ['authorId', '==', userId],
        FEATURES_FETCH_SUCCESS,
        'saved'
    );

export const fetchUnitsSaved = userId =>
    fsFetch(
        FIRESTORE_COLLECTION_UNITS,
        ['savedBy', '==', userId],
        FEATURES_FETCH_SUCCESS,
        'saved'
    );