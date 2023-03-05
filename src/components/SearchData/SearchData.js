import React, { memo } from "react";
import { CiSearch } from "react-icons/ci";
import { LazyTippy } from "../Tippy/Tippy";
import SearchedItems from "./SearchedItems/SearchedItems";

const SearchData = ({ state, dispatch }) => {
  const searchProduct = (val) => {
    dispatch({
      type: "UPDATE_STATE",
      payload: {
        searchText: val,
      },
    });
  };
  const handleClose = () => {
    dispatch({
        type: "UPDATE_STATE",
        payload: {
          searchText: "",
          searchedData : []
        },
    });
  }
  return (
    <div className="shopx_search">
      <CiSearch />
      <LazyTippy
        theme="light"
        appendTo={document.body}
        interactive
        arrow={false}
        visible={state.searchText !== ""}
        onClickOutside={handleClose}
        content={
          <SearchedItems
            state = {state} 
            dispatch = {dispatch}
            handleClose = {handleClose}
          />
        }
      >
        <input
            placeholder="Search your need !"
            value={state.searchText}
            onChange={(e) => searchProduct(e.target.value)}
        />
      </LazyTippy>
    </div>
  );
};

export default memo(SearchData);
