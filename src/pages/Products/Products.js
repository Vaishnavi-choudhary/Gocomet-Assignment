import React, { memo } from "react";
import "./Products.css";
import SingleProduct from "./SingleProduct/SingleProduct";
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

const Products = ({
  loading = false,
  data = [],
  type = "",
  state,
  dispatch,
}) => {
  return (
    <>
      {data?.length === 0 ? (
        <div  className="shopx_products_no_product">
          <Lottie options={defaultOptions} height={300} width={300} />
          <h4>No Product Found!</h4>
          <p style = {{textAlign: 'center'}}>Try to find some more category or product</p>
        </div>
      ) : (
        <div className="shopx_products">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {data.map((product) => {
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
                    state={state}
                    dispatch={dispatch}
                  />
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default memo(Products);
