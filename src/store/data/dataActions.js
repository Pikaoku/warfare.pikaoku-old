import {FS_COL_ASPECTS, FS_COL_FEATURES, FS_COL_UNITS} from "../../utils/firebaseUtils";
import {fsAdd, fsDelete, fsListen, fsUpdate} from "../firestoreUtils";
import {
    CORE,
    FETCH_ASPECTS_SUCCESS,
    FETCH_FAILURE,
    FETCH_FEATURES_SUCCESS,
    FETCH_UNITS_SUCCESS,
    SAVED,
    USER
} from "./dataReducer";
import {UNITMAKER_ACTIVE, UNITMAKER_ACTIVE_ID, UNITMAKER_CREATE_UNIT_SUCCESS} from "../unitmaker/unitmakerReducer";
import {UNITMAKER} from "../reducer";

export const createAspect = (aspect) =>
    (dispatch, getState, firebase) => fsAdd(FS_COL_ASPECTS, aspect, getState().settings.username);

export const updateAspect = (id, data) =>
    fsUpdate(FS_COL_ASPECTS, id, data);

export const deleteAspect = id =>
    fsDelete(FS_COL_ASPECTS, id);

export const createFeature = feature =>
    (dispatch, getState, firebase) => fsAdd(FS_COL_FEATURES, feature, getState().settings.username);

export const updateFeature = (id, feature) => fsUpdate(FS_COL_FEATURES, id, feature);

export const deleteFeature = id => fsDelete(FS_COL_FEATURES, id);

export const createUnit = () =>
    (dispatch, getState, firebase) =>
        fsAdd(FS_COL_UNITS, getState().unitmaker.active, getState().settings.username)
            .then(
                success =>
                    success.get().then(
                        doc => dispatch({
                            type: UNITMAKER_CREATE_UNIT_SUCCESS,
                            payload: {
                                id: doc.id,
                                unit: doc.data()
                            }
                        })
                    ),
                failure => true
            );

export const updateUnit = (id, data) => fsUpdate(FS_COL_UNITS, id, data);

export const updateUnitmakerUnit = () =>
    (dispatch, getState, firebase) =>
        updateUnit(getState()[UNITMAKER][UNITMAKER_ACTIVE_ID], getState()[UNITMAKER][UNITMAKER_ACTIVE]);

export const deleteUnit = id => fsDelete(FS_COL_UNITS, id);

export const addUserToRecordSaved = (collection, recordId, userId) =>
    (dispatch, getState, firebase) =>
        fsUpdate(collection, recordId, {
            saves: firebase.firestore.FieldValue.increment(1),
            saved: firebase.firestore.FieldValue.arrayUnion(userId),
        });

export const removeUserFromRecordSaved = (collection, recordId, userId) =>
    (dispatch, getState, firebase) =>
        fsUpdate(collection, recordId, {
            saves: firebase.firestore.FieldValue.increment(-1),
            saved: firebase.firestore.FieldValue.arrayRemove(userId),
        });

export const saveUnitToUser = (unitId, userId) =>
    addUserToRecordSaved(FS_COL_UNITS, unitId, userId);

export const saveAspectToUser = (aspectId, userId) =>
    addUserToRecordSaved(FS_COL_ASPECTS, aspectId, userId);

export const saveFeatureToUser = (featureId, userId) =>
    addUserToRecordSaved(FS_COL_FEATURES, featureId, userId);

export const unsaveUnitFromUser = (unitId, userId) =>
    removeUserFromRecordSaved(FS_COL_UNITS, unitId, userId);

export const unsaveAspectFromUser = (aspectId, userId) =>
    removeUserFromRecordSaved(FS_COL_ASPECTS, aspectId, userId);

export const unsaveFeatureFromUser = (featureId, userId) =>
    removeUserFromRecordSaved(FS_COL_FEATURES, featureId, userId);

export const fetchFailure = error =>
    dispatch =>
        dispatch({
            type: FETCH_FAILURE,
            error: error
        });

export const fetchSuccess = (type, category, values) => ({
    type: type,
    payload: {
        category: category,
        values: values
    }
});

export const fetchCoreData = () => (
    (dispatch, getState, firebase) => {
        let unsubs = [];
        unsubs.push(
            fsListen(FS_COL_FEATURES, ['official', '==', true])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_FEATURES_SUCCESS, CORE, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        unsubs.push(
            fsListen(FS_COL_ASPECTS, ['official', '==', true])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_ASPECTS_SUCCESS, CORE, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        return unsubs;
    }
);

export const fetchUserData = () => (
    (dispatch, getState, firebase) => {
        let unsubs = [];
        const userId = firebase.auth().currentUser.uid;
        unsubs.push(
            fsListen(FS_COL_FEATURES, ['authorId', '==', userId])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_FEATURES_SUCCESS, USER, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        unsubs.push(
            fsListen(FS_COL_FEATURES, ['saved', 'array-contains', userId])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_FEATURES_SUCCESS, SAVED, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        unsubs.push(
            fsListen(FS_COL_ASPECTS, ['authorId', '==', userId])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_ASPECTS_SUCCESS, USER, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        unsubs.push(
            fsListen(FS_COL_ASPECTS, ['saved', 'array-contains', userId])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_ASPECTS_SUCCESS, SAVED, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        unsubs.push(
            fsListen(FS_COL_UNITS, ['authorId', '==', userId])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_UNITS_SUCCESS, USER, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        unsubs.push(
            fsListen(FS_COL_UNITS, ['saved', 'array-contains', userId])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_UNITS_SUCCESS, SAVED, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        return unsubs;
    }
);
