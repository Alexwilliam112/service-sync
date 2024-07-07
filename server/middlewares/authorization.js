'use strict'
const { User } = require('../models')

module.exports = (() => {
    class Authorization {

        static async adminAuth(req, res, next) {
            try {
                const { role } = req.loginInfo
                if (role !== 'admin') throw { name: 'Unauthorized' }
                next()

            } catch (err) {
                next(err)
            }
        }
    }

    return Authorization
})()