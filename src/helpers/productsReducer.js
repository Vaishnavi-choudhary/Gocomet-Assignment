const initialState = {
    all : [],
    mens : [],
    womens : [],
    kids : [],
    loading : false,
    searchText : "",
    searchedData : [],
    sortedText : "Recommanded",
    cartItems : [],
    wishlistItems : [],
    allFiltered : [],
    mensFiltered : [],
    womensFiltered : [],
    kidsFiltered : [],
    filteredArr : {"checkedBrandItems" : [], "checkedColorItems" : [], "checkedSeasonItems" : []},
    allBrands : [],
    allColors : [],
    allSeasons : [],
};

function productsReducer(state, action) {
  if (action.type === "UPDATE_STATE") {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }
  return state;
}

export { initialState, productsReducer };