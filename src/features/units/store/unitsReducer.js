import updateStateForCategory from "../../common/utils/updateStateForCategory";
import defaultCategoryState from "../../common/store/defaultCategoryState";

export const UNITS_CORE_UPDATED = 'UNITS CORE FETCHED'
export const UNITS_USER_UPDATED = 'UNITS USER FETCHED'
export const UNITS_SAVED_UPDATED = 'UNITS SAVED FETCHED'

const unitsReducer = (state = defaultCategoryState, { type, payload }) => {
    switch (type) {
        case UNITS_CORE_UPDATED:
        case UNITS_USER_UPDATED:
        case UNITS_SAVED_UPDATED:
            return updateStateForCategory(state, payload.category, payload.values);
        default:
            return state;
    }
}

export default unitsReducer