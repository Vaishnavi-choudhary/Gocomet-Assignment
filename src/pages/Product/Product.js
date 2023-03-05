import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ImagesWrapper from '../../components/ImagesWrapper/ImagesWrapper'
import Topbar from '../../components/Topbar/Topbar'
import Error from '../Error/Error'
import ReactStars from "react-rating-stars-component";
import "./Product.css"
import { BsBagCheck, BsHeart } from 'react-icons/bs'
import cloneDeep from 'lodash/cloneDeep';
import SimiliarProduct from '../../components/SimiliarProduct/SimiliarProduct'

const Product = ({
    state, dispatch
}) => {
    const [product, setProduct] = useState({})
    const [carted, setCarted] = useState(false)
    const [wishlisted, setWishListed] = useState(false)
    const [size, setSize] = useState("")
    const { id } = useParams()

    useEffect(()=>{
        let pr = state.all?.find((product)=>{
            return String(id) === String(product?.productId)
        })
        setProduct(pr)
    },[id, state.all])

    useEffect(()=>{
        let cartProducts = cloneDeep(state.cartItems)
        let flag = false
        cartProducts?.forEach(pr => {
            if(pr?.productId === product?.productId){
                if(pr?.size) setSize(pr?.size)
                flag = true
            }
        });
        if(!flag) setCarted(false)
        else setCarted(true)
    },[state.cartItems, product?.productId])

    useEffect(()=>{
        let wishlistProducts = cloneDeep(state.wishlistItems)
        let flag = false
        wishlistProducts?.forEach(pr => {
            if(pr?.productId === product?.productId){
                flag = true
            }
        });
        if(!flag) setWishListed(false)
        else setWishListed(true)
    },[state.wishlistItems, product?.productId])

    const addToCart = () => {
        if(!carted){
            let cartProduct = cloneDeep(product)
            let cartProducts = cloneDeep(state.cartItems)
            cartProduct["size"] = size
            cartProduct["quantity"] = 1
            cartProduct["originalPrice"] = cartProduct["price"]
            cartProducts.push(cartProduct)
            dispatch({
                type : "UPDATE_STATE",
                payload : {
                    cartItems : cartProducts
                }
            })
        }else{
            let cartProducts = cloneDeep(state.cartItems)
            let data = cartProducts?.filter(val => val?.productId !== product?.productId)
            dispatch({
                type : "UPDATE_STATE",
                payload : {
                    cartItems : data
                }
            })
        }
    }

    const alterList = () => {
        if(!wishlisted){
            let cartProduct = cloneDeep(product)
            let wishlistItems = cloneDeep(state.wishlistItems)
            wishlistItems.push(cartProduct)
            dispatch({
                type : "UPDATE_STATE",
                payload : {
                    wishlistItems : wishlistItems
                }
            })
        }else{
            let wishlistItems = cloneDeep(state.wishlistItems)
            let data = wishlistItems?.filter(val => val?.productId !== product?.productId)
            dispatch({
                type : "UPDATE_STATE",
                payload : {
                    wishlistItems : data
                }
            })
        }
    }

  return (
    <div>
        {
            (product
            && Object.keys(product).length === 0
            && Object.getPrototypeOf(product) === Object.prototype) ?
            <>
                <Error/>
            </>
            :
            <>
                <Topbar productName = {product?.brand} showData = {false} state = {state} dispatch = {dispatch}/>
                <div className='shopx_product_id'>
                    <ImagesWrapper simage = {product?.searchImage} images = {product?.images}/>
                    <div className='shopx_product_details_single'>
                        <h2>{product?.brand}</h2>
                        <p>{product?.productName}</p>
                        {
                           (product?.rating || product?.rating !== 0) &&
                            <div className='shopx_product_rating'>
                                {product?.rating?.toFixed(1)}/ 5 &nbsp;
                                <ReactStars activeColor="#469597" size= {15} value= {product?.rating} edit = {false} />
                            </div>
                        }
                        <div className='compDivider'></div>
                        <p className='price'>
                            Rs. {product?.price} {" "}
                            {
                                product?.discountDisplayLabel &&
                                <>
                                    <s>Rs. {product?.mrp} </s> &nbsp;
                                    <span> {product?.discountDisplayLabel}</span>
                                </>
                            }
                        </p>
                        <p className='tax'>inclusive of all taxes</p>
                        <p className='selectSize'>Select Size - </p>
                        <SelectSize size = {size} sizes = {product?.sizes} setSize = {setSize}/>
                        <div className = "add">
                            <button className='common add_to_cart' onClick = {()=>addToCart()}>
                                <BsBagCheck/>
                                <p>{!carted ? "Add to bag" : "Remove from bag"}</p>
                            </button>
                            <button className='common wishlist' onClick={()=>alterList()}>   
                                <BsHeart/>
                                <p>{!wishlisted? "Wishlist" : "Remove from Wishlist"} </p>
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <SimiliarProduct productSpecific = {product} state = {state} dispatch = {dispatch}/>
            </>
        }
    </div>
  )
}

export default memo(Product)

const SelectSize = ({sizes, setSize, size}) => {
    const sizesArr = sizes?.split(",")

    return(
        <div className='shopx_sizes'>
            {
                sizesArr?.map((s, key)=>{
                    return(
                        <>
                            {
                                size === s ?
                                <div key = {key} className='shopx_sizes_single_active' onClick={()=>setSize(s)}>
                                    <p>{s}</p>
                                </div>
                                :
                                <div key = {key} className='shopx_sizes_single' onClick={()=>setSize(s)}>
                                    <p>{s}</p>
                                </div>
                            }
                        </>
                        
                    )
                })
            }
        </div>
    )
}