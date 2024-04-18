import React from 'react'
import { useFormik } from 'formik'
import { ValidationSchemaForm } from '../Validation/formValidation'
import axios from 'axios'
import { useState,useEffect } from 'react'
import form from '../css/form.module.css'
import { useNavigate } from 'react-router-dom'
const initialValues = {
    productName: '',
    category: '',
    material: '',
    description: '',
    price: '',
    stock: '',
    height: '',
    length: '',
    width: '',
    dimenstionUnit: '',
    weight: '',
    weightUnit: '',
    productImg: [],
    ownerImg: []
}

const Form = () => {
    const [user,setUserData] = useState([])
    const navigate = useNavigate()

    const fetchUser =async ()=>{
        try {
            let headers = {withCredentials:true}
        const id = localStorage.getItem('id') 

        if(id){
          headers['Authorization'] = `Bearer ${id}`
        }
            const response = await axios.get('http://localhost:9000/login/success',{headers})
            console.log("response",response);
            setUserData(response.data.user)
        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    }
    console.log(user);
    useEffect(()=>{
        fetchUser()
    },[])
    const { values, handleSubmit, errors, touched, handleChange, setFieldValue } = useFormik({
        initialValues,
        validationSchema: ValidationSchemaForm,
        onSubmit: async (values) => {
            console.log(values);
            const formData = new FormData()
            formData.append('productName', values.productName)
            formData.append('category', values.category)
            formData.append('material', values.material)
            formData.append('description', values.description)
            formData.append('price', values.price)
            formData.append('stock', values.stock)
            formData.append('dimensions', `${values.length} x ${values.width} x ${values.height} (in ${values.dimenstionUnit})`)
            formData.append('weight', `${values.weight} ${values.weightUnit}`)
            formData.append('email',user.username)
            values.productImg.forEach((img, index) => {
                formData.append(`productImg`, img)
            })
            values.ownerImg.forEach((img, index) => {
                formData.append(`ownerImg`, img)
            })


            try {
                console.log(formData);
                formData.forEach((value, key) => {
                    console.log(`${key}: ${value}`);
                });
                const respose = await axios.post('http://localhost:9000/product/insert', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                alert("Data added successfully")
                navigate('/profile')
                console.log(respose);
            } catch (error) {
                console.log(error);
            }
        }
    })
    // console.log(errors);
    const handelFileChange = (event) => {
        const files = event.currentTarget.files
        const fileData = Array.from(files)
        console.log(fileData[0]);
        setFieldValue(event.target.name, [...values[event.target.name], ...fileData])
    }
    // console.log(values);
    return (
        <div className={form.body}>
            <div className={form.form}>
                <h1>Form</h1>
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                    <div className={form.inputbox}>
                        <label htmlFor="productName">Product name:- </label>
                        <input
                            type="text"
                            id='productName'
                            className={form.inputs}
                            name='productName'
                            placeholder='Enter product name'
                            value={values.productName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.productName && touched.productName ? <p className={form.error}>{errors.productName}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="category">Product category:- </label>
                        <select name="category" id="category" value={values.category} onChange={handleChange} className={form.inputs}>
                            <option value="">Choose category</option>
                            <option value="jewellery">Jewellery</option>
                            <option value="miniature">Miniature</option>
                            <option value="textile">Textiles</option>
                            <option value="homedecore">Home Decore</option>
                            <option value="art">Art & Illustion</option>
                            <option value="pottery">Pottery</option>
                        </select>
                    </div>
                    {errors.category && touched.category ? <p className={form.error}>{errors.category}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="material">Product material:- </label>
                        <select name="material" id="material" value={values.material} onChange={handleChange} className={form.inputs}>
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
                    {errors.material && touched.material ? <p className={form.error}>{errors.material}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="description">Product description:- </label>
                        <input
                            type="text"
                            id='description'
                            className={form.inputs}
                            name='description'
                            placeholder='Enter product description'
                            value={values.description}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.description && touched.description ? <p className={form.error}>{errors.description}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="price">Price (in Rs):- </label>
                        <input
                            type="number"
                            id='price'
                            name='price'
                            className={form.inputs}
                            placeholder='Enter Price'
                            value={values.price}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.price && touched.price ? <p className={form.error}>{errors.price}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="stock">Available Stock:- </label>
                        <input
                            type="number"
                            id='stock'
                            name='stock'
                            className={form.inputs}
                            placeholder='Available stock'
                            value={values.stock}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.stock && touched.stock ? <p className={form.error}>{errors.stock}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="height">Dimensions:- </label>
                        <div>
                            <input
                                type="number"
                                id='stock'
                                className={form.input}
                                name='height'
                                placeholder='Height'
                                value={values.height}
                                onChange={handleChange}
                            />
                            {/* <br /> */}
                            <input
                                type="number"
                                id='stock'
                                className={form.input}
                                name='length'
                                placeholder='Length'
                                value={values.length}
                                onChange={handleChange}
                            />
                            {/* <br /> */}
                            <input
                                type="number"
                                id='stock'
                                className={form.input}
                                name='width'
                                placeholder='Width'
                                value={values.width}
                                onChange={handleChange}
                            />
                            {/* <br /> */}
                            <select name="dimenstionUnit" id="stock" value={values.dimenstionUnit} onChange={handleChange} className={form.input}>
                                <option value="">Choose unit</option>
                                <option value="cm">centimeter</option>
                                <option value="m">meter</option>
                                <option value="mm">millimeter</option>
                                <option value="inch">inch</option>
                                <option value="foot">foot</option>
                            </select>
                        </div>
                    </div>
                    {(errors.height || errors.length || errors.width || errors.dimenstionUnit)
                        && (touched.height || touched.length || touched.width || touched.dimenstionUnit)
                        ? <p className={form.error}>{errors.height || errors.length || errors.width || errors.dimenstionUnit}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="weight">Weight:- </label>
                        <div>
                            <input
                                type="number"
                                id='weight'
                                name='weight'
                                className={form.input}
                                placeholder='weight'
                                value={values.weight}
                                onChange={handleChange}
                            />
                            {/* <br /> */}
                            <select name="weightUnit" id="weight" value={values.weightUnit} onChange={handleChange} className={form.input}>
                                <option value="">Choose weight unit</option>
                                <option value="gm">gm</option>
                                <option value="Kg">Kg</option>
                            </select>
                        </div>
                    </div>
                    {(errors.weight || errors.weightUnit) && (touched.weight || touched.weightUnit) ? <p className={form.error}>{errors.weight || errors.weightUnit}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="productImg">Product image ({values.productImg.length}/4):- </label>
                        <input
                            type="file"
                            id='productImg'
                            name='productImg'
                            multiple
                            onChange={handelFileChange}
                            disabled={values.productImg.length == 4}
                        />
                    </div>
                    {errors.productImg && touched.productImg ? <p className={form.error}>{errors.productImg}</p> : null}
                    <div className={form.inputbox}>
                        <label htmlFor="ownerImg">Owner Image:- </label>
                        <input
                            type="file"
                            id='ownerImg'
                            name='ownerImg'
                            onChange={handelFileChange}
                        />
                    </div>
                    {errors.ownerImg && touched.ownerImg ? <p className={form.error}>{errors.ownerImg}</p> : null}
                    <br />
                    <button type='submit' className={form.submitbtn}>Submit</button>
                    <button className={form.submitbtn} onClick={()=>navigate('/profile')}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Form
