import {combineReducers} from "redux";
import {authReducer} from "./auth/authReducer";
import {dataReducer} from "./data/dataReducer";
import {settingsReducer} from "./settings/settingsReducer";
import {unitmakerReducer} from "./unitmaker/unitmakerReducer";

export const AUTH = 'auth';
export const DATA = 'data';
export const SETTINGS = 'settings';
export const UNITMAKER = 'unitmaker';

const reducer = combineReducers({
    [AUTH]: authReducer,
    [DATA]: dataReducer,
    [SETTINGS]: settingsReducer,
    [UNITMAKER]: unitmakerReducer,
});

export default reducer;