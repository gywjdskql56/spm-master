import { createContext, useContext, useMemo, useReducer, useEffect, useState } from "react";
import { targetUrl, weburl, getAuth } from "components/config";

// =================================================================================

// =================================================================================
//const INITIAL_CART = [{
//  qty: 1,
//  sale_price: 210,
//  slug: "silver-high-neck-sweater",
//  product_name: "여행1",
//  product_id: "6e8f151b-277b-4465-97b6-547f6a72e5c9",
//  imgUrl: "/assets/images/products/Fashion/Clothes/img.png"
//}, {
//  qty: 1,
//  sale_price: 110,
//  slug: "yellow-casual-sweater",
//  product_name: "여행2",
//  product_id: "76d14d65-21d0-4b41-8ee1-eef4c2232793",
//  imgUrl: "/assets/images/products/Fashion/Clothes/img_1.png"
//}, {
//  qty: 1,
//  sale_price: 140,
//  slug: "denim-blue-jeans",
//  product_name: "여행3",
//  product_id: "0fffb188-98d8-47f7-8189-254f06cad488",
//  imgUrl: "/assets/images/products/Fashion/Clothes/img_2.png"
//}];



let INITIAL_CART = {'data':[]}

{/*//const res = await fetch(targetUrl+"/cart",{
//              credentials : 'include',
//              method: 'GET',
//              headers: {
//                'Content-Type': 'application/json',
//                "ngrok-skip-browser-warning": true,
//            }})
//const data = res.json();
//if(data.status=="success"){
//   INITIAL_CART = data; console.log(data); window.sessionStorage.setItem('cart', JSON.stringify(data))
//};*/}


let INITIAL_STATE= null;
console.log(INITIAL_CART)
if (typeof window !== 'undefined' && window.sessionStorage.getItem("cart") !=null && window.sessionStorage.getItem("cart") !="undefined") {
 console.log("window")
 INITIAL_CART = window.sessionStorage.getItem("cart")
 console.log(INITIAL_CART)
 INITIAL_STATE = {
  cart: JSON.parse(INITIAL_CART)['data']
};

} else {
    INITIAL_STATE = {
      cart: (INITIAL_CART)['data']
    };
}
//
//const INITIAL_STATE = {
//      cart: (INITIAL_CART)['data']
//    };
const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {}
});

//console.log(AppContext)
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      console.log(state)
      console.log(cartList)
      let cartItem = action.payload;
      let exist = cartList.find(item => item.id === cartItem.id);
      console.log(exist)
      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter(item => item.id !== cartItem.id);
        return {
          ...state,
          cart: filteredCart
        };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map(item => item.id === cartItem.id ? {
          ...item,
          qty: cartItem.qty
        } : item);
        return {
          ...state,
          cart: newCart
        };
      }
      return {
        ...state,
        cart: [...cartList, cartItem]
      };
    default:
      {
        return {
        ...state,
        cart: []
      };
      }
  }
};

// =======================================================

// =======================================================

export const AppProvider = ({
  children
}) => {
//  const [cart, setCart] = useState([]);
//    useEffect(() => {
//        fetch("http://localhost:5003/get_cart_by_id/gywjdskql5915@gmail.com")
//        .then((response) =>
//            response.json())
//        .then((data) =>
//            {setCart(data); console.log(data)});
//       }, []);
  console.log(INITIAL_STATE)
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContext;