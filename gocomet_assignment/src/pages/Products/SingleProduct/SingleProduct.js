import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./SingleProduct.css";
import { BsBagCheck } from "react-icons/bs";
import { cloneDeep } from "lodash";
import {
  AiFillHeart,
  AiOutlineCloseCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import SimiliarProduct from "../../../components/SimiliarProduct/SimiliarProduct";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    width: "60%",
  },
};

const SingleProduct = ({
  additionalInfo,
  brand,
  category,
  discountDisplayLabel,
  gender,
  images,
  mrp,
  price,
  primaryColour,
  product,
  productId,
  productName,
  rating,
  searchImage,
  sizes,
  year,
  state,
  dispatch,
  hideSimiliar = false,
}) => {
  let productSpecific = {
    additionalInfo,
    brand,
    category,
    discountDisplayLabel,
    gender,
    images,
    mrp,
    price,
    primaryColour,
    product,
    productId,
    productName,
    rating,
    searchImage,
    sizes,
    year,
  };
  const [isHovered, setIsHovered] = useState(false);
  const [carted, setCarted] = useState(false);
  const [wishlisted, setWishListed] = useState(false);
  const [openSimiliarProduct, setOpenSimiliarProduct] = useState(false);

  useEffect(() => {
    let cartProducts = cloneDeep(state.cartItems);
    let flag = false;
    cartProducts?.forEach((pr) => {
      if (pr?.productId === productId) {
        flag = true;
      }
    });
    if (!flag) setCarted(false);
    else setCarted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cartItems]);

  useEffect(() => {
    let wishlistProducts = cloneDeep(state.wishlistItems);
    let flag = false;
    wishlistProducts?.forEach((pr) => {
      if (pr?.productId === productId) {
        flag = true;
      }
    });
    if (!flag) setWishListed(false);
    else setWishListed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.wishlistItems]);

  const addToCart = (e) => {
    e.preventDefault();
    if (!carted) {
      let cartProduct = cloneDeep(productSpecific);
      let cartProducts = cloneDeep(state.cartItems);
      cartProduct["quantity"] = 1;
      cartProduct["originalPrice"] = cartProduct["price"];
      cartProducts.push(cartProduct);
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          cartItems: cartProducts,
        },
      });
    } else {
      let cartProducts = cloneDeep(state.cartItems);
      let data = cartProducts?.filter((val) => val?.productId !== productId);
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          cartItems: data,
        },
      });
    }
  };

  const alterList = (e) => {
    e.preventDefault();
    if (!wishlisted) {
      let cartProduct = cloneDeep(productSpecific);
      let wishlistItems = cloneDeep(state.wishlistItems);
      wishlistItems.push(cartProduct);
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          wishlistItems: wishlistItems,
        },
      });
    } else {
      let wishlistItems = cloneDeep(state.wishlistItems);
      let data = wishlistItems?.filter((val) => val?.productId !== productId);
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          wishlistItems: data,
        },
      });
    }
  };

  const openSimiliarModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSimiliarProduct(true);
  };

  return (
    <NavLink
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shopx_single_product shopx_nav"
      to={`/product/${productId}`}
    >
      <img alt = "item" src={searchImage} />
      {isHovered && (
        <div
          onClick={(e) => alterList(e)}
          className={
            wishlisted
              ? "shopx_products_wishlist_container_filled"
              : "shopx_products_wishlist_container"
          }
        >
          {!wishlisted ? <AiOutlineHeart /> : <AiFillHeart />}
        </div>
      )}
      <div className="shopx_single_product_data">
        {!hideSimiliar && isHovered && (
          <div
            className="shopx_single_product_similiar"
            onClick={(e) => openSimiliarModal(e)}
          >
            <GrGallery />
            <p>View Similiar</p>
          </div>
        )}
        {isHovered ? (
          <div className="shopx_products_add_cart_container">
            <button
              className={
                carted
                  ? "shopx_products_add_cart addBg"
                  : "shopx_products_add_cart"
              }
              onClick={(e) => addToCart(e)}
            >
              <BsBagCheck />
              <p>{!carted ? "Add to bag" : "Remove from bag"}</p>
            </button>
          </div>
        ) : (
          <>
            <h4>{brand}</h4>
            <p className="info">{additionalInfo}</p>
          </>
        )}
        <p className="price">
          Rs. {price}{" "}
          {discountDisplayLabel && (
            <>
              <s>Rs. {mrp} </s>
              <span>{discountDisplayLabel}</span>
            </>
          )}
        </p>
      </div>
      {openSimiliarProduct && (
        <Modal
          isOpen={openSimiliarProduct}
          onRequestClose={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenSimiliarProduct(false);
          }}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ position: "relative" }}>
            <p
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                fontSize: "18px",
                zIndex: 5,
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenSimiliarProduct(false);
              }}
            >
              <AiOutlineCloseCircle />
            </p>

            <SimiliarProduct
              productSpecific={productSpecific}
              state={state}
              dispatch={dispatch}
            />
          </div>
        </Modal>
      )}
    </NavLink>
  );
};

export default SingleProduct;
