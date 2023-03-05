import React, { memo } from 'react'
import Lottie from 'react-lottie'
import "./Wishlist.css"
import notFound from "../../assets/animations/notfound.json"
import { NavLink } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { cloneDeep } from 'lodash';
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
};
const Wishlist = ({state, dispatch, handleClose, handleOpen}) => {
    const removeFromWishlist = (e, id) =>{
        e.preventDefault(); e.stopPropagation();
        let wishlistItems = cloneDeep(state?.wishlistItems);
        wishlistItems = wishlistItems?.filter((val) => id !== val?.productId);
        dispatch({
            type: "UPDATE_STATE",
            payload: {
                wishlistItems: wishlistItems,
            },
        });
        handleOpen()
    }
  return (
    <div className='shopx_searched shopx_wishlist_handle'>
        <h4 className='shopx_searched_heading'>Your Wishlist ♥️</h4>
        {
            state.wishlistItems?.map((item, index)=>{
                return (
                    <NavLink onClick={()=>handleClose()} className = 'shopx_searched_single shopx_nav shopx_wishlist' key = {index} to={`/product/${item.productId}`} >
                        <img alt = {index} src = {item.searchImage}/>
                        <div className='shopx_searched_single_content'>
                            <h4>
                                {item.brand}{" "}
                                {item.gender === "Men" && <span>(M)</span>}
                                {item.gender === "Women" && <span>(F)</span>}
                                {item.gender === "Boys" && <span>(K)</span>}
                            </h4>
                            <p>{item?.additionalInfo}</p>
                            <p>Rs. {item.price}</p>
                            <p
                                className="delete"
                                onClick={(e) => removeFromWishlist(e, item.productId)}
                                >
                                {" "}
                                <AiFillDelete /> Remove from bag
                            </p>
                            <p className="shopx_delete_wishlist" onClick={(e) => removeFromWishlist(e, item.productId)}><AiFillDelete /></p>
                        </div>
                    </NavLink>
                )
            })
        }
        {
            !state.wishlistItems?.length &&
            <div className = 'shopx_searched_single removeHover'>
                <Lottie options={defaultOptions} height={150} width={150} />
                <div className='shopx_searched_single_content'>
                    <h4>Empty Wishlist</h4>
                    <p>Try to add some items in wishlist</p>
                </div>
            </div>
        }
    </div>
  )
}

export default memo(Wishlist)