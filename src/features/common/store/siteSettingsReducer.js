const UPDATE_SITE_SETTINGS = 'UPDATE SITE SETTINGS';

export const updateSiteSettingsAction = snapshot => ({
    type: UPDATE_SITE_SETTINGS,
    payload: snapshot.data().settings
})

const initialState = {
    'notification': '',
}

const siteSettingsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        default:
            return state
        case UPDATE_SITE_SETTINGS:
            return payload
    }
}

export default siteSettingsReducer