// AUTH
export const AUTH_HANDLE_CHANGE = 'AUTH HANDLE STATE CHANGE';
export const AUTH_SIGN_IN_SUCCESS = 'AUTH SIGN IN SUCCESS';
export const AUTH_SIGN_IN_FAILURE = 'AUTH SIGN IN FAILURE';
export const AUTH_SIGN_OUT = 'AUTH SIGN OUT';
export const AUTH_USER_SETTINGS_FETCHED = 'USER SETTINGS FETCHED';

export const AUTH_USER = 'user';
export const AUTH_LOADING = 'loading';
export const AUTH_LOADED = 'loaded';

const initialState = {
    [AUTH_USER]: false,
    [AUTH_LOADING]: false,
    [AUTH_LOADED]: false
};

export const authReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case AUTH_SIGN_IN_SUCCESS:
            return {...state, user: payload.user, loading: false, loaded: true};
        case AUTH_SIGN_IN_FAILURE:
            return {...state, loaded: false, loading: false, user: false};
        case AUTH_SIGN_OUT:
            return {...state, user: false, loading: false, loaded: false};
        case AUTH_HANDLE_CHANGE:
            return {...state, user: payload.user};
        case AUTH_USER_SETTINGS_FETCHED:
            return {
                ...state,
                settings: payload.settings
            };
        default:
            return state;
    }
}