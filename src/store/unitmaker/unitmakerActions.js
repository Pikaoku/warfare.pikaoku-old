import {fetchFailure} from "../data/dataActions";
import {
    UNITMAKER_ADD_CUSTOM_FEATURE,
    UNITMAKER_LOAD_UNIT_SUCCESS,
    UNITMAKER_RESET,
    UNITMAKER_UPDATE_FIELD,
    UNITMAKER_UPDATE_NESTED_FIELD
} from "./unitmakerReducer";

export const saveUmField = (field, value) => ({
    type: UNITMAKER_UPDATE_FIELD,
    payload: {field, value}
});

export const saveUmNestedField = (outer, inner, value) => ({
    type: UNITMAKER_UPDATE_NESTED_FIELD,
    payload: {outer, inner, value}
});

export const umAddFeature = feature =>
    (dispatch, getState, firebase) =>
        dispatch({
            type: UNITMAKER_ADD_CUSTOM_FEATURE,
            payload: {feature: feature}
        });

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