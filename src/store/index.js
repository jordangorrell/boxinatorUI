import { createStore }from 'redux';
import actionTypes from './actionTypes';

const reducer = (state = { boxes: [] }, action) => {
    if (action.type === actionTypes.ADD_BOX) {
        return {
            boxes: state.boxes.concat(action.newBox)
        }
    }

    if (action.type === actionTypes.ADD_BOXES) {
        return {
            boxes: state.boxes.concat(action.newBoxes)
        }
    }

    return state;
}

const store = createStore(reducer);

export default store;