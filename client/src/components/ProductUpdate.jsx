import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import form from '../css/form.module.css'
const ProductUpdate = () => {
    const { id } = useParams()
    const [user,setuser] = useState([])
    const navigate = useNavigate()
    const [productName, setProductName] = useState("")
    const [category, setCategory] = useState("")
    const [material, setMaterial] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [height, setHeight] = useState("")
    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [dimenstionUnit, setDimenstionUnit] = useState("")
    const [weight, setWeigth] = useState("")
    const [weightUnit, setWeightUnit] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:9000/login/success', { withCredentials: true })
                setuser(response.data.user)
            } catch (error) {
                console.log(error);
                navigate('/error')
            }
        }
        const productData = async () => {
            try {
                const productData = await axios.get(`http://localhost:9000/product/${id}`)
                console.log(productData.data);
                setProductName(productData.data.productName)
                setCategory(productData.data.category)
                setMaterial(productData.data.material)
                setDescription(productData.data.description)
                setPrice(productData.data.price)
                setStock(productData.data.stock)
                setHeight(productData.data.dimensions.split(' x ')[0])
                setLength(productData.data.dimensions.split(' x ')[1])
                setWidth(productData.data.dimensions.split(' x ')[2].split(' ')[0])
                setDimenstionUnit(productData.data.dimensions.split(' x ')[2].split(' ')[2].split(')')[0])
                setWeigth(productData.data.weight.split(' ')[0])
                setWeightUnit(productData.data.weight.split(' ')[1])

            } catch (error) {
                console.log(error);
            }
        }
        fetchUser()
        productData()

    }, [])
    const  onSubmtBtn = (e)=>{
        e.preventDefault()

        axios.put(`http://localhost:9000/product/update/${id}`,{
            productName,
            category,
            material,
            description,
            price,
            stock,
            dimensions:`${height} x ${length} x ${width} (in ${dimenstionUnit})`,
            weight: `${weight} ${weightUnit}`,
            email: user.username
        }).then((res)=>{
            console.log(res);
            alert("data updated")
            navigate('/profile')
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div className={form.body}>
            <div className={form.form}>
                <h1>Update data</h1>
                <form  method="post" encType="multipart/form-data">
                    <div className={form.inputbox}>
                        <label htmlFor="productName">Product name:- </label>
                        <input
                            type="text"
                            id='productName'
                            className={form.inputs}
                            name='productName'
                            placeholder='Enter product name'
                            value={productName}
                            onChange={(e)=>setProductName(e.target.value)}
                        />
                    </div>
                    <div className={form.inputbox}>
                        <label htmlFor="category">Product category:- </label>
                        <select name="category" id="category" className={form.inputs} value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose category</option>
                            <option value="jewellery">Jewellery</option>
                            <option value="miniature">Miniature</option>
                            <option value="textile">Textiles</option>
                            <option value="homedecore">Home Decore</option>
                            <option value="art">Art & Illustion</option>
                            <option value="pottery">Pottery</option>
                        </select>
                    </div>
                    <div className={form.inputbox}>
                        <label htmlFor="material">Product material:- </label>
                        <select name="material" id="material" className={form.inputs} value={material} onChange={(e)=>setMaterial(e.target.value)}>
                            <option value="">Choose material</option>
                            <option value="glass">Glass</option>
                            <option value="stones">Stones</option>
                            <option value="wooden">Wooden</option>
                            <option value="cotton">Cotton</option>
                            <option value="wool">Wool</option>
                            <option value="metal">Metal</option>
                            <option value="leather">Leather</option>
                            <option value="paper">Paper</option>
                            <option value="clay">Clay</option>
                            <option value="cardboard">Cardboard</option>
                        </select>
                    </div>
                    <div className={form.inputbox}>
                        <label htmlFor="description">Product description:- </label>
                        <input
                            type="text"
                            id='description'
                            className={form.inputs}
                            name='description'
                            placeholder='Enter product description'
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                    <div className={form.inputbox}>
                        <label htmlFor="price">Price (in Rs):- </label>
                        <input
                            type="number"
                            id='price'
                            name='price'
                            className={form.inputs}
                            placeholder='Enter Price'
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                        />
                    </div>
                    <div className={form.inputbox}>
                        <label htmlFor="stock">Available Stock:- </label>
                        <input
                            type="number"
                            id='stock'
                            name='stock'
                            className={form.inputs}
                            placeholder='Available stock'
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)}
                        />
                    </div>
                    <div className={form.inputbox}>
                        <label htmlFor="height">Dimensions:- </label>
                        <div>
                            <input
                                type="number"
                                id='height'
                                className={form.input}
                                name='height'
                                placeholder='Height'
                                value={height}
                                onChange={(e)=>setHeight(e.target.value)}
                            />
                            {/* <br /> */}
                            <input
                                type="number"
                                id='length'
                                className={form.input}
                                name='length'
                                placeholder='Length'
                                value={length}
                                onChange={(e)=>setLength(e.target.value)}
                            />
                            {/* <br /> */}
                            <input
                                type="number"
                                id='weidth'
                                className={form.input}
                                name='width'
                                placeholder='Width'
                                value={width}
                                onChange={(e)=>setWidth(e.target.value)}
                            />
                            {/* <br /> */}
                            <select name="dimenstionUnit" id="stock" className={form.input} value={dimenstionUnit} onChange={(e)=>setDimenstionUnit(e.target.value)}>
                                <option value="">Choose unit</option>
                                <option value="cm">centimeter</option>
                                <option value="m">meter</option>
                                <option value="mm">millimeter</option>
                                <option value="inch">inch</option>
                                <option value="foot">foot</option>
                            </select>
                        </div>
                    </div>
                    <div className={form.inputbox}>
                        <label htmlFor="weight">Weight:- </label>
                        <div>
                            <input
                                type="number"
                                id='weight'
                                name='weight'
                                className={form.input}
                                placeholder='weight'
                                value={weight}
                                onChange={(e)=>setWeigth(e.target.value)}
                            />
                            {/* <br /> */}
                            <select name="weightUnit" id="weight" className={form.input} value={weightUnit} onChange={(e)=>setWeightUnit(e.target.value)}>
                                <option value="">Choose weight unit</option>
                                <option value="gm">gm</option>
                                <option value="Kg">Kg</option>
                            </select>
                        </div>
                    </div>

                    <button type='submit' className={form.submitbtn} onClick={(e)=>onSubmtBtn(e)}>Update</button>
                    <button className={form.submitbtn} onClick={()=>navigate('/profile')}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default ProductUpdate
