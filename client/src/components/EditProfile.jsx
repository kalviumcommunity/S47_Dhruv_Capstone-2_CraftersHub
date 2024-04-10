import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const EditProfile = () => {
    const [Name,setName] = useState('')
    const [Email,setEmail] = useState('')
    const [Contact, setContact] = useState('')
    const [Address,setAddress] = useState('')
    const [ownerImg,setOwnerImg] = useState([])
    const navgate = useNavigate()
    const {id} = useParams()
    useEffect(()=>{
        const getData = async ()=>{
            try {
                console.log(id);
                const profile =await axios.get(`http://localhost:9000/update/${id}`)
                console.log(profile);
                setName(profile.data.name)
                setEmail(profile.data.username)
                setContact(profile.data.contact?profile.data.contact:'')
                setAddress(profile.data.address?profile.data.address:'')
                setOwnerImg(profile.data.ownerImg[0]?profile.data.ownerImg[0]:'')                
            } catch (error) {
                console.log(error);
            }

        }
        getData()
    },[])

    const handelUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:9000/update/${id}`,{
            
        })
    }
  return (
    <div>
      <h1>Update profile</h1>
      <form method="put" encType="multipart/form-data">
        <div>
            <label htmlFor="name">Name:-</label>
            <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' />
        </div>
        <div>
            <label htmlFor="email">Email:-</label>
            <input type="text" name='email' value={Email} readOnly/>
        </div>
        <div>
            <label htmlFor="contact">Contact:-</label>
            <input type="text" name='contact' value={Contact} placeholder='Enter your contact no.' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="address">Addess:-</label>
            <input type="text" name='address' value={Address} onChange={(e)=>setAddress(e.target.value)} placeholder='Enter your address' />
        </div>
        <div>
            <label htmlFor="ownerImg">Name:-</label>
            {ownerImg?
            <div>
                <img src={ownerImg} alt="ownerImg" /> 
                <input type="file" name='ownerImg' />
            </div>:
                <input type="file" name="ownerImg" />
            }
        </div>
        <button onClick={handelUpdate}>Update</button>
        <button onClick={()=>navgate('/profile')}>Cancel</button>
      </form>
    </div>
  )
}

export default EditProfile
