import { csrfFetch } from "./csrf"

const GET_COMMENTS = "comments/getComment"
const POST_COMMENT = "comments/postComment"
const UPDATE_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = 'comments/deleteComment'

const getComment = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}

const postComment = (comment) => {
    return {
        type: POST_COMMENT,
        payload: comment
    }
}

const updateComment = (commentId) => {
    return {
        type: UPDATE_COMMENT,
        payload: commentId
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: commentId,
    }
}


//action creators THUNKS

export const gettingComments = () => async (dispatch) => {
    const response = await csrfFetch('/api/comments')
    const data = await response.json()
    dispatch(getComment(data.comments))
    return response;
}

export const updatingComment = (id, comment) => async (dispatch) => {
    const response = await csrfFetch("/api/comments", {
        method: "PATCH",
        body: JSON.stringify({
            commentId: id,
            content: comment,
        }),
    });

    dispatch(updateComment(id, comment));
    return response;
};

export const deletingComment = (commentId) => async (dispatch) => {
    const response = await csrfFetch("/api/comments", {
        method: "DELETE",
        body: JSON.stringify({ commentId }),
    });

    if (response.ok) {
        dispatch(deleteComment(commentId));
    }
    return response;
};

export const postingComment = (content, mgtCardId, userId) => async (
    dispatch
) => {
    const response = await csrfFetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
            userId,
            content,
            mgtCardId
        }),
    });
    const newComment = await response.json();
    dispatch(postComment(newComment));

    return newComment;
};

const initialState = {}
const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = Object.assign({}, state)

            return newState
        case UPDATE_COMMENT:
            newState = Object.assign({}, state)

            return newState
        case POST_COMMENT:
            newState = Object.assign({}, state)

            return newState
        case DELETE_COMMENT:
            return { ...state, update: true }
        default:
            return state

    }

}

export default commentReducer;
