const express = require('express')
const router = express.Router()

const MeController = require('../app/controllers/MeController')

router.get('/store-rappers', MeController.storeRappers)
router.get('/trash-rappers', MeController.trashRappers)

module.exports = router