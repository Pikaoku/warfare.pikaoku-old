// AUTH
export const AUTH_HANDLE_CHANGE = 'AUTH HANDLE STATE CHANGE';
export const AUTH_SIGN_IN_SUCCESS = 'AUTH SIGN IN SUCCESS';
export const AUTH_SIGN_IN_FAILURE = 'AUTH SIGN IN FAILURE';
export const AUTH_SIGN_OUT = 'AUTH SIGN OUT';
export const AUTH_USER_SETTINGS_FETCHED = 'USER SETTINGS FETCHED';

export const AUTH_USER = 'user';

const defaultSettings = {
    baseDefense: 10,
    baseToughness: 10,
    labelFeatureGroups: true
}

const initialState = {
    [AUTH_USER]: false,
    authenticated: false,
    username: '',
    settings: defaultSettings
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_SIGN_IN_SUCCESS:
            return { ...state, [AUTH_USER]: payload.user, authenticated: true };
        case AUTH_SIGN_IN_FAILURE:
        case AUTH_SIGN_OUT:
            return { ...state, [AUTH_USER]: false, authenticated: false, settings: defaultSettings };
        case AUTH_USER_SETTINGS_FETCHED:
            return state.authenticated
                ? { ...state, username: payload.username, settings: payload.settings }
                : { ...state, username: '', settings: defaultSettings }
        case 'TOGGLE_LABEL_FEATURE_GROUPS':
            return { ...state, settings: { ...state.settings, labelFeatureGroups: !state.settings.labelFeatureGroups } }
        default:
            return state;
    }
}