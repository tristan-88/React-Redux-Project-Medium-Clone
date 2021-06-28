const express = require("express");
const asyncHandler = require("express-async-handler");
const { Comment } = require("../../db/models");

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const comments = await Comment.findAll({
            attributes: ['id', "content", "userId", "mgtCardId"],
            order:[["id", "DESC"]],
        });
        return res.json({
            comments,
        });
    })
);

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
        // const comments = await Comment.findAll({
        //     where: { mgtCardId }
        // });
        return res.json({ comment });
    })
);

router.patch('/',
    asyncHandler(async (req, res) => {
        const commentId = req.body.commentId
        const content = req.body.content
        const comment = await Comment.findByPk(commentId)

        comment.content = content
        await comment.save()

        res.json({msg:"success Hi mimi!"})
}))

router.delete('/',
    asyncHandler(async (req, res) => {
        const commentId = req.body.commentId
        const comment = await Comment.findByPk(commentId)
        await comment.destroy()
        res.json({msg:"success"})
})
)

module.exports = router;