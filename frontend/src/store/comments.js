

import { csrfFetch } from "./csrf"

const UPDATE_COMMENT = 'comments/getComment'
const DELETE_COMMENT = 'comments/deleteComment'

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        payload: comment,
    }
}