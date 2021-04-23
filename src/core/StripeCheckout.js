import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend'
import { createOrder } from './helper/orderHelper'


function StripeCheckout({
    products,
    setReload = f => f,
    reload = undefined
}) {
    const [data, setData] = useState({
        loading: true,
        success: false,
        error: "",
        address: ""
    })

    const tokenn = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.price
        }, 0)
    }
    //Alternative way to get price using map
    // const getFinalPrice = () => {
    //     let amount = 0
    //     products.map(p => {
    //         amount = amount + p.price
    //     })
    //     return amount
    // }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(async response => {
            console.log(response)
            const data = await response.json()
            const {status} = response
            console.log("STATUS", status)
            const orderData = {
                products: products,
                transaction_id: data.balance_transaction,
                amount: data.amount/100
            }
            createOrder(userId, tokenn, orderData).then((response) => console.log(response))
            // cartEmpty(() => {
            //     console.log("Did we got crash?")
            // })
            setReload(!reload)
        })
        .catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <>{getFinalPrice() ? (
                <StripeCheckoutButton
                stripeKey={process.env.REACT_APP_PUBLICKEY}
                token={makePayment}
                currency="INR"
                amount={getFinalPrice() * 100}
                name="Buy Tshirts"
                shippingAddress
                billingAddress
                >
                    <button className="btn btn-success">Pay with Stripe</button>
                </StripeCheckoutButton>) : (`No Items in cart`)}
        </>
        ) : (
            <Link>
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }

    return (
        <div>
            <h3 className="text-white">Stripe Checkout <span className="text-info">&#8377;{getFinalPrice()}</span></h3>
            {showStripeButton()}
        </div>
    )
}


export default StripeCheckout