import React, { memo } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import Products from '../Products/Products'
import "./Home.css"
const Home = ({loading = false, data = [], type = "", state, dispatch}) => {
  return (
    <div>
        <Topbar state = {state} dispatch = {dispatch} type = {type} data = {data}/>
        <div className='shopx_home'>
            <Sidebar type = {type} state = {state} dispatch = {dispatch}/>
            <Products loading = {loading} data = {data} type = {type} state = {state} dispatch = {dispatch}/>
        </div>
    </div>
  )
}

export default memo(Home)