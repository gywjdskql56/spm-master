import Link from "next/link";
import { Avatar, Box, Button, Divider, IconButton, useTheme } from "@mui/material";
import { Add, Clear, Close, Remove } from "@mui/icons-material";
import LazyImage from "components/LazyImage";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, Paragraph, Tiny } from "components/Typography";
import CartBag from "components/icons/CartBag";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { targetUrl, getAuth } from "components/config";
import { Fragment, useState, useEffect } from "react";

// =========================================================

// =========================================================

const MiniCart = ({
  toggleSidenav
}) => {
  const {
    palette
  } = useTheme();
//  const {
//    state,
//    dispatch
//  } = useAppContext();

const [state, setState] = useState({'cart':[]});
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
   setState({"cart": cartval})
};

}
useEffect(() => {
    getData()
},[])

  const handleCartAmountChange = (amount, product) => () => {
    console.log("product")
    console.log(product)
//    dispatch({
//      type: "CHANGE_CART_AMOUNT",
//      payload: {
//        ...product,
//        qty: amount,
//        code: product.code,
//      }
//    });
  };

  const handleCartAmountDelete = (product) => () => {
    console.log("product")
    console.log(product)
    fetch(targetUrl+'/cart/'+product.id,{
      method: 'DELETE',
      credentials : 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(response => {console.log(response)
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 장바구니에서 삭제되었습니다.")
            getData()
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("장바구니에서 삭제 실패하였습니다. 다시 시도해주세요.")
        }}
    })
//    dispatch({
//      type: "DELETE_CART_AMOUNT",
//      payload: {
//        ...product,
//        code: product.code,
//        id:product.id
//      }
//    });
  };
  const getTotalPrice = () => {
    return state.cart.reduce((accum, item) => accum + item.price * item.qty, 0);
  };
  return <Box width="100%" maxWidth={380}>
      <Box overflow="auto" height={`calc(100vh - ${!!state.cart.length ? "80px - 3.25rem" : "0px"})`}>
        <FlexBetween mx={3} height={74}>
          <FlexBox gap={1} alignItems="center" color="secondary.main">
            <CartBag color="inherit" />

            <Paragraph lineHeight={0} fontWeight={600}>
              {state.cart.length} 개의 상품
            </Paragraph>
          </FlexBox>

          <IconButton onClick={toggleSidenav}>
            <Clear />
          </IconButton>
        </FlexBetween>

        <Divider />

        {state.cart.length <= 0 && <FlexBox alignItems="center" flexDirection="column" justifyContent="center" height="calc(100% - 74px)">
            <LazyImage width={90} height={100} alt="banner" src="/assets/images/logos/shopping-bag.svg" />
            <Box component="p" mt={2} color="grey.600" textAlign="center" maxWidth="200px">
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexBox>}

        {state.cart.map(item => <FlexBox py={2} px={2.5} key={item.id} alignItems="center" borderBottom={`1px solid ${palette.divider}`}>
            {/*<FlexBox alignItems="center" flexDirection="column">
              <Button color="primary" variant="outlined" onClick={handleCartAmountChange(1, item)} sx={{
            height: "32px",
            width: "32px",
            borderRadius: "300px"
          }}>
                <Add fontSize="small" />
              </Button>

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>

              <Button color="primary" variant="outlined" disabled={item.qty === 1} onClick={handleCartAmountChange(state.cart?.qty - 1, item)} sx={{
            height: "32px",
            width: "32px",
            borderRadius: "300px"
          }}>
                <Remove fontSize="small" />
              </Button>
            </FlexBox>*/}

            <Link href={`/product/${item.slug}`}>
              <a>
                <Avatar alt={item.name} src={item.imgUrl} sx={{
              mx: 2,
              width: 76,
              height: 76
            }} />
              </a>
            </Link>

            <Box flex="1" sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
              <Link href={`/product/${item.slug}`}>
                <a>
                  <H5 ellipsis fontSize="14px" className="title">
                    {item.name}
                  </H5>
                </a>
              </Link>
              <div>
              {item.option.map((opt) => <Tiny color="grey.600">
                {opt.name+"("+opt.price+")"+", "}
              </Tiny>)}
              </div>

              <Tiny color="grey.600">
                {currency(item.price)} x {item.qty}
              </Tiny>

              <Tiny color="grey.600">
                {currency(item.price)} x {item.qty}
              </Tiny>

              <Box fontWeight={600} fontSize="14px" color="primary.main" mt={0.5}>
                {item.date}
              </Box>
            </Box>

            <IconButton size="small" onClick={handleCartAmountDelete(item)} sx={{
          marginLeft: 2.5
        }}>
              <Close fontSize="small" />
            </IconButton>
          </FlexBox>)}
      </Box>

      {state.cart.length > 0 && <Box p={2.5}>
        {/* <Button fullWidth color="primary" variant="contained" sx={{
          mb: "0.75rem",
          height: "40px"
        }} onClick={()=>{if (typeof window !== "undefined") {
     toggleSidenav
    window.alert("결제기능은 준비중입니다.")
    }} }>
              바로 결제하기 ({currency(getTotalPrice())})
            </Button> */}
          {/* <Link href="/checkout-alternative" passHref>
            <Button fullWidth color="primary" variant="contained" sx={{
          mb: "0.75rem",
          height: "40px"
        }} onClick={toggleSidenav}>
              바로 결제하기 ({currency(getTotalPrice())})
            </Button>
          </Link> */}

          <Link href="/cart" passHref>
            <Button fullWidth color="primary" variant="outlined" sx={{
          height: 40
        }} onClick={toggleSidenav}>
               Checkout {/* ({currency(getTotalPrice())})*/}
            </Button>
          </Link>
        </Box>}
    </Box>;
};
export default MiniCart;