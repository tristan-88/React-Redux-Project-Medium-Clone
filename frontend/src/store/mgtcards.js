import { csrfFetch } from "./csrf"

const GET_CARDS = 'session/getCard';
const DELETE_ANSWER = "session/deleteAnswer";

const getCards= (cards) => {
    return {
        type: GET_CARDS,
        payload: cards,
    }
}

const deleteAnswer = (answerId) => {
	return {
		type: DELETE_ANSWER,
		payload: answerId,
	};
};


export const showMgtCards = () => async(dispatch) => {
    const response = await csrfFetch("/api/mgtCards")
    const data = await response.json()
    dispatch(getCards(data.mgtcards))
    return response;
}

 export const deletingAnswer = (answerId) => async (dispatch) => {
		const response = await csrfFetch("/api/answers", {
			method: "DELETE",
			body: JSON.stringify({ answerId }),
		});
		dispatch(deleteAnswer(answerId));
		return response;
 };




const initialState = { };

const mgtCardReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case GET_CARDS:
            newState = Object.assign({}, state);
            for (let i = 0; i < action.payload.length; i++){
                const key = action.payload[i].id
                newState[key] = action.payload[i]    
            }
            return newState;
        // case DELETE_ANSWER:
        //     newState = Object.assign({}, state)
        //     newState[action.payload[0]]
        default:
            return state;
    }

}




export default mgtCardReducer;