import updateStateForCategory from "../../common/utils/updateStateForCategory";
import defaultCategoryState from "../../common/store/defaultCategoryState";

export const FEATURES_CORE_UPDATED = 'FEATURES CORE FETCHED'
export const FEATURES_USER_UPDATED = 'FEATURES USER FETCHED'
export const FEATURES_SAVED_UPDATED = 'FEATURES SAVED FETCHED'

const featuresReducer = (state = defaultCategoryState, { type, payload }) => {
    switch (type) {
        case FEATURES_CORE_UPDATED:
        case FEATURES_USER_UPDATED:
        case FEATURES_SAVED_UPDATED:
            return updateStateForCategory(state, payload.category, payload.values);
        default:
            return state;
    }
}

export default featuresReducer