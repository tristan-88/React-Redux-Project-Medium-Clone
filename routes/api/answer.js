const express = require("express");
const asyncHandler = require("express-async-handler");
const { AnswerComment } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const answers = await AnswerComment.findAll({
			attributes: ["id", "content", "userId", "mgtCardId"],
		});
		return res.json({
			answers,
		});
	})
);

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const userId = req.body.userId;
        const commentId = req.body.commentId;
        const answer = req.body.answer;
         await AnswerComment.create({
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

router.patch('/',
    asyncHandler(async (req, res) => {
			const answerId = req.body.answerId;//answerId
			const answer = req.body.answer; //answer
			const answerComment = await AnswerComment.findByPk(answerId);
			answerComment.answer = answer;
			answerComment.save();

			return res.json({ msg: "Thank you Joshy!" });

			//test:window.csrfFetch("/api/answers", {method:"PATCH", body:JSON.stringify({brownPoop: "Poopie-paluza" , pinkPoop:1})}).then(res => res.json()).then(data => console.log(data))
		}))

router.delete('/',
    asyncHandler(async (req, res) => {
        const answerId = req.body.answerId
        const answer = await AnswerComment.findByPk(answerId)
        await answer.destroy()
        res.json ({msg:"success"})
    })
)

module.exports = router;