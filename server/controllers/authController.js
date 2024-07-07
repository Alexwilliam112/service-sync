'use strict'
const { compare } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { OAuth2Client } = require("google-auth-library");
const { User } = require('../models')

module.exports = (() => {
    class AuthController {

        static async handleLogin(req, res, next) {
            try {
                const { username, password } = req.body
                if (!username || !password) throw { name: "Login400" }

                const user = await User.findOne({
                    where: {
                        username
                    }
                })

                if (!compare(password, user.password)) throw { name: "AccountNotFound" }

                const userData = await User.findOne({
                    where: {
                        username
                    }
                })

                const access_token = signToken({
                    id: userData.id,
                    username: userData.username,
                    role: userData.role
                })

                res.status(200).json({
                    access_token,
                    username: userData.username,
                    role: userData.role
                })

            } catch (err) {
                next(err)
            }
        }

        static async googleOauth(req, res, next) {
            try {
                const { token } = req.headers
                const client = new OAuth2Client();

                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });

                let payload = ticket.getPayload();

                const user = await User.findOrCreate({
                    where: {
                        username: payload.email
                    },
                    defaults: {
                        username: payload.email,
                        password: "password_google_29183y912*(&S("
                    }
                })
                // console.log(user[0].username);
                const userData = await User.findOne({
                    where: {
                        username: user[0].username
                    }
                })

                payload = {
                    id: userData.id,
                    username: userData.username,
                    role: userData.role
                }

                const access_token = signToken(payload)

                res.status(200).json({
                    access_token,
                    username: userData.username,
                    role: userData.role
                })

            } catch (err) {
                next(err)
            }
        }
    }

    return AuthController
})()