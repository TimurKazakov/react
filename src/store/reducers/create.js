import {CREATE_QUIZ_ACTION, RESET_QUIZ_CREATION} from "../actions/actionTypes";

const initialState ={ quiz:[]}

export default function createReducer(state=initialState, action){
    switch (action.type) {

        case RESET_QUIZ_CREATION:
            return {
                ...state, quiz:[]
            }
        case CREATE_QUIZ_ACTION:
            return {
                ...state, quiz:[...state.quiz, action.item]
            }

        default:
            return state
    }
}