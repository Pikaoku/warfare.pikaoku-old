import {UNITMAKER_FIELD_UPDATE} from "../reducer";

export const updateUnitmakerField = (field, value) => ({
    type: UNITMAKER_FIELD_UPDATE,
    payload: {
        field: field,
        value: value
    }
});