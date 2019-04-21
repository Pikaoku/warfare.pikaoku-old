export const SETTINGS_USERNAME = 'username';
export const SETTINGS_BASE_DEFENSE = 'baseDefense';
export const SETTINGS_BASE_TOUGHNESS = 'baseToughness';

export const FETCH_SETTINGS_REQUEST = 'SETTINGS FETCH REQUEST';
export const FETCH_SETTINGS_SUCCESS = 'SETTINGS FETCH SUCCESS';

const initialState = {
    [SETTINGS_USERNAME]: '',
    [SETTINGS_BASE_DEFENSE]: 10,
    [SETTINGS_BASE_TOUGHNESS]: 10,
};

export const settingsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
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