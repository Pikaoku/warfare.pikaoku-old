import { FS_COL_FEATURES, fsDelete, fsUpdate } from "../../../firebase";
import { addUserToRecordSaved } from "../../units/store/unitsActions";
import { removeUserFromRecordSaved } from "../../units/store/unitsActions";
import { FEATURES_CORE_UPDATED, FEATURES_USER_UPDATED, FEATURES_SAVED_UPDATED } from "./featuresReducer";
import { fsAdd } from '../../common/utils/firebase/fsAdd';

export const createFeature = feature =>
    (dispatch, getState, firebase) =>
        fsAdd(FS_COL_FEATURES, feature, getState().auth.username);

export const updateFeature = (id, feature) =>
    (dispatch, getState, firebase) =>
        fsUpdate(FS_COL_FEATURES, id, feature);

export const deleteFeature = id =>
    (dispatch, getState, firebase) =>
        fsDelete(FS_COL_FEATURES, id);

export const saveFeatureToUser = (featureId, userId) =>
    addUserToRecordSaved(FS_COL_FEATURES, featureId, userId);
    
export const unsaveFeatureFromUser = (featureId, userId) =>
    removeUserFromRecordSaved(FS_COL_FEATURES, featureId, userId);

const updateFeatureCatagory = (category, type) => docs => ({
    type: type,
    payload: {
        category: category,
        values: docs
    }
})

const updateCoreFeatures = updateFeatureCatagory('core', FEATURES_CORE_UPDATED)
const updateUserFeatures = updateFeatureCatagory('user', FEATURES_USER_UPDATED)
const updateSavedFeatures = updateFeatureCatagory('saved', FEATURES_SAVED_UPDATED)

export { updateCoreFeatures, updateUserFeatures, updateSavedFeatures }