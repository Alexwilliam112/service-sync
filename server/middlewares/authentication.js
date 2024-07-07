'use strict'
const { verifyToken } = require('../helpers/jwt')

module.exports = {
    authentication: async (req, res, next) => {
        try {
            const { authorization } = req.headers
            if (!authorization) throw { name: 'Unauthorized' }

            const access_token = authorization.split(' ')[1]
            const payload = verifyToken(access_token)

            req.loginInfo = {
                id: payload.id,
                username: payload.username,
                role: payload.role
            }
            
            next()

        } catch (err) {
            next(err)
        }
    }
}