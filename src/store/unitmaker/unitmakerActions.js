import {fetchFailure} from "../data/dataActions";
import {
    UNITMAKER_ACTIVE,
    UNITMAKER_LOAD_UNIT_SUCCESS,
    UNITMAKER_RESET,
    UNITMAKER_UPDATE_CUSTOM_FEATURES,
    UNITMAKER_UPDATE_FIELD,
    UNITMAKER_UPDATE_NESTED_FIELD
} from "./unitmakerReducer";
import {UNITMAKER} from "../reducer";
import {ASPECT_TYPE_CUSTOMIZATION, enforceArrayUniqueness} from "./unitmakerUtils";
import {FEATURES} from "../data/dataReducer";

export const saveUmField = (field, value) => ({
    type: UNITMAKER_UPDATE_FIELD,
    payload: {field, value}
});

export const saveUmNestedField = (outer, inner, value) => ({
    type: UNITMAKER_UPDATE_NESTED_FIELD,
    payload: {outer, inner, value}
});

export const umAddFeature = feature =>
    (dispatch, getState, firebase) => {
        const newFeature = {...feature.data(), id: feature.id};
        let features = [...(getState()[UNITMAKER][UNITMAKER_ACTIVE][ASPECT_TYPE_CUSTOMIZATION][FEATURES])];
        features.push(newFeature);
        features = enforceArrayUniqueness(features);
        dispatch({
            type: UNITMAKER_UPDATE_CUSTOM_FEATURES,
            payload: {features: features}
        })
    };

export const umAddTempFeature = feature =>
    (dispatch, getState, firebase) => {
        const newFeature = {...feature};
        let features = [...(getState()[UNITMAKER][UNITMAKER_ACTIVE][ASPECT_TYPE_CUSTOMIZATION][FEATURES])];
        features.push(newFeature);
        features = enforceArrayUniqueness(features);
        dispatch({
            type: UNITMAKER_UPDATE_CUSTOM_FEATURES,
            payload: {features: features}
        })
    };

export const umLoadUnit = id =>
    (dispatch, getState, firebase) => {
        dispatch(umReset());
        firebase.firestore()
            .doc('sites/warfare/units/' + id)
            .get()
            .then(
                success =>
                    dispatch({
                        type: UNITMAKER_LOAD_UNIT_SUCCESS,
                        payload: {
                            id: success.id,
                            unit: success.data()
                        }
                    }),
                fetchFailure
            )
    };

export const umReset = () => ({
    type: UNITMAKER_RESET
});