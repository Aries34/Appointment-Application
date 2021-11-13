const express = require('express')
const userAuth = require('../middleware/userAuth')
const router = express.Router()

const { createUser, getUser, getUsers, userLogin, userLogout, updateUser, deleteUser } = require('../controllers/userController')
const { addSlot, getSlot, getSlots, updateSlot, deleteSlot } = require('../controllers/slotController')
const { createBook, getBooks } = require('../controllers/bookController')

//User routes
router.route('/api/v1/user').post(createUser)
router.route('/api/v1/user/me').get(userAuth, getUser).patch(userAuth, updateUser).delete(userAuth, deleteUser)
router.route('/api/v1/userLogin').post(userLogin)
router.route('/api/v1/userLogout').post(userAuth, userLogout)


//Slot routes
router.route('/api/v1/slot').post(userAuth, addSlot).get(getSlots)
router.route('/api/v1/slot/:id').get(getSlot).patch(userAuth, updateSlot).delete(userAuth, deleteSlot)

//Book routes
router.route('/api/v1/slot/book/:id').post(userAuth, createBook)
router.route('/api/v1/books').get(userAuth, getBooks)


module.exports = router
