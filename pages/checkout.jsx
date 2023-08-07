import { Grid, TextField, Divider } from "@mui/material";
import SEO from "components/SEO";
import CheckoutForm from "pages-sections/checkout/CheckoutForm3";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import CheckoutSummary from "pages-sections/checkout/CheckoutSummary";
import { useState } from "react";
import { FlexBetween, FlexBox } from "components/flex-box";
import { Span } from "components/Typography";
import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import { targetUrl } from "components/config";

const Checkout = () => {
  
  const router = useRouter();
  console.log(router);
  console.log(router.query);
  console.log(router.query.result);

  var itemList = null
  if (router.query==''|| router.query.result==undefined || router.query.result==null){
    if (typeof window !== "undefined") {
      window.alert('Invalid approach')
      window.location.href = "/cart"
    }
  } else {
    itemList = JSON.parse(router.query.result)
  }
  const [comment, setComment] = useState("");
  return <CheckoutNavLayout itemList={itemList}>
      <SEO title="Checkout" />
      {itemList != null?
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm itemList={itemList} />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary itemList={itemList} />
        </Grid>
      </Grid>
    : <div></div>
    }
    </CheckoutNavLayout>
    ;
};
export default Checkout;