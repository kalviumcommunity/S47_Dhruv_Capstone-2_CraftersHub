import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useConversation from '../Zustand/getConversation'
import SendMessage from '../hooks/SendMessage'
import getMessages from '../hooks/getMessages'

const ChatList = () => {
    const [user, setUser] = useState([])
    const [list, setList] = useState([])
    const [newMessage,setNewMessage] = useState('')
    const [fechData, setFetchData] = useState(false)
    const navigate = useNavigate()
    const {selectedConversation, setSelectedConversation} = useConversation()
    const {sendMessage} = SendMessage()
    const {messages}= getMessages(user)
    const lastMessageRef = useRef()
    console.log("messages",messages);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const id = localStorage.getItem('id')

                const response = await axios.get('http://localhost:9000/login/success', (id) ? {
                    headers: {
                        'Authorization': `Bearer ${id}`,
                    }
                } : { withCredentials: true })
                console.log("response", response);
                setFetchData(true)
                setUser(response.data.user)
            } catch (error) {
                console.log(error);
                navigate('/error')
            }
        }
        console.log(user._id);

        const fetchList = async () => {
            try {
                const list = await axios.get('http://localhost:9000/getOtherUser', {
                    params: {
                        senderId: user._id
                    }
                })
                console.log(list);
                setList(list.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchList()

        fetchUser()

        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [fechData,messages])

    const OnsubmitBtn = async (e)=>{
        e.preventDefault()
        if(!newMessage) return
        await sendMessage(newMessage,user)
        setNewMessage("")
    }

    function padzero(number){
        return number.toString().padStart(2,0)
    }
    const abstractTime = (number)=>{
        const date = new Date(number)
        const hour = padzero(date.getHours())
        const min = padzero(date.getMinutes())
        return `${hour}:${min}`
    }
    return (
        <div>
            <div>
                {user && user.ownerImg && <img src={user.ownerImg[0]} alt="" />}
                {user && user.name && <span>{user.name}</span>}
            </div>
            <div>
                <h1>Available user</h1>
                {list && list.map((item) => {
                    return (
                        <div key={item._id} onClick={() => setSelectedConversation(item)} style={{ color: selectedConversation && selectedConversation._id === item._id ? 'blue' : 'black' }}>
                            <img src={item.ownerImg[0]} alt="" />
                            <p>{item.name}</p>
                            <span>{item.username}</span>
                            <hr />
                        </div>
                    )
                })}
            </div>
            <hr />
            <hr />
            {!selectedConversation?
            <div>
                Please select the person for start conversation
            </div>:
            <div>
                <h1>{selectedConversation.name}</h1>
                <p>{selectedConversation.username}</p>
                <div>
                {messages.length<1 ? <h2>{`Start the conversation with ${selectedConversation.name}`}</h2>:
                <div>
                   {messages.map((message,index)=>{
                    return(
                        <div key={index} ref={lastMessageRef}>
                            <p style={message.senderId == user._id ?
                            {backgroundColor:"blue",color:"white",textAlign:'right',fontSize:'5vh'}:
                            {backgroundColor:'grey',color:"white",textAlign:"left",fontSize:'5vh'}}
                            >{message.message}
                            </p>
                            <p style={message.senderId == user._id ?
                            {textAlign:'right'}:
                            {textAlign:"left"}}>{abstractTime(message.createdAt)}</p>
                            <hr style={{height:'2px'}}/>
                        </div>
                    )
                    })} 
                </div>}
                </div>
                <br />
                <form onSubmit={(e)=>OnsubmitBtn(e)}>
                 <input type="text" value={newMessage} placeholder='Enter message' onChange={(e)=>setNewMessage(e.target.value)}/>
                 <button>Send</button>
                </form>
            </div>
        }
        </div>
    )
}

export default ChatList
