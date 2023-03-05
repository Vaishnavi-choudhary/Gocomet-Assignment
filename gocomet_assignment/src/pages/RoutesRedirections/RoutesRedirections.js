import React, { useEffect, useReducer } from 'react'
import {Route, Routes,  BrowserRouter} from "react-router-dom"
import Navbar from '../../components/Navbar/Navbar'
import { DUMMY_DATA } from '../../constants/dummyData'
import { generateData, getAllBrands, getAllColors, getAllSeasons } from '../../helpers/helpers'
import { initialState, productsReducer } from '../../helpers/productsReducer'
import Error from '../Error/Error'
import Home from '../Home/Home'
import Product from '../Product/Product'

const RoutesRedirections = () => {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  useEffect(()=>{
    dispatch({
      type : "UPDATE_STATE",
      payload : {
        loading : true
      }
    })
    getAllBrands(dispatch, DUMMY_DATA)
    getAllColors(dispatch, DUMMY_DATA)
    getAllSeasons(dispatch, DUMMY_DATA)
    generateData(dispatch,  DUMMY_DATA)
    dispatch({
      type : "UPDATE_STATE",
      payload : {
        loading : false
      }
    })
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar state = {state} dispatch = {dispatch}/>
        <Routes>
          <Route exact path="/" element={<Home state = {state} dispatch = {dispatch} loading = {state.loading} data = {state.all} type = "all"/>}/>
          <Route exact path="/mens" element={<Home state = {state} dispatch = {dispatch} loading = {state.loading} data = {state.mens} type = "mens"/>}/>
          <Route exact path="/womens" element={<Home state = {state} dispatch = {dispatch} loading = {state.loading} data = {state.womens} type = "womens"/>}/>
          <Route exact path="/kids" element={<Home state = {state} dispatch = {dispatch} loading = {state.loading} data = {state.kids} type = "kids"/>}/>
          <Route exact path="/product/:id" element = {<Product state = {state} dispatch = {dispatch}/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RoutesRedirections