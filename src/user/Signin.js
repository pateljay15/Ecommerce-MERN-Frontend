import React, { useState } from "react"
import Base from "../core/Base"
import { signin, authenticate, isAuthenticated } from "../auth/helper/index"
import { Link, Redirect} from "react-router-dom"

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        loading: "",
        didRedirect: false
    })

    const { email, password, error, success , loading, didRedirect } = values
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false })
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values, 
                        didRedirect: true
                    })
                })
            }
        })
        .catch(console.log("Signin request failed"))
    }

    const performRedirect = () => {
        //TODO: do a redirection
        if(didRedirect) {
            if(user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage =() => {
        return (
            loading && (
                <div className="col-md-6 offset-sm-3 text-left"> 
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
                </div>
            )
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

    const signInForm = () => {
        return(
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group my-2">
                        <label className="text-light">Email</label>
                        <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
                    </div>
                    <div className="form-group my-2">
                        <label className="text-light">Password</label>
                        <input value={password} onChange={handleChange("password")} className="form-control" type="password" />
                    </div>
                    <button onClick={onSubmit} className="btn btn-success btn-block mt-2">Submit</button>
                </form>
            </div>
        )
    }

    return(
        <Base title="Sign In page" description="A page for user to sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}


export default Signin