export const SETTINGS_USERNAME = 'username';
export const SETTINGS_BASE_DEFENSE = 'baseDefense';
export const SETTINGS_BASE_TOUGHNESS = 'baseToughness';
export const SETTINGS_LABEL_FEATURE_GROUPS = 'labelFeatureGroups';

export const FETCH_SETTINGS_REQUEST = 'SETTINGS FETCH REQUEST';
export const FETCH_SETTINGS_SUCCESS = 'SETTINGS FETCH SUCCESS';

export const SET_SETTING = 'SET SETTING';

export const TOGGLE_LABEL_FEATURE_GROUPS = 'toggle label feature groups'

const initialState = {
    [SETTINGS_USERNAME]: '',
    [SETTINGS_BASE_DEFENSE]: 10,
    [SETTINGS_BASE_TOUGHNESS]: 10,
    [SETTINGS_LABEL_FEATURE_GROUPS]: true,
};

export const settingsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case TOGGLE_LABEL_FEATURE_GROUPS:
            return {
                ...state,
                [SETTINGS_LABEL_FEATURE_GROUPS]: !state[SETTINGS_LABEL_FEATURE_GROUPS]
            };
        case SET_SETTING:
            return {
                ...state,
                [payload.setting]: payload.value
            };
        case FETCH_SETTINGS_REQUEST:
            return state;
        case FETCH_SETTINGS_SUCCESS:
            return {
                ...state,
                [SETTINGS_USERNAME]: payload.username,
                ...payload.settings
            };
        default:
            return state;
    }
};