import { Divider } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { currency } from "lib";
const PaymentSummary = ({itemList}) => {
  const getTotalPrice = () => itemList.reduce((accum, item) => accum + item.price * item.qty, 0);
  return <Card1>
      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(getTotalPrice())}
        </Paragraph>
      </FlexBetween>

      {/* <FlexBetween mb={1}>
        <Paragraph color="grey.600">Shipping:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          -
        </Paragraph>
      </FlexBetween> */}

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Tax:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(getTotalPrice()/10)}
        </Paragraph>
      </FlexBetween>

      {/* <FlexBetween mb={2}>
        <Paragraph color="grey.600">Discount:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          -
        </Paragraph>
      </FlexBetween> */}

      <Divider sx={{
      mb: 2
    }} />

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1} textAlign="right">
        {currency(getTotalPrice()*1.1)}
      </Paragraph>
    </Card1>;
};
export default PaymentSummary;