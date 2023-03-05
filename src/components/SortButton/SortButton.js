import React, { memo, useEffect, useState } from "react";
import "./SortButton.css";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { SORTLIST } from "../../constants/constants";
import { shuffleData, sortData } from "../../helpers/helpers";
import cloneDeep from 'lodash/cloneDeep';

const SortButton = ({
  type, state, data, dispatch
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(()=>{
    let sortedData = []
    if(state.sortedText === "Recommanded"){
      sortedData = cloneDeep(shuffleData(data))
    }else if(state.sortedText === "Low to High"){
      sortedData = sortData("asc", data)
    }else if(state.sortedText === "High to Low"){
      sortedData = sortData("desc", data)
    }
    dispatch({
      type : "UPDATE_STATE",
      payload : {
        [type] : sortedData
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state.sortedText, type])

  const handleSort = (val) => {
    dispatch({
      type : "UPDATE_STATE",
      payload : {
        sortedText : val
      }
    })
    setIsHovered(false);
  }
  
  return (
    <div
      className="shopx_sort_button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="shopx_sort_button_text">
        <p>
          Sort by: <span>{state.sortedText}</span>
        </p>
      </div>
      <div className="shopx_sort_button_icon">
        {isHovered ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      {isHovered && (
        <div className="shopx_sort_button_list">
          {SORTLIST?.map((item, key) => {
            return (
              <>
                {item.value !== state.sortedText && (
                  <div  onClick={() => handleSort(item.value)} key={key} className = "shopx_sort_button_list_container">
                    <p
                        className="shopx_sort_button_list_text"
                    >
                        {item.value}
                    </p>
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(SortButton);