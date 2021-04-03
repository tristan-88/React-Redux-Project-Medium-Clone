const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { MgtCard, Comment, AnswerComment} = require("../../db/models")

const router = express.Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const mgtcards = await MgtCard.findAll({
					attributes: ["id","cardName", "cardImg", "cardId","cardSet","cardType","cardColors","cardText","cardManaCost" ],
					order: [["cardName", "ASC"]],
            include: { model: Comment, include:AnswerComment }//nested related information Comment has mgtcardId and AnswerComment has CommentId
				});
        return res.json({
            mgtcards,
        })
    })
)

module.exports = router;