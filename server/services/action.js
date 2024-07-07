'use strict'
const { Order } = require('../models')
const Room = require('../models/firebase/Rooms')
const Filter = require('./filter')
const { AutoReply } = require('./openAI')

class Action {

    static rejectMessage() {
        return 'Reject template'
    }

    static async priorityFlag(roomId) {
        try {
            const reply = `Mohon tunggu bapak/ibu, supervisor kami akan segera mengambil alih kasus ini`

            await Room.updateAutoreply({ roomId, changeTo: false })
            return reply

        } catch (err) {
            return `Err`
        }
    }

    static async queryOrder(message) {
        try {
            let orderId
            const orderNumberPattern = /\bORD-\d{6}\b/;
            orderId = message.match(orderNumberPattern);

            const orderData = await Order.findOne({
                where: {
                    orderId
                }
            })

            const reply = `Order dengan nomor ${orderData.orderId} milik bapak/ibu ${orderData.name} saat ini sedang pada tahap ${orderData.status}`

            if(!orderData) return `Maaf, nomor order yang bapak/ibu berikan tidak terdaftar pada sistem kami, mohon dibantu periksa kembali`
            return reply

        } catch (err) {
            console.log(err);
            return 'none'
        }
    }

    static answerTemplate() {
        return `Terkait order yang ingin di inquire oleh bapak/ibu, apakah boleh dilampirkan nomor ordernya`
    }
}

module.exports = async function Core({ message, roomId }) {
    try {

        if (Filter.isAskingOrder(message)) return Action.answerTemplate()
        if (Filter.isQueryingOrder(message)) return await Action.queryOrder(message)
        if (Filter.isAngry(message)) return await Action.priorityFlag(roomId)

        const gptReply = await AutoReply(message)
        return gptReply

    } catch (err) {
        console.log(err);
        return `Mohon tunggu,...`
    }
}