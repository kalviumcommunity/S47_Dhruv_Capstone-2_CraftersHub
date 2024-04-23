import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const ChatList = () => {
    const [user, setUser] = useState([])
    const [list, setList] = useState([])
    const [fechData, setFetchData] = useState(false)
    const navigate = useNavigate()
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
    }, [fechData])

    return (
        <div>
            <div>
                {user && user.ownerImg && <img src={user.ownerImg[0]} alt="" />}
                {user && user.name && <span>{user.name}</span>}
            </div>
            <div>
                <h1>Available user</h1>
                {list && list.map((item, index) => {
                    return (
                        <div key={index}>
                            <img src={item.ownerImg[0]} alt="" />
                            <p>{item.name}</p>
                            <span>{item.username}</span>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatList
