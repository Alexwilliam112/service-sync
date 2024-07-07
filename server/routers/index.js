'use strict'
const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')
const { errorHandler } = require('../middlewares/errorHandler')
const AuthController = require('../controllers/authController.js')
const ChatController = require('../controllers/chatController.js')

router.post("/login", AuthController.handleLogin)
router.post("/google-login", AuthController.googleOauth)

router.post('/chat-post', ChatController.postChat) // ENDPOINT FOR TESTING

router.use(authentication)
router.post('/cases', ChatController.newCase)
router.post('/autoreply', ChatController.changeAutoreply)
router.get('/cases', ChatController.readCases)
router.get('/chat-history/:roomId', ChatController.readChat)

router.use(errorHandler)

module.exports = router