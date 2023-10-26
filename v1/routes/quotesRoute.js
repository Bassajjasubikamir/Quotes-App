const express = require("express")
const router = express.Router()
const quotesController = require("../controllers/quote")

router.get("/",quotesController.getAllQuotes)
router.post("/",quotesController.createQuote)
router.get("/:id",quotesController.getOneQuote)
router.put("/:id",quotesController.updateQuote)
router.delete("/:id",quotesController.deleteQuote)

module.exports = router
