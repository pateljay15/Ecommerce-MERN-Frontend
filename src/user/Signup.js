import React, { useState } from "react"
import { Link } from "react-router-dom"
import { signup } from "../auth/helper"
import Base from "../core/Base"


const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
        .then((data) => {
            if (data.error) {
                console.log(data)
              setValues({ ...values, error: data.error, success: false });
            } else {
                console.log(data)
              setValues({
                ...values,
                name: "",
                email: "",
                password: "",
                error: "",
                success: true
              });
            }
          })
          .catch(console.log("Error in signup"));
      };

    const successMessage =() => {
        return (
        <div className="col-md-6 offset-sm-3 text-left">        
        <div
        className="alert alert-success"
        style={{display: success ? "" : "none"}}
        >
            New account is created successfully. Please{" "} 
            <Link to="/signin">Login Here</Link>
        </div>
        </div>
        )
    }

    const errorMessage =() => {
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

    const signUpForm = () => {
        return(
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group my-2">
                        <label className="text-light">Name</label>
                        <input className="form-control" value={name} onChange={handleChange("name")} type="text" />
                    </div>
                    <div className="form-group my-2">
                        <label className="text-light">Email</label>
                        <input className="form-control" value={email} onChange={handleChange("email")} type="email" />
                    </div>
                    <div className="form-group my-2">
                        <label className="text-light">Password</label>
                        <input className="form-control" value={password} onChange={handleChange("password")} type="password" />
                    </div>
                    <button onClick={onSubmit} className="btn btn-success btn-block mt-2">Submit</button>
                </form>
            </div>
        )
    }

    return(
        <Base title="Sign up page" description="A page for user to sign up!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    )
}


export default Signup