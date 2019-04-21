import update from "immutability-helper";
import {ASPECT_TYPE_CUSTOMIZATION, emptyUnitObject} from "./unitmakerUtils";
import {FEATURES} from "../data/dataReducer";

export const UNITMAKER_UPDATE_FIELD = 'UNITMAKER UPDATE FIELD';
export const UNITMAKER_UPDATE_NESTED_FIELD = 'UNITMAKER UPDATE NESTED FIELD';
export const UNITMAKER_ADD_CUSTOM_FEATURE = 'UNITMAKER ADD CUSTOM FEATURE';
export const UNITMAKER_RESET = 'UNITMAKER RESET';
export const UNITMAKER_LOAD_UNIT_REQUEST = 'UNITMAKER LOAD UNIT REQUEST';
export const UNITMAKER_LOAD_UNIT_SUCCESS = 'UNITMAKER LOAD UNIT SUCCESS';
export const UNITMAKER_CREATE_UNIT_REQUEST = 'UNITMAKER CREATE UNIT REQUEST';
export const UNITMAKER_CREATE_UNIT_SUCCESS = 'UNITMAKER CREATE UNIT SUCCESS';

export const UNITMAKER_ACTIVE = 'active';
export const UNITMAKER_ACTIVE_ID = 'id';
export const UNITMAKER_LOADING = 'loading';

const initialState = {
    [UNITMAKER_ACTIVE]: emptyUnitObject(),
    [UNITMAKER_ACTIVE_ID]: false,
    [UNITMAKER_LOADING]: false
};

export const unitmakerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case UNITMAKER_UPDATE_FIELD:
            return update(state, {[UNITMAKER_ACTIVE]: {[payload.field]: {$set: payload.value}}});
        case UNITMAKER_UPDATE_NESTED_FIELD:
            return update(state, {[UNITMAKER_ACTIVE]: {[payload.outer]: {[payload.inner]: {$set: payload.value}}}});
        case UNITMAKER_ADD_CUSTOM_FEATURE:
            return update(
                state,
                {[UNITMAKER_ACTIVE]: {[ASPECT_TYPE_CUSTOMIZATION]: {[FEATURES]: {$push: [payload.feature]}}}}
            );
        case UNITMAKER_RESET:
            return initialState;
        case UNITMAKER_LOAD_UNIT_REQUEST:
        case UNITMAKER_CREATE_UNIT_REQUEST:
            return {
                ...state,
                [UNITMAKER_LOADING]: true
            };
        case UNITMAKER_CREATE_UNIT_SUCCESS:
        case UNITMAKER_LOAD_UNIT_SUCCESS:
            return {
                ...state,
                [UNITMAKER_ACTIVE_ID]: payload.id,
                [UNITMAKER_ACTIVE]: payload.unit,
                [UNITMAKER_LOADING]: false,

            };
        default:
            return state;
    }
};