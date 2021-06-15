import { csrfFetch } from "./csrf";
import mgtCardReducer from "./mgtcards"
const GET_ANSWERS = "answers/getAnswer"
const UPDATE_ANSWER = "session/updateAnswer"
const POST_ANSWER = "session/postAnswer"
const DELETE_ANSWER = "session/deleteAnswer"

const getAnswer = (answers) => {
    return {
        type: GET_ANSWERS,
        payload: answers
    }
}

const postAnswer = (answer) => {
    return {
        type: POST_ANSWER,
        payload: answer
    }
}


const updateAnswer = (answerId) => {
    return {
        type: UPDATE_ANSWER,
        payload: answerId
    }
}

const deleteAnswer = (answerId, cardId, mgtcardState) => {
    return {
        type: DELETE_ANSWER,
        payload: [answerId, cardId, mgtcardState]
    }
}


//we use for dispatch
export const gettingAnswers = () => async (dispatch) => {
    const response = await csrfFetch("/api/comments");
    const data = await response.json();
    dispatch(getAnswer(data.answers));
    return response;
};

export const updatingAnswer = (id, answer) => async (dispatch) => {
    const response = await csrfFetch("/api/answers", {
        method: "PATCH",
        body: JSON.stringify({
            answerId: id,
            answer: answer,
        }),
    });

    dispatch(updateAnswer(id, answer));
    return response;
};

export const deletingAnswer = (answerId) => async (dispatch) => {
    const response = await csrfFetch('/api/answers', {
        method: "DELETE",
        body: JSON.stringify({ answerId })

    });
    dispatch(deleteAnswer(answerId))
    return response;
}

export const postingAnswer = (answer, commentId, userId) => async (dispatch) => {
    const response = await csrfFetch("/api/answers", {
        method: "POST",
        body: JSON.stringify({
            userId,
            answer,
            commentId,
        }),
    });
    const newAnswer = await response.json();
    dispatch(postAnswer(newAnswer))

    return newAnswer;
}


const initialState = {};

const answerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ANSWERS:
            newState = Object.assign({}, state)

            return newState
        case UPDATE_ANSWER:
            newState = Object.assign({}, state)

            return newState
        case POST_ANSWER:
            newState = Object.assign({}, state)
            newState.update = true
            return newState
        case DELETE_ANSWER:
            return { ...state, update: true }
        default:
            return state
    }

}

export default answerReducer;
