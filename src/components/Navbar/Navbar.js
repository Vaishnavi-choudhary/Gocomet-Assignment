import React, { memo, useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { BsBagCheck, BsHeart } from "react-icons/bs";
import logo from "../../assets/logo/logo1250.png";
import SearchData from "../SearchData/SearchData";
import CartItems from "../CartItems/CartItems";
import Modal from "react-modal";
import { LazyTippy } from "../Tippy/Tippy";
import Wishlist from "../Wishlist/Wishlist";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useWindowDimensions from "../../helpers/CustomHooks/useWindowDimensions"

const customStyles = {
  content: {
    top: "52%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    width: "85%",
  },
};
const Navbar = ({ state, dispatch }) => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openWishlistTippy, setOpenWishlistTippy] = useState(false);
  const {width} = useWindowDimensions()
  return (
    <>
    <div className="shopx_navbar">
      <NavLink className="shopx_nav" activeClassName="active" to="/">
        <img alt = "logo" src={logo} className="shopx_logo" />
      </NavLink>
      <div className="shopx_responsive_nav">
      <ul className="shopx_nav_list">
        <li>
          <NavLink className="shopx_nav" activeClassName="active" to="/">
            All
          </NavLink>
        </li>
        <li>
          <NavLink className="shopx_nav" activeClassName="active" to="/mens">
            Mens
          </NavLink>
        </li>
        <li>
          <NavLink className="shopx_nav" activeClassName="active" to="/womens">
            Womens
          </NavLink>
        </li>
        <li>
          <NavLink className="shopx_nav" activeClassName="active" to="/kids">
            Kids
          </NavLink>
        </li>
      </ul>
      {
      width <550 && <SearchData state={state} dispatch={dispatch} />
      }
      </div>
      {
        width >= 550 &&
        <SearchData state={state} dispatch={dispatch} />
      }
      <div className="shopx_nav_icons">
        <div
          className="shopx_nav_icons_cart"
          onClick={() => setOpenCartModal(true)}
        >
          {state.cartItems?.length !== 0 && (
            <p className="shopx_nav_icons_cart_count">
              {state.cartItems?.length}
            </p>
          )}
          <BsBagCheck />
          <p>Cart</p>
        </div>
        <div>
          <LazyTippy
            theme="light"
            appendTo={document.body}
            interactive
            arrow={false}
            visible={openWishlistTippy}
            onClickOutside={() => {
              setOpenWishlistTippy(false);
            }}
            content={
              <Wishlist
                state={state}
                dispatch={dispatch}
                handleClose={(e) => {
                  setOpenWishlistTippy(false);
                }}
                handleOpen={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenWishlistTippy(true);
                }}
              />
            }
          >
            <div
              className="shopx_nav_icons_cart"
              onClick={() => {
                setOpenWishlistTippy(true);
              }}
            >
              {state.wishlistItems?.length !== 0 && (
                <p className="shopx_nav_icons_cart_count">
                  {state.wishlistItems?.length}
                </p>
              )}
              <BsHeart />
              <p>Wishlist</p>
            </div>
          </LazyTippy>
        </div>
      </div>
      {openCartModal && (
        <Modal
          isOpen={openCartModal}
          onRequestClose={() => setOpenCartModal(false)}
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
              onClick={() => setOpenCartModal(false)}
            >
              <AiOutlineCloseCircle />
            </p>
            <CartItems
              carts={state.cartItems}
              state={state}
              dispatch={dispatch}
              closeModal = {() => setOpenCartModal(false)}
            />
          </div>
        </Modal>
      )}
    </div>
    </>
  );
};

export default memo(Navbar);
