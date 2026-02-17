const express = require('express')
const questionnerController = require("../controller/questionnerController")
const router = express.Router()

// Questionner
router.get("/get-all-questionners",questionnerController.getAllGroupQuestionner)

router.post("/add-group_questionner",questionnerController.addGroupQuestionner)
router.post("/add-questionner",questionnerController.addQuestionner)

router.post("/answer",questionnerController.addAnswers)

module.exports = router