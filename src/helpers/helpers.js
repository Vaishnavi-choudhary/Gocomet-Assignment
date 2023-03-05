const generateRequiredObject = (product) => {
    let obj = {}
    obj["additionalInfo"] = product?.additionalInfo
    obj["brand"] = product?.brand
    obj["category"] = product?.category
    obj["discountDisplayLabel"] = product?.discountDisplayLabel
    obj["gender"] = product?.gender
    obj["images"] = product?.images
    obj["mrp"] = product?.mrp
    obj["price"] = product?.price
    obj["primaryColour"] = product?.primaryColour
    obj["product"] = product?.product
    obj["productId"] = product?.productId
    obj["productName"] = product?.productName
    obj["rating"] = product?.rating
    obj["searchImage"] = product?.searchImage
    obj["sizes"] = product?.sizes
    obj["year"] = product?.year
    obj["season"] = product?.season
    return obj
}

const removeDuplicates = (array, key) => {
    return array.reduce((arr, item) => {
      const removed = arr.filter(i => i[key] !== item[key]);
      return [...removed, item];
    }, []);
};

export const shuffleData = (data) => {
    return data.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

export const generateData = (dispatch, data) => {
    let ALLDATA = [], MENS = [], WOMENS = [], KIDS = [];
    data?.forEach(product => {
        let obj = generateRequiredObject(product)
        ALLDATA.push(obj)
        if(obj.gender === "Men") MENS.push(obj)
        if(obj.gender === "Women") WOMENS.push(obj)
        if(obj.gender === "Boys")   KIDS.push(obj)
    });
    dispatch({
        type : "UPDATE_STATE",
        payload : {
            all : shuffleData(ALLDATA),
            mens : MENS,
            womens : WOMENS,
            kids : KIDS,
            allFiltered : shuffleData(ALLDATA),
            mensFiltered : MENS,
            womensFiltered : WOMENS,
            kidsFiltered : KIDS,
        }
    })
}

export const sortData = (type = "asc", data) => {
    if(type === "desc"){
        return data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }else{
        return data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
}

export const getAllBrands = (dispatch, data) =>{
    let DATA = []
    data?.forEach(product => {
        DATA.push({key : product?.brand?.toLowerCase(), value: product?.brand?.toLowerCase()})
    });
    dispatch({
        type : "UPDATE_STATE",
        payload : {
            allBrands : removeDuplicates(DATA, 'value')
        }
    })
}

export const getAllColors = (dispatch, data) =>{
    let DATA = []
    data?.forEach(product => {
        DATA.push({key : product?.primaryColour?.toLowerCase(), value: product?.primaryColour?.toLowerCase()})
    });
    dispatch({
        type : "UPDATE_STATE",
        payload : {
            allColors : removeDuplicates(DATA, 'value')
        }
    })
}

export const getAllSeasons = (dispatch, data) =>{
    let DATA = []
    data?.forEach(product => {
        DATA.push({key : product?.season?.toLowerCase(), value: product?.season?.toLowerCase()})
    });
    dispatch({
        type : "UPDATE_STATE",
        payload : {
            allSeasons : removeDuplicates(DATA, 'value')
        }
    })
}

export const checkValidId = (id, data) =>{
    let flag = false
    data?.forEach((d)=>{
        if(d?.productId === id) flag = true
    })
    if(flag) return true
    else return false
}