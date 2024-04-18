import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BookPage = () => {
    const { id } = useParams()
    const [product, setData] = useState([])
    const [imgIndex, setIndex] = useState(0)
    const [user, setUser] = useState([])
    
    const navigate = useNavigate()
    useEffect(() => {
        setIndex(0)
        const fetchData = async () => {
            try {
                const responnse = await axios.get(`http://localhost:9000/product/${id}`)
                // console.log(responnse);
                setData(responnse.data)
                console.log(product);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchUser = async () => {
            try {
                let headers = { withCredentials: true }
                const id = localStorage.getItem('id')

                if (id) {
                    headers['Authorization'] = `Bearer ${id}`
                }
                const response = await axios.get('http://localhost:9000/login/success', { headers })
                // console.log("response");
                // setUser()
            } catch (error) {
                console.log(error);
                navigate('/error')
            }
        }

        const fetchOwner = async()=>{
            try {
                const owner = await axios('http://localhost:9000/user')
                console.log("Owner",owner.data);
                console.log("product data",product.email);
                const actualUser = owner.data.filter((item)=>item.username === product.email)
                console.log("actual user",actualUser);
                setUser(actualUser[0])
            } catch (error) {
                console.log(error); 
            }
        }
        Promise.all([fetchUser(), fetchData(), fetchOwner()]).then(() => {
            // All functions have completed execution
            console.log("All functions executed successfully");
        }).catch((error) => {
            console.log("Error occurred:", error);
        });

    }, [])

    console.log(user[0]);
    const handelPayment = async () => {
        // navigate('/payment',{state:{price : data.price}})
        try {
            const response = await axios.post('http://localhost:9000/product/payment', {
                price: data.price
            })
            console.log(response.data.order.amount);
            const options = {
                amount: data.price && data.price,
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                currency: "INR",
                name: "Crafters hub",
                description: "Crafters hub",
                image: "https://res.cloudinary.com/dhruv1184/image/upload/v1712914306/uyumc8u8kp4zihunsb2c.png",
                order_id: response.data.order.id,
                callback_url: "http://localhost:9000/product/paymentVerification",
                prefill: {
                    "name": user.name,
                    "email": user.username,
                    "contact": user.contact
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#528FF0"
                }
            };

            const razor = new window.Razorpay(options)
            razor.open()
        } catch (error) {
            console.log(error);
        }
    }

    const countIncrease = () => {
        setIndex(prevIndex => {
            if (prevIndex === product.productImg.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    };

    const countDecrease = () => {
        setIndex(prevIndex => {
            if (prevIndex === 0) {
                return product.productImg.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
    };

    return (
        <div>
            <div>
                <h1>Booking</h1>
                <div>
                    <button onClick={() => countDecrease()}>{'<'}</button>
                    <img src={product.productImg && product.productImg[imgIndex]} alt="" />
                    <button onClick={() => countIncrease()}>{'>'}</button>
                </div>
                <div>
                    <span>Product name:- <span>{product.productName}</span></span>
                    <br />
                    <span>Price:- Rs. <span>{product.price}</span></span>
                    <br />
                    <span>Description:- {product.description}</span>
                    <br />
                    <span>Material:- {product.material}</span>
                    <br />
                    <span>Dimensions:- {product.dimensions}</span>
                    <br />
                    <span>Weight:- {product.weight}</span>
                    <br />
                    <span>Category:- {product.category}</span>
                    <br />
                    <span>Material:- {product.material}</span>
                    <br />
                    {user.address && <span>Product manufacture:- <span>{user.address}</span></span>}

                    {product.stock > 0 ?
                        <h1>{product.stock > 10 ? "In stock" :
                            "Limited stock available"}</h1>
                        : <h1> Out of stock</h1>}
                    <br />
                    <button onClick={() => handelPayment()}>Buy now</button>
                </div>
            </div>
            <div>
                <h1>Dealer information</h1>
                <div>
                    <img src={user.ownerImg && user.ownerImg[0]} alt="Owner image" />
                    <div>
                        {user.name && <span>Owner name:- <span>{user.name}</span></span>}
                        <br />
                        {user.username && <span>Email:- <span>{user.username}</span></span>}
                        <br />
                        {user.contact && <span>Contact no.:- <span>{user.contact}</span></span>}
                        <br />
                        <button>Start chat</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookPage
