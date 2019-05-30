import {FS_COL_ASPECTS, FS_COL_FEATURES, fsListen} from "../../../firebase";
import {CORE, FETCH_ASPECTS_SUCCESS, FETCH_FAILURE, FETCH_FEATURES_SUCCESS} from "../../../store/data/dataReducer";

export const fetchFailure = error =>
    dispatch =>
        dispatch({
            type: FETCH_FAILURE,
            error: error
        });
        
export const fetchSuccess = (type, category, values) => ({
    type: type,
    payload: {
        category: category,
        values: values
    }
});

export const fetchCoreData = () => (
    (dispatch, getState, firebase) => {
        let unsubs = [];
        unsubs.push(
            fsListen(FS_COL_FEATURES, ['official', '==', true])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_FEATURES_SUCCESS, CORE, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        unsubs.push(
            fsListen(FS_COL_ASPECTS, ['official', '==', true])
                .onSnapshot(
                    success => dispatch(fetchSuccess(FETCH_ASPECTS_SUCCESS, CORE, success.docs)),
                    failure => dispatch(fetchFailure(failure))
                )
        );
        return unsubs;
    }
);