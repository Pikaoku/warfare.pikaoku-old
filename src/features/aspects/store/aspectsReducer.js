import updateStateForCategory from "../../common/utils/updateStateForCategory";
import defaultCategoryState from "../../common/store/defaultCategoryState";

export const ASPECTS_CORE_UPDATED = 'ASPECTS CORE FETCHED'
export const ASPECTS_USER_UPDATED = 'ASPECTS USER FETCHED'
export const ASPECTS_SAVED_UPDATED = 'ASPECTS SAVED FETCHED'

const aspectsReducer = (state = defaultCategoryState, { type, payload }) => {
    switch (type) {
        case ASPECTS_CORE_UPDATED:
        case ASPECTS_USER_UPDATED:
        case ASPECTS_SAVED_UPDATED:
            return updateStateForCategory(state, payload.category, payload.values);
        default:
            return state;
    }
}

export default aspectsReducer