const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { MgtCard } = require("../../db/models")

const router = express.Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const mgtcards = await MgtCard.findAll({
            attributes: ["cardName", "cardImg"]
        })
        return res.json({
            mgtcards,
        })
    })
)

module.exports = router;