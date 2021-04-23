import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'


function AddCategory() {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user: {_id}, token } = isAuthenticated()

    const goBack = () => {
        return(
            <div className="mt-2">
                <Link className="btn btn-md btn-success rounded mb-3" to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }

    const handleChange = event => {
        setError("")
        setName(event.target.value)
    }

    const onSubmit = event => {
        event.preventDefault()
        setError("")
        setSuccess(false)
        createCategory(_id, token, {name})
        .then(data => {
            console.log(data)
            if(data.error) {
                setError(data.error)
            } else {
                setError("")
                setSuccess(true)
                setName("")
            }
        })
        .catch(console.log("Failed to add category"))
    }

    const successMessage =() => {
        return (
        <div className="col-md-6 offset-sm-3 text-left">        
        <div
        className="alert alert-success"
        style={{display: success ? "" : "none"}}
        >
            Category created :)
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

    const myCategoryForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead text-white">Enter the category</p>
                    <input type="text" 
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-success my-2 rounded">
                        Create Category
                    </button>
                </div>
            </form>
        )
    }

    return (
        <Base title="Create a category here"
        description="Add a new category for new tshirts"
        className="container bg-dark p-4"
        >
            {goBack()}
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()} 
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
