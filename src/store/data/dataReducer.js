export const ASPECTS = 'aspects';
export const CUSTOMIZATION = 'customization';
export const FEATURES = 'features';
export const UNITS = 'units';
export const ALL = 'all';
export const USER = 'user';
export const CORE = 'core';
export const SAVED = 'saved';
export const DATA_CATEGORIES = [USER, CORE, SAVED];

export const FETCH_FEATURES_SUCCESS = 'FETCH FEATURES SUCCESS';
export const FETCH_ASPECTS_SUCCESS = 'FETCH ASPECTS SUCCESS';
export const FETCH_UNITS_SUCCESS = 'FETCH UNITS SUCCESS';
export const FETCH_FAILURE = 'FETCH FAILURE';

const initializeStoreContainer = () => ({
    [ALL]: [],
    [CORE]: [],
    [USER]: [],
    [SAVED]: []
});

const initialState = {
    [ASPECTS]: initializeStoreContainer(),
    [FEATURES]: initializeStoreContainer(),
    [UNITS]: initializeStoreContainer(),
    error: false
};

const integrateData = (state, field, category, values) => {
    let all = [];
    DATA_CATEGORIES.map(key => all = all.concat(key === category ? values : state[field][key]));
    return {
        ...state,
        [field]: {
            ...state[field],
            [ALL]: all,
            [category]: values
        }
    };
};

export const dataReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ASPECTS_SUCCESS:
            return integrateData(state, ASPECTS, payload.category, payload.values);
        case FETCH_FEATURES_SUCCESS:
            return integrateData(state, FEATURES, payload.category, payload.values);
        case FETCH_UNITS_SUCCESS:
            return integrateData(state, UNITS, payload.category, payload.values);
        case FETCH_FAILURE:
            return { ...state, error: payload.error };
        default:
            return state;
    }
}; 