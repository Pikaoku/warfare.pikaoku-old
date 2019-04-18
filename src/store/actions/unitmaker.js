import {
    UNITMAKER_ADD_FEATURE,
    UNITMAKER_FIELD_UPDATE,
    UNITMAKER_LOAD_UNIT,
    UNITMAKER_NESTED_FIELD_UPDATE, UNITMAKER_RESET
} from "../reducer";

export const saveUmField = (field, value) => ({
    type: UNITMAKER_FIELD_UPDATE,
    payload: {field, value}
});

export const saveUmNestedField = (outer, inner, value) => ({
    type: UNITMAKER_NESTED_FIELD_UPDATE,
    payload: {outer, inner, value}
});

export const umAddFeature = feature => ({
    type: UNITMAKER_ADD_FEATURE,
    payload: {value: feature}
});

export const umLoadUnit = id =>
    (dispatch, getState, firebase) => {
        firebase.firestore()
            .doc('sites/warfare/units/' + id)
            .get()
            .then(
                success =>
                    dispatch({
                        type: UNITMAKER_LOAD_UNIT,
                        payload: {
                            id: success.id,
                            data: success.data()
                        }
                    })
            )
    };

export const umReset = () => ({
    type: UNITMAKER_RESET
});