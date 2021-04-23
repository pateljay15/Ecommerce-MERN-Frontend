import React, {useState, useEffect} from 'react'
import { getProducts } from '../admin/helper/adminapicall'
import { API } from '../backend'
import "../styles.css"
import Base from './Base'
import Card from './Card'

function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error){
                setError(true)
            } else {
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProduct()
    }, [])

    return (
        <Base title="Home" description="Welcome to the Tshirt Store">
            <div className="row text-center">
                <div className="row">
                    {products.map((product, index) => {
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card product={product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}

export default Home