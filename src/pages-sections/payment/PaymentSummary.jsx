import { Divider } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { currency } from "lib";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { targetUrl } from "components/config";

const PaymentSummary = ({itemList}) => {
    console.log(itemList)
  const getTotalPrice = () => itemList.reduce((accum, item) => accum + item.price * item.qty, 0);
  function createOrder() {
    // replace this url with your server
    console.log("createOrder")
    var uriString = targetUrl;
    uriString+="/createOrder?productId=1&productSalePrice=400&startDate=2023-07-05&endDate=2023-07-09&";
    uriString+="optionFee="+encodeURIComponent("20,옵션비용테스트1")+"&"
    +"optionFee="+encodeURIComponent("30,옵션비용테스트2")+"&"
    +"optionFee="+encodeURIComponent("10,옵션비용테스트3")+"&";
    uriString+="additionalComments=additionalCommentsTest&";
    uriString+="firstName=firstNameTest&";
    uriString+="lastName=lastNameTest&";
    uriString+="phoneNumber=phoneNumberTest&";
    uriString+="email=emailTest&";
    uriString+="country=countryTest";
    window.open(uriString,'pop01','top=10,left=10,width=500,height=600,status=no,menubar=no,toolbar=no,resizable=no');
    return fetch(uriString, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
        },
    })
        .then((response) => response.json())
        .then((order) => {
            // Your code here after create the order
            console.log(order)
            return 1;
        });
}
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
        <Divider sx={{
          mb: 2
        }} />

           <PayPalScriptProvider options={{ clientId: "test", currency: "USD", intent: "capture", }}>
                <PayPalButtons style={{ layout: "horizontal" }} createOrder={createOrder} />
            </PayPalScriptProvider>
    </Card1>;
};
export default PaymentSummary;