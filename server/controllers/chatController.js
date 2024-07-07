'use strict'
const Message = require('../models/firebase/Messages')
const Room = require('../models/firebase/Rooms')
const { User } = require('../models')

module.exports = (() => {
    class ChatController {

        static async changeAutoreply(req, res, next) {
            try {
                const { changeTo, roomId } = req.body

                await Room.updateAutoreply({ roomId, changeTo })

                res.status(200).json({
                    message: 'Updated autoreply value'
                })

            } catch (err) {
                next(err)
            }
        }

        static async newCase(req, res, next) {
            try {
                const { username } = req.loginInfo
                const { topic } = req.body

                if (!topic) throw { name: 'InvalidInput', ent: 'Topic is required' }
                await Room.create({ username, topic })

                res.status(201).json({
                    message: 'Success Create New Room'
                })

            } catch (err) {
                next(err)
            }
        }

        static async readCases(req, res, next) {
            try {
                const { username, id, role } = req.loginInfo

                const user = await User.findByPk(Number(id))
                if (!user) throw { name: 'NotFound' }

                let data = ''

                if (role === 'admin') {
                    data = await Room.readAll()
                } else {
                    data = await Room.read({ username })
                }

                res.status(200).json({
                    message: 'Success Read All Rooms',
                    data
                })

            } catch (err) {
                next(err)
            }
        }

        static async readChat(req, res, next) {
            try {
                const { roomId } = req.params

                const messages = await Message.read({ roomId })

                if (!messages) throw { name: 'NotFound' }

                res.status(200).json(messages);

            } catch (err) {
                next(err)
            }
        }

        static async postChat(req, res, next) {
            try {
                // const data = await Room.readAll()
                // await Room.create({username: 'alexTest', topic: 'paling baru'})

                res.status(200).json(data)

            } catch (err) {
                next(err)
            }
        }
    }

    return ChatController
})()