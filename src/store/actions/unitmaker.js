import {UNITMAKER_FIELD_CUSTOMIZATION_UPDATE, UNITMAKER_FIELD_UPDATE} from "../reducer";

export const updateUnitmakerField = (field, value) => ({
    type: UNITMAKER_FIELD_UPDATE,
    payload: {
        field: field,
        value: value
    }
});

export const updateUnitmakerCustomizationField = (field, value) => ({
    type: UNITMAKER_FIELD_CUSTOMIZATION_UPDATE,
    payload: {
        field: field,
        value: value
    }
});