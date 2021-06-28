import { csrfFetch } from "./csrf"

const GET_CARDS = 'session/getCard';
const GET_CARD = 'session/getACard'
const DELETE_ANSWER = "session/deleteAnswer";
const UPDATE_CARDCOMMENT = 'session/updateCardComment'

const getCards= (cards) => {
    return {
        type: GET_CARDS,
        payload: cards,
    }
}

const getCard = (card) => {
    return {
        type: GET_CARD,
        payload: card
    }
}

const deleteAnswer = (answerId) => {
	return {
		type: DELETE_ANSWER,
		payload: answerId,
	};
};

export const updateComment = (content) => {
    return {
        type: UPDATE_CARDCOMMENT,
        payload: content,
    }
}


export const showMgtCards = () => async(dispatch) => {
    const response = await csrfFetch("/api/mgtCards")
    const data = await response.json()
    dispatch(getCards(data.mgtcards))
    return response;//add error handling for return response
}

export const showSingleCard = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/mgtCards/${id}`)
    const data = await response.json()
    dispatch(getCard(data))
    

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
        case UPDATE_CARDCOMMENT:
            newState = Object.assign({}, state);
            newState[action.payload.mgtCardId].Comments.unshift(action.payload)
            return newState
        case GET_CARD:
            newState = Object.assign({}, state);
            action.payload.Comments.sort((a, b) => a.id - b.id).reverse()
            newState[action.payload.id] = action.payload
            return newState
        // case DELETE_ANSWER:
        //     newState = Object.assign({}, state)
        //     newState[action.payload[0]]
        default:
            return state;
    }

}




export default mgtCardReducer;