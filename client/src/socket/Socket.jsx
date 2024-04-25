import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'
import axios from "axios";

export const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [run, setRun] = useState(false)
  const [onlineUser, setOnlineUser] = useState([])
  const [user, setUser] = useState(null)
  const fetchUser = async () => {
    try {
      const id = localStorage.getItem('id')

      const response = await axios.get('http://localhost:9000/login/success', (!id) ? { withCredentials: true } : {
        headers: {
          'Authorization': `Bearer ${id}`,
        }
      })
      setUser(response.data.user)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUser()

  },[])
  useEffect(() => {
    if (user) {
      const socket = io('http://localhost:9000', {
        query: {
          userId: user._id
        }
      })
      console.log("socket", socket);
      setRun(true)
      socket.on('getOnlineUSer', (users) => {
        setOnlineUser(users)
      })

      setSocket(socket)

      return () => socket.close()
    } else {
      setSocket(null)
      setOnlineUser([])
      // if (socket) {
      //   socket.close()
      //   setSocket(null)
      // }
    }

  }, [user,run])
  return <SocketContext.Provider value={{ socket, onlineUser }}>{children}</SocketContext.Provider>
}