import {UNITMAKER_ADD_FEATURE, UNITMAKER_FIELD_UPDATE, UNITMAKER_NESTED_FIELD_UPDATE} from "../reducer";

export const saveUmField = (field, value) => ({
    type: UNITMAKER_FIELD_UPDATE,
    payload: {field, value}
});

export const saveUmNestedField = (outer, inner, value) => ({
    type: UNITMAKER_NESTED_FIELD_UPDATE,
    payload: {outer, inner, value}
});

export const umAddFeature = (feature) => ({
    type: UNITMAKER_ADD_FEATURE,
    payload: {value: feature}
});