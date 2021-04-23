import React from 'react'
import { API } from '../../backend'

function ImageHelper({ product }) {

    const imageUrl = product 
    ? `${API}/product/photo/${product._id}` 
    : `https://cdn.pixabay.com/photo/2020/10/23/12/03/arch-5678549__340.jpg`
    return (
        <div className="rounded border border-success p-2">
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
    )
}


export default ImageHelper