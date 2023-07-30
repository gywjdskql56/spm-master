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


let INITIAL_CART = {'cart':[]}
let AppContext = createContext({
  state: INITIAL_CART,
  dispatch: () => {}
});

const getData = async () => {
const res = await fetch(targetUrl+"/cart",{
              credentials : 'include',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": true,
            }})
console.log(res)
const data = await res.json();
console.log("RENEW!!!!!!!!!!!!!!!!")
console.log(data)
if(data.status=="success"){
    console.log(data.status)
   console.log(data);
   var cartval = data.data
   for (var j=0; j<cartval.length; j++){
       var total_option_fee = 0
       cartval[j]["optionFee"] = 0
       for (var i=0; i<cartval[j].optionFeeInfoList.length; i++){
            total_option_fee += cartval[j].optionFeeInfoList[i].price
   }
   cartval[j]["optionFee"] = total_option_fee
   console.log(j+'-----'+total_option_fee)
   }
   console.log(cartval)

   cartval = cartval.map((item)=> ({
   'option': item.optionFeeInfoList,
   'qty': item.count,
   'name': item.productName,
   'id':item.cartId,
   'price': item.price+item.optionFee
   }))
   return {"cart": cartval}, createContext({
  state: INITIAL_CART,
  dispatch: () => {}
})
};
return {'cart':[]}, createContext({
  state: INITIAL_CART,
  dispatch: () => {}
})

}
///////////////////////////////
INITIAL_CART, AppContext = await getData()
console.log("INITIAL_CART")
console.log(INITIAL_CART)

//let INITIAL_STATE= null;
//console.log(INITIAL_CART)
//const AppContext = createContext({
//  state: INITIAL_CART,
//  dispatch: () => {}
//});

//if (typeof window !== 'undefined' && window.sessionStorage.getItem("cart") !=null && window.sessionStorage.getItem("cart") !="undefined") {
// console.log("window")
// INITIAL_CART = window.sessionStorage.getItem("cart")
// console.log(INITIAL_CART)
// INITIAL_STATE = {
//  cart: JSON.parse(INITIAL_CART)['cart']
//};
//
//} else {
//    INITIAL_STATE = {
//      cart: (INITIAL_CART)['cart']
//    };
//}
//
//const INITIAL_STATE = {
//      cart: (INITIAL_CART)['data']
//    };

//const AppContext2 = async () => {
//const res = await fetch(targetUrl+"/cart",{
//              credentials : 'include',
//              method: 'GET',
//              headers: {
//                'Content-Type': 'application/json',
//                "ngrok-skip-browser-warning": true,
//            }})
//const data = res.json();
//console.log(data)
//if(data.status=="success"){
//   INITIAL_CART = data; console.log(data);
//   return createContext({
//  state: INITIAL_CART,
//  dispatch: () => {}
//})
//}else{
//return createContext({
//  state: {'cart':[]},
//  dispatch: () => {}
//});}}

//console.log(AppContext)
const reducer = (state, action) => {
  console.log("state",state)
  console.log("action",action)
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":

      let cartList = state.cart;
      console.log(state)
      console.log(cartList)
      console.log((action.payload))
      console.log(action.payload)
      let cartItem = action.payload;
      let exist = cartList.find(item => item.id === cartItem.id);
      exist = false
      console.log("cartList: "+JSON.stringify(cartList))
      console.log("cartItem: "+JSON.stringify(cartItem))
      console.log("exist: "+JSON.stringify((exist)))
      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter(item => item.id !== cartItem.id);
        return {
          ...state,
          cart: filteredCart
        };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        console.log(cartList)
        console.log(cartItem.qty)
        var qty_new = cartList.qty + cartItem.qty

        const newCart = cartList.map(item => item.id === cartItem.id ? {
          ...item,
          qty: item.qty + cartItem.qty,
        } : item);

//        window.sessionStorage.setItem('cart', JSON.stringify({
//          ...state,
//          cart: newCart
//        }))
        return {
          ...state,
          cart: newCart
        };
      }
//      window.sessionStorage.setItem('cart', JSON.stringify({
//        ...state,
//        cart: [...cartList, cartItem]
//      }))
      return {
        ...state,
        cart: [...cartList, cartItem]
      };

    case "DELETE_CART_AMOUNT":
      cartList = state.cart;
//      console.log(state)
//      console.log(cartList)
//      console.log((action.payload))
//      console.log(action.payload)
      cartItem = action.payload;
      exist = cartList.find(item => item.id === cartItem.id);

//      console.log("cartList: "+JSON.stringify(cartList))
//      console.log("cartItem: "+JSON.stringify(cartItem))
//      console.log("exist: "+JSON.stringify((exist)))
//      if (cartItem.qty < 1) {
//        const filteredCart = cartList.filter(item => item.id !== cartItem.id);
//        return {
//          ...state,
//          cart: filteredCart
//        };
//      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.filter(item => item.id !== cartItem.id);
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
  const [cart, setCart] = useState(INITIAL_CART);
  const [tf, setTF] = useState(false);

  if (tf==false){
        fetch(targetUrl+"/cart",{
              credentials : 'include',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": true,
            }})
        .then((response) =>
            response.json())
        .then((data) =>
            {console.log(data);
            if(data.status=="success"){
                console.log(data.status)
               console.log(data);
               var cartval = data.data
               for (var j=0; j<cartval.length; j++){
                   var total_option_fee = 0
                   cartval[j]["optionFee"] = 0
                   for (var i=0; i<cartval[j].optionFeeInfoList.length; i++){
                        total_option_fee += cartval[j].optionFeeInfoList[i].price
               }
               cartval[j]["optionFee"] = total_option_fee
               console.log(j+'-----'+total_option_fee)
               }
               console.log(cartval)

               cartval = cartval.map((item)=> ({
               'option': item.optionFeeInfoList,
               'qty': item.count,
               'name': item.productName,
               'id':item.cartId,
               'price': item.price+item.optionFee
               }))
               setCart({"cart": cartval})
            }
            setTF(true)
            });
   }
  console.log("CART")
  console.log(cart)
  console.log(INITIAL_CART)
  console.log(cart['cart'])
  console.log(INITIAL_CART['cart'])
  console.log(cart['cart'][0])
  console.log(INITIAL_CART['cart'][0])
  console.log(cart['cart'][0] == INITIAL_CART['cart'][0])
  const [state, dispatch] = useReducer(reducer, INITIAL_CART);
  console.log("state")
  console.log(state)
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContext;