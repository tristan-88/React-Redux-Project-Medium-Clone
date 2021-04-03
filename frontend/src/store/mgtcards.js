import { csrfFetch } from "./csrf"

const GET_CARDS = 'session/getCard';

const getCards= (cards) => {
    return {
        type: GET_CARDS,
        payload: cards,
    }
}



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
        default:
            return state;
    }

}

export const showMgtCards = () => async(dispatch) => {
    const response = await csrfFetch("/api/mgtCards")
    const data = await response.json()
    dispatch(getCards(data.mgtcards))
    return response;
}

export default mgtCardReducer;