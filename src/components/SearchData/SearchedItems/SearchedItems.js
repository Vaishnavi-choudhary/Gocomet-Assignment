import React, { useEffect } from 'react'
import "./SearchedItems.css"
import Lottie from "react-lottie";
import notFound from "../../../assets/animations/notfound.json"
import { NavLink } from 'react-router-dom';
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
};
const SearchedItems = ({
    state, dispatch, handleClose
}) => {
    useEffect(()=>{
        if(state.searchText === ""){
            dispatch({
                type: "UPDATE_STATE",
                payload: {
                    searchedData: [],
                },
            });
        }else{
            let data = state.all
            data = data?.filter((val)=>{
                return val?.brand?.toLowerCase()?.includes(state.searchText?.toLowerCase()) 
                    || val?.additionalInfo?.toLowerCase()?.includes(state.searchText?.toLowerCase()) 
                    || val?.gender?.toLowerCase()?.includes(state.searchText?.toLowerCase())
            })
            dispatch({
                type: "UPDATE_STATE",
                payload: {
                    searchedData: data?.slice(0,5)
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.searchText])

  return (
    <div className='shopx_searched'>
        <h4 style = {{fontWeight : "600", margin : "15px 20px"}}>Top Results !</h4>
        {
            state.searchedData?.map((item, index)=>{
                return (
                    <NavLink onClick={()=>handleClose()} className = 'shopx_searched_single shopx_nav' key = {index} to={`/product/${item.productId}`} >
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
                        </div>
                    </NavLink>
                )
            })
        }
        {
            !state.searchedData?.length && state.searchText &&
            <div className = 'shopx_searched_single removeHover'>
                <Lottie options={defaultOptions} height={150} width={150} />
                <div className='shopx_searched_single_content'>
                    <h4>No Result Found</h4>
                    <p>Try to found with some different keyword</p>
                </div>
            </div>
        }
    </div>
  )
}

export default SearchedItems