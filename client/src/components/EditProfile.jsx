import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const EditProfile = () => {
    const [name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [ownerImg, setOwnerImg] = useState(null)
    const [ownerImgPreview, setOwnerImgPreview] = useState(null);
    const navgate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        const getData = async () => {
            try {
                console.log(id);
                const profile = await axios.get(`http://localhost:9000/update/${id}`)
                console.log(profile);
                setName(profile.data.name)
                setEmail(profile.data.username)
                setContact(profile.data.contact ? profile.data.contact : '')
                setAddress(profile.data.address ? profile.data.address : '')
                setOwnerImg(profile.data.ownerImg[0] ? profile.data.ownerImg[0] : null)
            } catch (error) {
                console.log(error);
            }

        }

        
        getData()
    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setOwnerImg(file)
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            console.log("image",imageUrl);
            setOwnerImgPreview(imageUrl); 
        };
        reader.readAsDataURL(file);
    }

    const handelUpdate = (e) => {
        e.preventDefault()

        if(contact.length == 10 || contact.length==0){
            const formData = new FormData()
            formData.append('name', name)
            formData.append('username', Email)
            formData.append('contact', contact)
            formData.append('address', address)
        // formData.append('ownerImg',ownerImg[0]? ownerImg[0]:profile.data.ownerImg[0])
        if (ownerImg) {
            formData.append('ownerImg', ownerImg)
        }

        axios.put(`http://localhost:9000/update/${id}`, formData)
            .then((res) => {
                console.log(res);
                navgate('/profile')
            }).catch((err) => {
                console.log(err);
            })
        }else{
            alert("Contact no. must be valid")
        }
    }
    return (
        <div>
            <h1>Update profile</h1>
            <form encType="multipart/form-data">
                <div>
                    <label htmlFor="name">Name:-</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
                </div>
                <div>
                    <label htmlFor="email">Email:-</label>
                    <input type="text" name='email' value={Email} readOnly />
                </div>
                <div>
                    <label htmlFor="contact">Contact:-</label>
                    <input type="number" name='contact' value={contact} placeholder='Enter your contact no.' onChange={(e) => setContact(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="address">Addess:-</label>
                    <input type="text" name='address' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter your address' />
                </div>
                <div>
                    <label htmlFor="ownerImg">Your image</label>
                    {ownerImg && <img src={ownerImgPreview ? ownerImgPreview : ownerImg} alt="ownerImg" />}
                    <input type="file" name="ownerImg" onChange={handleFileChange} />
                </div>
                <button onClick={handelUpdate}>Update</button>
                <button onClick={() => navgate('/profile')}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProfile
