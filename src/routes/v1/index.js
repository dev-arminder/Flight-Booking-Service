const expres = require('express');
const router = expres.Router();

const { HomeController } = require('../../controller/index')

router.get('/info', HomeController.info)

module.exports = router