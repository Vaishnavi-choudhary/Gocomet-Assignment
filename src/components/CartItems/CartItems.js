import React, { memo, useEffect, useState } from "react";
import "./CartItems.css";
import { AiFillDelete } from "react-icons/ai";
import { cloneDeep } from "lodash";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import empty from "../../assets/animations/emptycart.json";
import Lottie from "react-lottie";
import { NavLink } from "react-router-dom";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: empty,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CartItems = ({ carts, state, dispatch, closeModal }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const removeFromCart = (id) => {
    let cart = cloneDeep(carts);
    cart = cart?.filter((val) => id !== val?.productId);
    dispatch({
      type: "UPDATE_STATE",
      payload: {
        cartItems: cart,
      },
    });
  };

  const alterValue = (type, id) => {
    let cart = cloneDeep(carts);
    let objIndex = cart.findIndex((val) => id === val?.productId);
    if (type === "add") {
      cart[objIndex]["quantity"] = cart[objIndex]["quantity"] + 1;
      cart[objIndex]["price"] =
        cart[objIndex]["originalPrice"] * cart[objIndex]["quantity"];
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          cartItems: cart,
        },
      });
    } else {
      if (cart[objIndex]["quantity"] - 1 < 1) return;
      cart[objIndex]["quantity"] = cart[objIndex]["quantity"] - 1;
      cart[objIndex]["price"] =
        cart[objIndex]["price"] - cart[objIndex]["originalPrice"];
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          cartItems: cart,
        },
      });
    }
  };

  useEffect(() => {
    let cart = cloneDeep(carts);
    let total = 0;
    cart?.forEach((val) => {
      total += val["price"];
    });
    setTotalPrice(total);
  }, [carts]);

  return (
    <div className="shopx_cart_items">
      <h2>Your Cart</h2>
      {carts?.length ? (
        <div className="shopx_cart_container">
          <div className="shopx_cart_items_list">
            {carts?.map((item) => {
              return (
                <div className="shopx_searched_single shopx_nav shopx_cart_items_margined">
                  <img alt = {item?.searchImage} src={item?.searchImage} />
                  <div className="shopx_searched_single_content shopx_cart_items_list_items">
                    <NavLink onClick={()=>closeModal()} className="shopx_nav" to = {`/product/${item?.productId}`}><p className="title">{item?.brand}</p></NavLink> 
                    <p>{item?.productName}</p>
                    <p className="price">
                      Rs. {item.price}{" "}
                      {item?.size && (
                        <span className="removeCss">
                          &nbsp; Size - {item?.size}
                        </span>
                      )}
                    </p>
                    <Quantity
                      alterValue={alterValue}
                      quantity={item?.quantity}
                      id={item.productId}
                    />
                    <p
                      className="delete"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      {" "}
                      <AiFillDelete /> Remove from bag
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="shopx_cart_total">
            <h2>Cart Total</h2>
            <div className="shopx_cart_total_details">
              <p>No. of items </p>
              <p>{carts?.length} </p>
            </div>
            <div className="shopx_cart_total_details">
              <p>Items price </p>
              <p>Rs. {totalPrice} </p>
            </div>
            <div className="shopx_cart_total_details">
              <p>Delivery charge </p>
              <p>Rs. 50 </p>
            </div>
            <div className="shopx_cart_total_details highlight">
              <p>Total Price </p>
              <p> Rs. {+totalPrice + +50}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="shopx_empty_cart">
          <Lottie options={defaultOptions} height={300} width={400} />
          <div className="shopx_empty_cart_details">
            <h2>Your bag is Empty</h2>
            <p>Add some items to bags and avail good offers</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CartItems);

const Quantity = ({ quantity, id, alterValue }) => {
  return (
    <div className="shopx_cart_quantity">
      <p className="para">Quatity </p>
      &nbsp;
      <div className="alter">
        <p onClick={() => alterValue("remove", id)}>
          <IoIosRemove />
        </p>
        <p className="alter_quantity">{quantity}</p>
        <p onClick={() => alterValue("add", id)}>
          <IoIosAdd />
        </p>
      </div>
    </div>
  );
};
