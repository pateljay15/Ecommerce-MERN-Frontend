import React, {useState, useEffect} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createProduct, getCategories } from './helper/adminapicall'

function AddProduct() {

    const history = useHistory()

    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    })

    const { name, description, price, stock, categories, category, loading, error, createdProduct, getaRedirect, formData } = values

    const preload = () => {
        getCategories()
        .then(data => {
            // console.log("Fetch", data)
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()})
                // console.log("IN", categories)
            }
        })
        .catch(console.log("Failed to fetch categories"))
    }

    useEffect(() => {
        preload()
    }, [])

    // console.log("OUT", categories)
    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: "", loading: true})
        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values, 
                    name: "", 
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.name,
                    getaRedirect: true
                })
            }
        })
        .catch(console.log("Unable to fetch product"))
    }

    const RedirectToAdmin = () => {
        setTimeout(() => {
            history.push("/admin/dashboard")
        }, 2000)
    }

    const successMessage =() => {
        return (
        <div className="col-md-6 offset-sm-3 text-left">        
        <div
        className="alert alert-success"
        style={{display: createdProduct ? "" : "none"}}
        >
           <h4>{createdProduct} created successfully :)</h4>
           {createdProduct ? RedirectToAdmin() : ""}
        </div>
        </div>
        )
    }

    const warningMessage =() => {
        return (
        <div className="col-md-6 offset-sm-3 text-left">    
        <div
        className="alert alert-danger"
        style={{display: error ? "" : "none"}}
        >
            {error}
        </div>
        </div>
        )
    }



    const handleChange = name => event => {
        // console.log(event.target.files[0])
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name] : value})
    }

    const createProductForm = () => (
        <form >
          <span className="lead text-white">Post photo</span>
          <div className="form-group my-3">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group my-3">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group my-3">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group my-3">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group my-3">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && 
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group my-3">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );

    return (
        <Base
        title="Add a product here!"
        description="Welcome to product creation section"
        className="container bg-dark p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-success rounded mb-3 mt-3">Admin Home</Link>
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddProduct
