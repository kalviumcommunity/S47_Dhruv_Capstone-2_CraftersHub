import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import home from '../css/Home.module.css'
import Navbar from './Navbar'
const Product = () => {
    const [Data, setData] = useState([])
    const [imageIndexes, setImageIndexes] = useState([]);
    const [error, setError] = useState('')
    const [userData,setUserData]=useState([])
    const navigate = useNavigate()
    const fetchUser =async ()=>{
        try {
            const response = await axios.get('http://localhost:9000/login/success',{withCredentials:true})
            console.log("response",response);
            setUserData(response)
        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    }
    console.log(userData);
    useEffect(() => {

        const fetchData = async () => {
            setError('')
            try {
                const res = await axios.get('http://localhost:9000/product',{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": localStorage.getItem('email')
                    }
                })
                setData(res.data)
                setImageIndexes(res.data.map(() => 0));
            } catch (error) {
                setError(error.response.data);

            }
        }
        fetchUser()
        fetchData()
    }, [])
    console.log(Data);
    console.log(error);


    const countIncrease = (productIndex) => {
        const newIndexes = [...imageIndexes];
        if (newIndexes[productIndex] === Data[productIndex].productImg.length - 1) {
            newIndexes[productIndex] = 0;
        } else {
            newIndexes[productIndex]++;
        }
        setImageIndexes(newIndexes);
    };

    const countDecrease = (productIndex) => {
        const newIndexes = [...imageIndexes];
        if (newIndexes[productIndex] === 0) {
            newIndexes[productIndex] = Data[productIndex].productImg.length - 1;
        } else {
            newIndexes[productIndex]--;
        }
        setImageIndexes(newIndexes);
    };

    return (
        <div>
            {error ? 
            <div>
            <h1>{error}</h1>
            </div> :
                <div className={home.body}>
                    <Navbar />
                    <h1>Home</h1>
                    {Data.map((item, index) => {
                        return (
                            <div key={item._id} className={home.box}>
                                <div>
                                    <button onClick={() => countDecrease(index)}>{'<'}</button>
                                    <img src={item.productImg[imageIndexes[index]]} alt="" className={home.img} />
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
                                    <button>Buy Now</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Product
