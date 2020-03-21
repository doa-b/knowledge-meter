import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    showControls: true,
    showZeroXP: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_SHOW_CONTROLS: return updateObject(state, {showControls: !state.showControls});
        case actionTypes.TOGGLE_SHOW_ZERO_XP: return updateObject(state, {showZeroXP: !state.showZeroXP});
        default:
            return state
    }
};

export default reducer;