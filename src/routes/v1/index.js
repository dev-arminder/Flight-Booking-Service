const expres = require('express');
const router = expres.Router();

const { InfoController } = require('../../controller/index')

router.get('/info', InfoController.info)

module.exports = router