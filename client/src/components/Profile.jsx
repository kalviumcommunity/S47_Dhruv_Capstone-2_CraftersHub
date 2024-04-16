import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import home from '../css/Home.module.css'
const Profile = () => {
  const [userData, setUserData] = useState([])
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [imageIndexes, setImageIndexes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //Get User
        const userResponse = await axios.get('http://localhost:9000/login/success', { withCredentials: true })

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

  return (
    <div>
      <Navbar />
      <div>
        <img src={userData.ownerImg} alt="owner Image" />
        <div>
          <span>Name:- <span>{userData.name}</span></span>
          <br />
          <span>Email:- <span>{userData.username}</span></span>
          <br />
          <span>Contact:- <span>{userData.contact ? userData.contact : "-----"}</span></span>
          <br />
          <span>Address:- <span>{userData.address ? userData.address : "-----"}</span></span>
          <br />
          <button onClick={() => navigate(`/updateProfile/${userData._id}`)}>Edit</button>
        </div>
      </div>
      <br />
      <hr />
      {/* History */}
      <h1>History</h1>
      <button onClick={() => navigate('/form')}>Add</button>
      {product.length > 0 ?
        <div>
          {product.map((item, index) => {
            return (
              <div key={item._id} className={home.box}>
                <div>
                  <button onClick={() => countDecrease(index)}>{'<'}</button>
                  <img src={item.productImg[imageIndexes[index]]} alt="ProductImg" className={home.img} />
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
                  <button onClick={()=>navigate(`/updateProduct/${item._id}`)}>Update</button>
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
