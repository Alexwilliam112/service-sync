'use strictt'
const admin = require('firebase-admin')
const db = require('../../config/firebaseConfig')

module.exports = (() => {
    class Message {
        static async create({ username, message, roomId }) {
            try {
                await db.collection('Messages').add({
                    username,
                    message,
                    roomId,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                });

                return {
                    username,
                    message,
                    roomId,
                }

            } catch (err) {
                console.log(err)
                throw err
            }
        }

        static async read({ roomId }) {
            try {
                const messagesRef = db.collection('Messages');
                const snapshot = await messagesRef
                    .where('roomId', '==', roomId)
                    .get();

                if (snapshot.empty) {
                    return [];
                }

                const messages = [];
                snapshot.forEach(doc => {
                    messages.push({ id: doc.id, ...doc.data() });
                });

                messages.sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
                return messages;

            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }

    return Message
})()
