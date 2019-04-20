import {emptyUnitObject, enforceArrayUniqueness} from "../utils/unitMakerUtils";
import update from 'immutability-helper';

// AUTH
export const AUTH_HANDLE_CHANGE = 'AUTH HANDLE STATE CHANGE';
export const AUTH_SIGN_IN_SUCCESS = 'AUTH SIGN IN SUCCESS';
export const AUTH_SIGN_IN_FAILURE = 'AUTH SIGN IN FAILURE';
export const AUTH_SIGN_OUT = 'AUTH SIGN OUT';
export const AUTH_USER_SETTINGS_FETCHED = 'USER SETTINGS FETCHED';


// FEATURE
export const FEATURES_FETCH_SUCCESS = 'FEATURES FETCH SUCCESS';
// ASPECT
export const ASPECTS_FETCH_SUCCESS = 'ASPECTS FETCH SUCCESS';
export const UNITS_FETCH_SUCCESS = 'UNITS FETCH SUCCESS';

// FIRESTORE
export const FIRESTORE_REQUEST_FAILURE = 'FIRESTORE REQUEST FAILURE';
export const FIRESTORE_REQUEST_BEGIN = 'FIRESTORE REQUEST BEGIN';

export const UNITMAKER_FIELD_UPDATE = 'UNITMAKER FIELD UPDATE';
export const UNITMAKER_NESTED_FIELD_UPDATE = 'UNITMAKER NESTED FIELD UPDATE';
export const UNITMAKER_ADD_FEATURE = 'UNITMAKER ADD FEATURE';
export const UNITMAKER_RESET = 'UNITMAKER RESET';
export const UNITMAKER_LOAD_UNIT = 'UNITMAKER LOAD UNIT';
export const UNITMAKER_CREATE_UNIT_REQUEST = 'UNITMAKER CREATE UNIT REQUEST';
export const UNITMAKER_CREATE_UNIT_SUCCESS = 'UNITMAKER CREATE UNIT SUCCESS';

export const ASPECTS = 'aspects';
export const FEATURES = 'features';
export const UNITS = 'units';
export const ALL = 'all';
export const USER = 'user';
export const CORE = 'core';
export const SAVED = 'saved';
export const CATEGORIES = [USER, CORE, SAVED];
export const SETTINGS = 'settings';

export const ASPECT_TYPE_ANCESTRY = 'ancestry';
export const ASPECT_TYPE_EXPERIENCE = 'experience';
export const ASPECT_TYPE_EQUIPMENT = 'equipment';
export const ASPECT_TYPE_TYPE = 'type';
export const ASPECT_TYPES = [ASPECT_TYPE_ANCESTRY, ASPECT_TYPE_EXPERIENCE, ASPECT_TYPE_EQUIPMENT, ASPECT_TYPE_TYPE];

export const FEATURE_TYPE_TRAIT = 'trait';
export const FEATURE_TYPE_ACTION = 'action';
export const FEATURE_TYPE_ATTACHMENT = 'attachment';
export const FEATURE_TYPES = [FEATURE_TYPE_TRAIT, FEATURE_TYPE_ACTION, FEATURE_TYPE_ATTACHMENT];

export const CUSTOMIZATION = 'customization';

const categoriesFalsed = {
    core: false, user: false, saved: false
};

const initializeStoreContainer = () => ({
    [ALL]: [],
    [CORE]: [],
    [USER]: [],
    [SAVED]: []
});

const init = {
    user: false,
    [UNITS]: initializeStoreContainer(),
    [ASPECTS]: initializeStoreContainer(),
    [FEATURES]: initializeStoreContainer(),
    unitmaker: {
        active: emptyUnitObject(),
        id: false,
        loading: false
    },
    [SETTINGS]: {},
    fetched: {[FEATURES]: categoriesFalsed, [ASPECTS]: categoriesFalsed, [UNITS]: categoriesFalsed}
};

const reducer = (state = init, {type, payload}) => {
        const integrateData = (field, category, values) => {
            let all = [];
            CATEGORIES.map(key => all = all.concat(key === category ? values : state[field][key]));
            return {
                ...state,
                fetched: update(state.fetched, {[field]: {[category]: {$set: true}}}),
                [field]: {
                    ...state[field],
                    all,
                    [category]: values
                }
            };
        };

        const addToFeatures = (newArrElem) => {
            let arr = state.unitmaker.active[CUSTOMIZATION].features;
            arr.push(newArrElem);
            return update(state, {unitmaker: {active: {[CUSTOMIZATION]: {features: {$set: enforceArrayUniqueness(arr)}}}}})
        };

        switch (type) {
            case UNITMAKER_FIELD_UPDATE:
                return update(state, {unitmaker: {active: {[payload.field]: {$set: payload.value}}}});
            case UNITMAKER_NESTED_FIELD_UPDATE:
                return update(state, {unitmaker: {active: {[payload.outer]: {[payload.inner]: {$set: payload.value}}}}});
            case UNITMAKER_ADD_FEATURE:
                return addToFeatures(payload.value);
            case UNITMAKER_RESET:
                return update(state, {unitmaker: {active: {$set: emptyUnitObject()}, id: {$set: false}}});
            case UNITMAKER_CREATE_UNIT_REQUEST:
                return update(state, {unitmaker: {loading: {$set: true}}});
            case UNITMAKER_CREATE_UNIT_SUCCESS:
                return {
                    ...state,
                    unitmaker: {
                        id: payload.id,
                        loading: false,
                        active: state[UNITS][USER].find(x => x.id === payload.id).data()
                    }
                };
            case UNITMAKER_LOAD_UNIT:
                return {
                    ...state,
                    unitmaker: {
                        ...state.unitmaker,
                        id: payload.id,
                        active: payload.data
                    }
                };
            case AUTH_SIGN_IN_SUCCESS:
                return {...state, user: payload.user};
            case AUTH_SIGN_OUT:
                // TODO: CLEANSE user data!
                return {...state, user: false};
            case AUTH_HANDLE_CHANGE:
                return {...state, user: (payload.user || false)};
            case AUTH_USER_SETTINGS_FETCHED:
                return {
                    ...state,
                    settings: payload.settings
                };
            case ASPECTS_FETCH_SUCCESS:
                return integrateData(ASPECTS, payload.category, payload.values);
            case FEATURES_FETCH_SUCCESS:
                return integrateData(FEATURES, payload.category, payload.values);
            case UNITS_FETCH_SUCCESS:
                return integrateData(UNITS, payload.category, payload.values);
            case FIRESTORE_REQUEST_BEGIN:
                let arr = state.listeners[payload.authType];
                arr.push(payload.unsub);
                return {
                    ...state,
                    listeners: {
                        ...state.listeners,
                        [payload.authType]: arr
                    }
                };
            case FIRESTORE_REQUEST_FAILURE:
                return state;
            default:
                return state;
        }
    }
;

export default reducer;