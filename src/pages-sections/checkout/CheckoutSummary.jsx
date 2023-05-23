import { Button, Divider, TextField, Typography } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { currency } from "lib";
const CheckoutSummary = () => {
  const getTotalPrice = null;
  if (typeof window !== 'undefined') {
        const cartList = JSON.parse(window.sessionStorage.getItem('order'))['cart'];
        console.log(JSON.parse(window.sessionStorage.getItem('order')))
        getTotalPrice = () => cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
        console.log(getTotalPrice())
    }

  return <Card1>
      <FlexBetween mb={1}>
        <Typography color="grey.600">Subtotal:</Typography>
        {getTotalPrice!=null?
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(window.sessionStorage.getItem('total_price'))}
        </Typography>:<div />}
      </FlexBetween>

      {/*<FlexBetween mb={1}>
        <Typography color="grey.600">Shipping:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(0)}
        </Typography>
      </FlexBetween>*/}

      <FlexBetween mb={1}>
        <Typography color="grey.600">Tax:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {typeof window !== 'undefined'? currency(window.sessionStorage.getItem('total_price')/10): currency(0)}
        </Typography>
      </FlexBetween>

      <FlexBetween mb={2}>
        <Typography color="grey.600">Discount:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(0)}
        </Typography>
      </FlexBetween>

      <Divider sx={{
      mb: "1rem"
    }} />

      <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb={3}>
        {typeof window !== 'undefined'? currency(window.sessionStorage.getItem('total_price')*1.1): currency(0)}
      </Typography>

      {/*<TextField placeholder="Voucher" variant="outlined" size="small" fullWidth />
      <Button variant="outlined" color="primary" fullWidth sx={{
      mt: "1rem",
      mb: "30px"
    }}>
        Apply Voucher
      </Button>*/}
    </Card1>;
};
export default CheckoutSummary;