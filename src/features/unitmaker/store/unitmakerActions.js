import { UNITMAKER } from '../../../reducer'
import { FEATURES } from '../../../store/data/dataReducer'
import { enforceArrayUniqueness } from '../../common/utils/array/enforceArrayUniqueness'
import findByField from '../../common/utils/array/findByField'
import {
    UNITMAKER_ACTIVE,
    UNITMAKER_LOAD_UNIT_SUCCESS,
    UNITMAKER_RESET,
    UNITMAKER_UPDATE_CUSTOM_FEATURES,
    UNITMAKER_UPDATE_FIELD,
    UNITMAKER_UPDATE_NESTED_FIELD,
} from './unitmakerReducer'
import { ASPECT_TYPE_CUSTOMIZATION } from './unitmakerUtils'

export const saveUmField = (field, value) => ({
    type: UNITMAKER_UPDATE_FIELD,
    payload: { field, value }
});

export const saveUmNestedField = (outer, inner, value) => ({
    type: UNITMAKER_UPDATE_NESTED_FIELD,
    payload: { outer, inner, value }
});

export const umAddFeature = feature =>
    (dispatch, getState, firebase) => {
        let features = enforceArrayUniqueness([...(getState().unitmaker.active.customization.features), feature])
        dispatch({
            type: UNITMAKER_UPDATE_CUSTOM_FEATURES,
            payload: { features: features }
        })
    }

export const umAddTempFeature = feature =>
    (dispatch, getState, firebase) => {
        let features = enforceArrayUniqueness([...(getState()[UNITMAKER][UNITMAKER_ACTIVE][ASPECT_TYPE_CUSTOMIZATION][FEATURES]), feature]);
        dispatch({
            type: UNITMAKER_UPDATE_CUSTOM_FEATURES,
            payload: { features: features }
        })
    }

export const umLoadUnit = id =>
    (dispatch, getState, firebase) => {
        dispatch(umReset());
        let unit = getState().units.all.find(findByField('id', id))
        if (unit) {
            dispatch({
                type: UNITMAKER_LOAD_UNIT_SUCCESS,
                payload: {
                    id: unit.id,
                    unit: unit
                }
            })
        }
    }

export const umReset = () => ({
    type: UNITMAKER_RESET
});