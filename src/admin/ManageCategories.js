import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'
import { getCategories } from './helper/adminapicall'


function ManageCategories() {

    const [categories, setCategories] = useState([])

    const preload = () => {
        getCategories()
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setCategories(data)
            }
        })
        .catch(() => console.log("Unable to grab categories"))
    }

    useEffect(() => {
        preload()
    }, [])

    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-md btn-success rounded mb-3 mt-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
            {categories.map((category, index) => (
                    <div className="row text-center mb-2 " key={index}>
            <div className="col-4">
              <h3 className="text-white text-left">{category.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {
                  
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
                
            ))} 
          
        </div>
      </div>
    </Base>
    )
}

export default ManageCategories
