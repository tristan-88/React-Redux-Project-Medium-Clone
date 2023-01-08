const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { MgtCard, Comment, AnswerComment } = require("../../db/models")

const router = express.Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const mgtcards = await MgtCard.findAll({
            attributes: ["id", "cardName", "cardImg", "cardId", "cardSet", "cardType", "cardColors", "cardText", "cardManaCost"],
            order: [["cardName", "ASC"]],
            include: {
                model: Comment,
                order:["id", "DESC"],
                include: AnswerComment
            }//nested related information Comment has mgtcardId and AnswerComment has CommentId
        });
        return res.json({
            mgtcards,
        })
    })
)

router.get(
  "/:cardId",
    asyncHandler(async (req, res) => {
        const { cardId } = req.params
        console.log(cardId, " HERE IS CARD ID LINE 30")
        const mgtcard = await MgtCard.findByPk(Number(cardId), {
      attributes: [
        "id",
        "cardName",
        "cardImg",
        "cardId",
        "cardSet",
        "cardType",
        "cardColors",
        "cardText",
        "cardManaCost",
      ],
      include: {
        model: Comment,
        order: [["id", "DESC"]],
        include: AnswerComment,
      }, //nested related information Comment has mgtcardId and AnswerComment has CommentId
        });
        console.log(mgtcard, "MGT CARD OBJECT")
    
        return res.json({
      ...mgtcard.toJSON()
    });
       
  })
);

module.exports = router;
