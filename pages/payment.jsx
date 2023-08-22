import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
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
  return <CheckoutNavLayout itemList={itemList}>
      {itemList != null?<Grid container flexWrap="wrap-reverse" spacing={3}>
        {/*<Grid item lg={8} md={8} xs={12}>
          <PaymentForm itemList={itemList} />
        </Grid>*/}

        <Grid item lg={12} md={12} xs={12}>
          <PaymentSummary itemList={itemList} />
        </Grid>
      </Grid>
      : <div></div>}
    </CheckoutNavLayout>;
};
export default Checkout;