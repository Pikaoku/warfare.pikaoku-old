import { FS_COL_UNITS, fsDelete, fsUpdate } from "../../../firebase";
import {
    UNITMAKER_ACTIVE,
    UNITMAKER_ACTIVE_ID,
    UNITMAKER_CREATE_UNIT_SUCCESS
} from "../../unitmaker/store/unitmakerReducer";
import { UNITMAKER } from "../../../reducer";
import { fsAdd } from '../../common/utils/firebase/fsAdd';
import { UNITS_CORE_UPDATED, UNITS_USER_UPDATED, UNITS_SAVED_UPDATED } from './unitsReducer';

export const createUnit = () =>
    (dispatch, getState, firebase) =>
        fsAdd(FS_COL_UNITS, getState().unitmaker.active, getState().auth.username)
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

export const updateUnit = (id, data) =>
    (dispatch, getState, firebase) =>
        fsUpdate(FS_COL_UNITS, id, data);

export const updateUnitmakerUnit = () =>
    (dispatch, getState, firebase) =>
        updateUnit(getState()[UNITMAKER][UNITMAKER_ACTIVE_ID], getState()[UNITMAKER][UNITMAKER_ACTIVE]);

export const deleteUnit = id =>
    (dispatch, getState, firebase) =>
        fsDelete(FS_COL_UNITS, id);

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

export const unsaveUnitFromUser = (unitId, userId) =>
    removeUserFromRecordSaved(FS_COL_UNITS, unitId, userId);


const updateUnitCatagory = (category, type) => docs => ({
        type: type,
        payload: {
            category: category,
            values: docs
        }
    })

    // Core is not actually used... yet?
const updateCoreUnits = updateUnitCatagory('core', UNITS_CORE_UPDATED)
const updateUserUnits = updateUnitCatagory('user', UNITS_USER_UPDATED)
const updateSavedUnits = updateUnitCatagory('saved', UNITS_SAVED_UPDATED)

export { updateCoreUnits, updateUserUnits, updateSavedUnits }