import { cloneDeep } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { COLOR_MAP } from "../../constants/constants";
import "./Sidebar.css";

const Sidebar = ({ type, state, dispatch }) => {
  const [checkedBrandItems, setCheckedBrandItems] = useState([]);
  const [checkedColorItems, setCheckedColorItems] = useState([]);
  const [checkedSeasonItems, setCheckedSeasonItems] = useState([]);
  const [expand, setExpand] = useState(false);
  const [colorExpand, setColorExpand] = useState(false);


  const handleBrandCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckedBrandItems([...checkedBrandItems, e.target.value]);
    } else {
      let data = checkedBrandItems?.filter((val) => val !== e.target.value);
      setCheckedBrandItems(data);
    }
  };
  const handleColorCheckboxChange = (e) => {
    if (e.target.checked) {
      setCheckedColorItems([...checkedColorItems, e.target.value]);
    } else {
      let data = checkedColorItems?.filter((val) => val !== e.target.value);
      setCheckedColorItems(data);
    }
  };
  const handleColorSeasonChange = (e) => {
    if (e.target.checked) {
      setCheckedSeasonItems([...checkedSeasonItems, e.target.value]);
    } else {
      let data = checkedSeasonItems?.filter((val) => val !== e.target.value);
      setCheckedSeasonItems(data);
    }
  };

  useEffect(()=>{
    setCheckedBrandItems(state.filteredArr["checkedBrandItems"])
    setCheckedColorItems(state.filteredArr["checkedColorItems"])
    setCheckedSeasonItems(state.filteredArr["checkedSeasonItems"])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    let all = cloneDeep(state.allFiltered)
    let mens = cloneDeep(state.mensFiltered)
    let womens = cloneDeep(state.womensFiltered)
    let kids = cloneDeep(state.kidsFiltered)

    all = all?.filter((val)=>{
      return [...checkedBrandItems]?.includes(val?.brand?.toLowerCase()) || [...checkedColorItems]?.includes(val?.primaryColour?.toLowerCase()) || [...checkedSeasonItems]?.includes(val?.season?.toLowerCase())
    })
    mens = mens?.filter((val)=>{
      return [...checkedBrandItems]?.includes(val?.brand?.toLowerCase()) || [...checkedColorItems]?.includes(val?.primaryColour?.toLowerCase()) || [...checkedSeasonItems]?.includes(val?.season?.toLowerCase())
    })
    womens = womens?.filter((val)=>{
      return [...checkedBrandItems]?.includes(val?.brand?.toLowerCase()) || [...checkedColorItems]?.includes(val?.primaryColour?.toLowerCase()) || [...checkedSeasonItems]?.includes(val?.season?.toLowerCase())
    })
    kids = kids?.filter((val)=>{
      return [...checkedBrandItems]?.includes(val?.brand?.toLowerCase()) || [...checkedColorItems]?.includes(val?.primaryColour?.toLowerCase()) || [...checkedSeasonItems]?.includes(val?.season?.toLowerCase())
    })
    if(!(all.length || mens.length || kids.length || womens.length)){
      all = cloneDeep(state.allFiltered)
      mens = cloneDeep(state.mensFiltered)
      womens = cloneDeep(state.womensFiltered)
      kids = cloneDeep(state.kidsFiltered)
    }
    let filteredArr = {}
    filteredArr["checkedBrandItems"] = checkedBrandItems
    filteredArr["checkedColorItems"] = checkedColorItems
    filteredArr["checkedSeasonItems"] = checkedSeasonItems

    dispatch({
      type : "UPDATE_STATE",
      payload : {
        all, mens, womens, kids, filteredArr
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedBrandItems, checkedColorItems, checkedSeasonItems]);

  return (
    <div className="shopx_sidebar">
      <h4>Filters</h4>
      {/* Brand Filter */}
      <div className="common">
        <p className="title">BRAND</p>
        {!expand ? (
          <div>
            {state.allBrands?.slice(0,9)?.map((brand, key) => {
              return (
                <div key = {key} className="shopx_sidebar_checkbox">
                  <input
                    id={`${brand?.value}_${key}`}
                    type="checkbox"
                    name={`${brand?.value}`}
                    value={`${brand?.value}`}
                    checked={
                      checkedBrandItems?.lastIndexOf(brand?.value) >= 0
                        ? true
                        : false
                    }
                    onChange={(e) => handleBrandCheckboxChange(e)}
                  />
                  <label htmlFor={`${brand?.value}_${key}`}>{brand?.value}</label>
                </div>
              );
            })}
            <p onClick={()=>setExpand(true)} className = "showExpand">+ {state.allBrands?.length-9} more</p>
          </div>
        ) : (
          <>
            {state.allBrands?.map((brand, key) => {
              return (
                <div key = {key} className="shopx_sidebar_checkbox">
                  <input
                    id={`${brand?.value}_${key}`}
                    type="checkbox"
                    name={`${brand?.value}`}
                    value={`${brand?.value}`}
                    checked={
                      checkedBrandItems?.lastIndexOf(brand?.value) >= 0
                        ? true
                        : false
                    }
                    onChange={(e) => handleBrandCheckboxChange(e)}
                  />
                  <label htmlFor={`${brand?.value}_${key}`}>{brand?.value}</label>
                </div>
              );
            })}
            <p onClick={()=>setExpand(false)} className = "showExpand">show less</p>
          </>
        )}
      </div>

      {/* Color Filter */}
      <div className="common">
        <p className="title">COLOR</p>
        {!colorExpand ? (
          <div>
            {state.allColors?.slice(0,9)?.map((color, key) => {
              return (
                <div key = {key} className="shopx_sidebar_checkbox">
                  <input
                    id={`${color?.value}_${key}`}
                    type="checkbox"
                    name={`${color?.value}`}
                    value={`${color?.value}`}
                    checked={
                      checkedColorItems?.lastIndexOf(color?.value) >= 0
                        ? true
                        : false
                    }
                    onChange={(e) => handleColorCheckboxChange(e)}
                  />
                  <label htmlFor={`${color?.value}_${key}`}>
                    <div className="shopx_sidebar_checkbox_color">
                      <div style = {{backgroundColor : [COLOR_MAP[color.value]], height : "15px", width : "15px", margin : "0px 3px"}}></div>
                      {color?.value}
                    </div>
                  </label>
                </div>
              );
            })}
            <p onClick={()=>setColorExpand(true)} className = "showExpand">+ {state.allColors?.length-9} more</p>
          </div>
        ) : (
          <>
            {state.allColors?.map((color, key) => {
              return (
                <div key = {key} className="shopx_sidebar_checkbox">
                  <input
                    id={`${color?.value}_${key}`}
                    type="checkbox"
                    name={`${color?.value}`}
                    value={`${color?.value}`}
                    checked={
                      checkedColorItems?.lastIndexOf(color?.value) >= 0
                        ? true
                        : false
                    }
                    onChange={(e) => handleColorCheckboxChange(e)}
                  />
                  <label htmlFor={`${color?.value}_${key}`}>
                    <div className="shopx_sidebar_checkbox_color">
                      <div style = {{backgroundColor : [COLOR_MAP[color.value]], height : "15px", width : "15px",  margin : "0px 3px"}}></div>
                      {color?.value}
                    </div>
                  </label>
                </div>
              );
            })}
            <p onClick={()=>setColorExpand(false)} className = "showExpand">show less</p>
          </>
        )}
      </div>

      {/* Season Filter */}
      <div className="common">
        <p className="title">SEASON</p>
          <div>
            {state.allSeasons?.map((season, key) => {
              return (
                <div key = {key} className="shopx_sidebar_checkbox">
                  <input
                    id={`${season?.value}_${key}`}
                    type="checkbox"
                    name={`${season?.value}`}
                    value={`${season?.value}`}
                    checked={
                      checkedSeasonItems?.lastIndexOf(season?.value) >= 0
                        ? true
                        : false
                    }
                    onChange={(e) => handleColorSeasonChange(e)}
                  />
                  <label htmlFor={`${season?.value}_${key}`}>
                    {season?.value}
                  </label>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
