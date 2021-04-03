const express = require("express");
const asyncHandler = require("express-async-handler");
const { Comment } = require("../../db/models");

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res,next) => {
        const userId = req.body.userId;
        const mgtCardId = req.body.mgtCardId;
        const content = req.body.content;
        const comment = await Comment.create({
            content,
            userId,
            mgtCardId,
        });
        const comments = await Comment.findAll({
            where: { mgtCardId }
        });
        return res.json({ comments });
    })
);

router.delete('/',
    asyncHandler(async (req, res) => {
        const commentId = req.body.commentId
        const comment = await Comment.findByPk(commentId)
        await comment.destroy()
        res.json({msg:"success"})
})
)

module.exports = router;