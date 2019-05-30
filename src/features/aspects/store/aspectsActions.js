import { FS_COL_ASPECTS, fsDelete, fsUpdate } from "../../../firebase";
import { addUserToRecordSaved, removeUserFromRecordSaved } from "../../units/store/unitsActions";
import { ASPECTS_CORE_UPDATED, ASPECTS_USER_UPDATED, ASPECTS_SAVED_UPDATED } from "./aspectsReducer";
import { fsAdd } from '../../common/utils/firebase/fsAdd';

export const createAspect = (aspect) =>
    (dispatch, getState, firebase) =>
        fsAdd(FS_COL_ASPECTS, aspect, getState().auth.username);

export const updateAspect = (id, data) =>
    (dispatch, getState, firebase) =>
        fsUpdate(FS_COL_ASPECTS, id, data);

export const deleteAspect = id =>
    (dispatch, getState, firebase) =>
        fsDelete(FS_COL_ASPECTS, id);

export const saveAspectToUser = (aspectId, userId) =>
    addUserToRecordSaved(FS_COL_ASPECTS, aspectId, userId);

export const unsaveAspectFromUser = (aspectId, userId) =>
    removeUserFromRecordSaved(FS_COL_ASPECTS, aspectId, userId);


const updateAspectCategory = (category, type) => docs => ({
    type: type,
    payload: {
        category: category,
        values: docs
    }
})

const updateCoreAspects = updateAspectCategory('core', ASPECTS_CORE_UPDATED)
const updateUserAspects = updateAspectCategory('user', ASPECTS_USER_UPDATED)
const updateSavedAspects = updateAspectCategory('saved', ASPECTS_SAVED_UPDATED)

export {updateCoreAspects, updateUserAspects, updateSavedAspects}

