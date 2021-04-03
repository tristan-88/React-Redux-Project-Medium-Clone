const express = require("express");
const asyncHandler = require("express-async-handler");
const { AnswerComment } = require("../../db/models");

const router = express.Router();

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const userId = req.body.userId;
        const commentId = req.body.commentId;
        const answer = req.body.answer;

        const answerComment = await AnswerComment.create({
            answer,
            userId,
            commentId,
        });
        const answers = await AnswerComment.findAll({
            where: { commentId }
        });
        return res.json({ answers });
    })
);

router.delete('/',
    asyncHandler(async (req, res) => {
        const answerId = req.body.answerId
        const answer = await AnswerComment.findByPk(answerId)
        await answer.destroy()
        res.json ({msg:"success"})
    })
)

module.exports = router;