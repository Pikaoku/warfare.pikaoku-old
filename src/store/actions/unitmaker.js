import {
    ALL,
    UNITMAKER_ADD_FEATURE,
    UNITMAKER_FIELD_UPDATE,
    UNITMAKER_LOAD_UNIT,
    UNITMAKER_NESTED_FIELD_UPDATE,
    UNITS
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
        const unit = getState[UNITS][ALL].find(x => x.id === id);
        return {
            type: UNITMAKER_LOAD_UNIT,
            payload: {
                id: unit.id,
                data: unit.data()
            }
        }
    };