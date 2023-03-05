import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'
import SingleProduct from '../../pages/Products/SingleProduct/SingleProduct'
import "./SimiliarProduct.css"
import Lottie from "react-lottie";
import noProduct from "../../assets/animations/notfound.json"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: noProduct,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SimiliarProduct = ({productSpecific, state, dispatch}) => {
    const [items, setItems] = useState([])
    useEffect(()=>{
       let products = cloneDeep(state.all)
        products = products?.filter((val)=>{
            return val?.primaryColour === productSpecific?.primaryColour && val?.gender === productSpecific?.gender
        })
        setItems(products?.slice(0,6))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productSpecific])
  return (
    <div className="shopx_similiar_product_container">
    <h2>Similiar Products</h2>
    {
      items?.length === 0
      ?
      <>
      <div  className="shopx_products_no_product">
          <Lottie options={defaultOptions} height={300} width={300} />
          <h4>No Product Found!</h4>
          <p style = {{textAlign: 'center'}}>Try to find some more category or product</p>
      </div>
      </>
      :
      <>
      <div className="shopx_similiar_product">
          {items?.map((product) => {
              return (
                <SingleProduct
                  key={product?.productId}
                  additionalInfo={product?.additionalInfo}
                  brand={product?.brand}
                  category={product?.category}
                  discountDisplayLabel={product?.discountDisplayLabel}
                  gender={product?.gender}
                  images={product?.images}
                  mrp={product?.mrp}
                  price={product?.price}
                  primaryColour={product?.primaryColour}
                  product={product?.product}
                  productId={product?.productId}
                  productName={product?.productName}
                  rating={product?.rating}
                  searchImage={product?.searchImage}
                  sizes={product?.sizes}
                  year={product?.year}
                  state = {state}
                  dispatch = {dispatch}
                  hideSimiliar = {true}
                />
              );
            })}
      </div>
      </>
    }
    </div>
  )
}

export default SimiliarProduct