const Controller = require('../controllers')

const router = require('express').Router()
const authentication = require('../middlewares/authentication')


router.post("/login", Controller.login)
router.use(authentication)
router.get("/company", Controller.showCompanies)
router.post("/company", Controller.addCompany)
router.post("/transaction", Controller.addTransaction)
router.get("/transaction", Controller.showAllTransaction)
router.get("/item", Controller.showItems)

module.exports = router