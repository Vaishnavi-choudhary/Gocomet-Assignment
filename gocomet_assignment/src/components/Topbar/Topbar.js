import React from 'react'
import { NavLink } from 'react-router-dom'
import SortButton from '../SortButton/SortButton'
import { useNavigate } from 'react-router-dom';
import "./Topbar.css"
import { IoIosArrowBack } from 'react-icons/io';

const Topbar = ({type, data, state, dispatch, showData = true, productName = ""}) => {
    let navigate = useNavigate();
    const goToPreviousPath = () => {
        navigate(-1)
    }
  return (
    <div className='shopx_topbar'>
        {
            showData ?
            <>
                <div lassName='shopx_topbar_text'>
                    {
                        type !== "all" &&
                        <div className='shopx_topbar_breadcrumb'>
                            <p><NavLink className="shopx_nav" to = "/">Home</NavLink><span className='divider'>/</span> <span className='current'> <NavLink className="shopx_nav" to = {`/${type}`}>{type}</NavLink></span></p>
                        </div>
                    }
                    {
                        type === 'all' ?
                        <div className='shopx_topbar_title'>
                            <p>All Products <span> - {data?.length} Results</span></p>
                        </div>
                        :
                        <div className='shopx_topbar_title'>
                            <p>Shirts For {type}<span> - {data?.length} Results</span></p>
                        </div>
                    }
                </div>
                <SortButton type = {type} state = {state} data = {data} dispatch = {dispatch}/>
            </>
            :
            <>
            <div lassName='shopx_topbar_text'>
                <div className='shopx_topbar_breadcrumb'>
                    <p className = "alignCenter" onClick={()=>goToPreviousPath()}><IoIosArrowBack/> Back<span className='divider'>&nbsp; / &nbsp;</span><span className='current'>{productName}</span></p>
                </div>
            </div>
            </>
        }
    </div>
  )
}

export default Topbar