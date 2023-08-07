import Link from "next/link";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "contexts/AppContext";
import countryList from "data/countryList";
import { currency } from "lib";
import { useState, useEffect } from "react";
import { targetUrl, weburl, getAuth } from "components/config";
import { useNavigate, BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from 'next/router';

const Cart = () => {
//  const {
//    state
//  } = useAppContext();
// const navigate = useNavigate();
const router = useRouter()
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
   'price': item.price+item.optionFee,
   'dates':item.serviceDateInfoList
   }))
   setState({"cart": cartval})
};

}
useEffect(() => {
    getData()
},[])

  const [comment, setComment] = useState("");
  const cartList = state.cart;
  function checkout() {
    if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('order', JSON.stringify(state));
        console.log(JSON.parse(window.sessionStorage.getItem('order')))
        window.sessionStorage.setItem('total_price', getTotalPrice());
    }
    
    router.push({
      pathname: '/checkout',
      query: { result: JSON.stringify(state.cart)} 
    },
        "/checkout");
    // navigate('/page',{state: state.cart});
  }
  const getTotalPrice = () => state.cart.reduce((accum, item) => accum + item.price * item.qty, 0);
  return <CheckoutNavLayout itemList={state.cart}>
      <SEO title="Cart" />

      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          {state.cart.map(item => <ProductCard7 key={item.id} {...item} />)}
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
          <Card sx={{
          padding: 3
        }}>
            <FlexBetween mb={2}>
              <Span color="grey.600">Total:</Span>

              <Span fontSize={18} fontWeight={600} lineHeight="1">
                {currency(getTotalPrice())}
              </Span>
            </FlexBetween>

            <Divider sx={{
            mb: 2
          }} />

            {/*<FlexBox alignItems="center" columnGap={1} mb={2}>
              <Span fontWeight="600">Additional Comments</Span>

              <Span p="6px 10px" fontSize={12} lineHeight="1" borderRadius="3px" color="primary.main" bgcolor="primary.light">
                Note
              </Span>
            </FlexBox>

            <TextField variant="outlined" rows={6} value={comment} onChange={(event)=>{setComment(event.target.value); console.log(event.target.value)}} fullWidth multiline sx={{
            mb: 2
          }} />*/}

            <Divider sx={{
            mb: 2
          }} />

            {/*<TextField fullWidth size="small" label="Voucher" variant="outlined" placeholder="Voucher" />
            <Button variant="outlined" color="primary" fullWidth sx={{
            mt: 2,
            mb: 4
          }}>
              Apply Voucher
            </Button>

            <Divider sx={{
            mb: 2
          }} />
            <Span fontWeight={600} mb={2} display="block">
              Shipping Estimates
            </Span>
            <Autocomplete fullWidth sx={{
            mb: 2
          }} options={countryList}
          // getOptionLabel={(option) => option.label}
          renderInput={params => <TextField {...params} size="small" label="Country" variant="outlined" placeholder="Select Country" />} />
            <TextField select fullWidth size="small" label="State" variant="outlined" placeholder="Select State" defaultValue="new-york">
              {stateList.map(item => <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>)}
            </TextField>
            <TextField fullWidth size="small" label="Zip Code" placeholder="3100" variant="outlined" sx={{
            mt: 2
          }} />
            <Button variant="outlined" color="primary" fullWidth sx={{
            my: 2
          }}>
              Calculate Shipping
            </Button>*/}

            {/* <Link href="/checkout" passHref state={state.cart} legacyBehavior> */}
              <Button variant="contained" color="primary" onClick={()=>checkout()} fullWidth>
                Checkout Now
              </Button>
            {/* </Link> */}
          </Card>
        </Grid>
      </Grid>
    </CheckoutNavLayout>;
};
const stateList = [{
  value: "new-york",
  label: "New York"
}, {
  value: "chicago",
  label: "Chicago"
}];
export default Cart;