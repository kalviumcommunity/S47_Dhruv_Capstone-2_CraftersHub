import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Alert, AlertTitle } from '@mui/material'
import { AccountCircle, Add } from '@mui/icons-material'
const Profile = () => {
  const [userData, setUserData] = useState([])
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [imageIndexes, setImageIndexes] = useState([]);
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    // setNavbarOption('profile')
    const fetchUser = async () => {
      try {
        //Get User
        // let headers = {withCredentials:true}
        const id = localStorage.getItem('id')

        // if(id){
        //   headers['Authorization'] = `Bearer ${id}`
        // }
        const userResponse = await axios.get('http://localhost:9000/login/success', (id) ? {
          headers: {
            'Authorization': `Bearer ${id}`,
          }
        } : { withCredentials: true })

        //Get product
        const productResponse = await axios.get('http://localhost:9000/product')
        const [userDataResponse, productDataResponse] = await Promise.all([userResponse, productResponse]);

        // Extract data from responses
        const userData = userDataResponse.data.user;
        const productData = productDataResponse.data;
        setUserData(userData);
        // Filter product data based on user's username
        const filteredData = productData.filter(item => item.email === userData.username);

        setProduct(filteredData)
        setImageIndexes(filteredData.map(() => 0));
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
    }
    fetchUser()
  }, [])

  console.log("user", userData)
  console.log("filtered", product);

  const countIncrease = (productIndex) => {
    const newIndexes = [...imageIndexes];
    if (newIndexes[productIndex] === product[productIndex].productImg.length - 1) {
      newIndexes[productIndex] = 0;
    } else {
      newIndexes[productIndex]++;
    }
    setImageIndexes(newIndexes);
  };

  const countDecrease = (productIndex) => {
    const newIndexes = [...imageIndexes];
    if (newIndexes[productIndex] === 0) {
      newIndexes[productIndex] = product[productIndex].productImg.length - 1;
    } else {
      newIndexes[productIndex]--;
    }
    setImageIndexes(newIndexes);
  };

  const DeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/product/${id}`)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  if(alert){
    window.addEventListener('click',()=>{
    setAlert(false)
  })}

  const addValidation = () => {
    if (userData.name && userData.contact && userData.address) {
      navigate('/form');
    } else {
      const fdata = async () => {
        await setAlert(true);
      }
      fdata()
    }
  };
  console.log(alert);
  
  return (
    <div>
      <Navbar option='profile' />
      {alert && <Alert severity="error" style={{ fontSize: "3vh", position: 'absolute', left: '11vw', borderRadius: '20px' }}>
        <AlertTitle style={{ fontWeight: '900' }}>Error</AlertTitle>
        Please complete your profile
      </Alert>
      }
      <div className='sm:flex border shadow-[#1976D2] shadow-[1px_1px_5px_3px] my-10 items-center mx-4'>
        {userData.ownerImg && userData.ownerImg.length > 0 ?
          <img
            className='sm:h-[40vh] sm:w-[20vw] rounded-[100%] sm:ml-20 h-[35vh] w-[50vw] mx-auto my-[5vh]'
            src={userData.ownerImg} alt="owner Image" />
          :
          <div className='sm:ml-[10vw] text-center '>
            <AccountCircle
              color='inherit'
              style={{ fontSize: "40vh", color: 'gray', }}
            />
          </div>}
        <div className='flex flex-col my-10 mx-auto justify-center'>
          <span className='sm:text-2xl text-xl font-medium'>Name:- <span className='sm:text-3xl text-xl text-[#001F2B] font-serif font-semibold'>{userData.name}</span></span>
          <br />
          <span className='sm:text-2xl text-xl font-medium'>Email:- <span className='sm:text-3xl text-xl text-[#001F2B] font-serif font-semibold'>{userData.username}</span></span>
          <br />
          <span className='sm:text-2xl text-xl font-medium'>Contact:- <span className='sm:text-3xl text-xl text-[#001F2B] font-serif font-semibold'>{userData.contact ? userData.contact : "-----"}</span></span>
          <br />
          <span className='sm:text-2xl text-xl font-medium'>Address:- <span className='sm:text-3xl text-xl text-[#001F2B] font-serif font-semibold'>{userData.address ? userData.address : "-----"}</span></span>
          <br />
          <div className='mx-auto'>
            <Button
              variant='contained'
              // color=''
              size='large'
              style={{ fontSize: "3vh" }}
              onClick={() => navigate(`/updateProfile/${userData._id}`)}>Edit</Button>
          </div>
        </div>
      </div>
      <br />
      <hr className='h-1 m-4 shadow-[1px_1px_4px_3px] shadow-[#1976D2] rounded-full' />
      {/* History */}
      <h1 className='text-center text-6xl font-serif font-semibold tecxt-[#001F2B]'>History</h1>
      <Button
        variant='contained'
        color='primary'
        size='large'
        style={{ marginLeft: '8vw' }}
        endIcon={<Add />}
        onClick={addValidation}>Add</Button>

      {product.length > 0 ?
        <div>
          {product.map((item, index) => {
            return (
              <div key={item._id} >
                <div>
                  <button onClick={() => countDecrease(index)}>{'<'}</button>
                  <img src={item.productImg[imageIndexes[index]]} alt="ProductImg" />
                  <button onClick={() => countIncrease(index)}>{'>'}</button>
                </div>
                <div>
                  <span>Product name:- <span>{item.productName}</span></span>
                  <br />
                  <span>Price:- <span>{item.price}</span></span>
                  <br />
                  <span>Description:- {item.description}</span>
                  <br />
                  <span>Material:- {item.material}</span>
                  <br />
                  <span>Dimensions:- {item.dimensions}</span>
                  <br />
                  <span>Weight:- {item.weight}</span>
                  <br />
                  {item.stock > 0 ?
                    <h1>{item.stock > 10 ? "In stock" :
                      "Limited stock available"}</h1>
                    // {item.stock > 10 ? <h1></h1> : <h1></h1>}
                    : <h1> Out of stock</h1>}
                  <br />
                  <button onClick={() => navigate(`/updateProduct/${item._id}`)}>Update</button>
                  <button onClick={() => DeleteProduct(item._id)}>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
        : <p>Data not found</p>}
    </div>

  )
}

export default Profile
