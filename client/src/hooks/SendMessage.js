import useConversation from "../Zustand/getConversation"
import axios from "axios"
const SendMessage = () => {
    const {messages,selectedConversation, setMessages} = useConversation()
    const sendMessage = async (newMessage,user)=>{
        try {
            const response = await axios.post(`http://localhost:9000/message/send/${selectedConversation._id}`,{
                message: newMessage,
                senderId: user._id
            })
            console.log(response);
            setMessages([...messages,newMessage])
        } catch (error) {
            console.log(error);
        }
    }
    return {sendMessage}
}

export default SendMessage
