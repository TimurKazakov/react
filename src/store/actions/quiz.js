import axios from '../../axios/axios-quiz';
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json');
            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type:FETCH_QUIZES_START
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type:FETCH_QUIZES_SUCCESS,
        quizes
    }
}
export function fetchQuizesError(error) {
    return {
        type:FETCH_QUIZES_ERROR,
        error
    }
}

export function fetchQuizById(quizId) {


    return async dispatch => {
        dispatch(fetchQuizesStart())


        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export function fetchQuizSuccess(quiz) {
    return {
        type:FETCH_QUIZ_SUCCESS,
        quiz
    }
}
export function quizSetState(answerState, results ) {
    return {
        type:QUIZ_SET_STATE,
        answerState, results
    }
}
export function finishQuiz() {
    return{ type:FINISH_QUIZ}
}
export function quizNextQuestion(number) {
    return{
        type: QUIZ_NEXT_QUESTION, number

    }
}

export function quizAnswerClick(answerId) {

    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState){
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] ==='success'){
                return
            }
        }
        const item= state.quiz[state.activeQuestion];
        const results= state.results;
        if (item.rightAnswerId === answerId){
            if (!results[item.id]){
                results[item.id]='success'
            }
            dispatch(quizSetState({[answerId]:'success'}, results));

            const timeout = window.setTimeout(()=>{
                if (isQuizFinished(state)){
                    dispatch(finishQuiz());

                }else {
                    dispatch(quizNextQuestion(state.activeQuestion+1,));
                    // this.setState({
                    //     activeQuestion:this.state.activeQuestion+1,
                    //     answerState:null,
                    // })
                }
                window.clearTimeout(timeout);
            },1000);

        } else {
            results[item.id]= 'error';
            dispatch(quizSetState({[answerId]:'error'}, results));


        }
    }

}
function isQuizFinished(state) {
    return state.activeQuestion+1 ===state.quiz.length;
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY,
    }

}