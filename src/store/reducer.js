import {emptyUnitObject} from "../utils/unitMakerUtils";

// AUTH
export const AUTH_HANDLE_CHANGE = 'AUTH HANDLE STATE CHANGE';
export const AUTH_SIGN_IN_SUCCESS = 'AUTH SIGN IN SUCCESS';
export const AUTH_SIGN_IN_FAILURE = 'AUTH SIGN IN FAILURE';
export const AUTH_SIGN_OUT = 'AUTH SIGN OUT';

// FEATURE
export const FEATURES_FETCH_SUCCESS = 'FEATURES FETCH SUCCESS';

// ASPECT
export const ASPECTS_FETCH_SUCCESS = 'ASPECTS FETCH SUCCESS';

// FIRESTORE
export const FIRESTORE_REQUEST_FAILURE = 'FIRESTORE REQUEST FAILURE';
export const FIRESTORE_REQUEST_BEGIN = 'FIRESTORE REQUEST BEGIN';

const STATE_FIELD_ASPECTS = 'aspects';
const STATE_FIELD_FEATURES = 'features';

const init = {
    user: false,
    units: {},
    [STATE_FIELD_ASPECTS]: {
        all: [],
        core: [],
        user: [],
        saved: []
    },
    [STATE_FIELD_FEATURES]: {
        all: [],
        core: [],
        user: [],
        saved: []
    },
    unitmaker: {
        active: emptyUnitObject(),
    }
};
const reducer = (state = init, {type, payload}) => {
    const integrateData = (field, category, values) => {
        let all = [];
        ['core', 'user', 'saved'].map(key => all = all.concat(key === category ? values : state[field][key]));
        return {
            ...state,
            [field]: {
                ...state[field],
                all,
                [category]: values
            }
        };
    };

    switch (type) {
        case AUTH_SIGN_IN_SUCCESS:
            return {...state, user: payload.user};
        case AUTH_SIGN_OUT:
            // TODO: CLEANSE user data!
            return {...state, user: false};
        case AUTH_HANDLE_CHANGE:
            return {...state, user: (payload.user || false)};
        case ASPECTS_FETCH_SUCCESS:
            return integrateData(STATE_FIELD_ASPECTS, payload.category, payload.values);
        case FEATURES_FETCH_SUCCESS:
            return integrateData(STATE_FIELD_FEATURES, payload.category, payload.values);
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
};

export default reducer;