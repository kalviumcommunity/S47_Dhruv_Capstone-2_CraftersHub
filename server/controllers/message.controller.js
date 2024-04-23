const { Conversation } = require('../models/conversation.model')
const { Message } = require('../models/message.model')
const { userModel } = require('../models/user.model')
class Messages {

    //post send message
    static sendMessage = async (req, res) => {
        try {

            const { message, senderId } = req.body
            const { id: receiverId } = req.params

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            })

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId]
                })
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                message
            })

            if (newMessage) {
                conversation.message.push(newMessage._id);
            }

            //Socket io functionality here

            await Promise.all([conversation.save(), newMessage.save()])

            res.json(newMessage)

        } catch (error) {
            res.status('400').json({ error })
        }
    }

    //Get message

    static GetMessage = async (req, res) => {
        try {
            const { senderId } = req.body
            const { id: userToSendId } = req.params

            const conversation = await Conversation.findOne({
                participants: { $all: [senderId, userToSendId] }
            }).populate("message")

            if (!conversation) res.json([])

            const messages = conversation.message

            res.json(messages)
        } catch (error) {
            console.log(error);
        }
    }

    
}


module.exports = Messages