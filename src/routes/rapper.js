const express = require('express')
const router = express.Router()

const RapperController = require('../app/controllers/RapperController')

router.get('/create', RapperController.create)
router.post('/store', RapperController.store)
router.get('/:slug/edit', RapperController.edit)
router.put('/:slug/update', RapperController.update)
router.patch('/:slug/restore', RapperController.restore)
router.post('/handle-all', RapperController.handleAll)
router.delete('/:slug/delete', RapperController.delete)
router.delete('/:slug/force-delete', RapperController.forceDelete)
router.get('/:slug', RapperController.show)

module.exports = router