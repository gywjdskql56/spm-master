import { Fragment } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import * as yup from "yup";
import { Done, ShoppingBag } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Divider, Grid, Typography, styled, Rating, TextField } from "@mui/material";
import TableRow from "components/TableRow";
import Delivery from "components/icons/Delivery";
import PackageBox from "components/icons/PackageBox";
import TruckFilled from "components/icons/TruckFilled";
import { H2, H5, H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import useWindowSize from "hooks/useWindowSize";
import { currency } from "lib";
import { useState, useEffect } from "react";
import api from "utils/__api__/orders";
import { targetUrl, getAuth } from "components/config";
import { useFormik } from "formik";
// styled components
const StyledFlexbox = styled(FlexBetween)(({
  theme
}) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4
    }
  }
}));
// =============================================================

const OrderDetails = ({
  order
}) => {
  console.log("order")
  console.log(order)
  const [itemList, setItemList] = useState(null);
  const [refund, setRefund] = useState(null);
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(false);
  const [review2, setReview2] = useState(false);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  const width = useWindowSize();
  const orderStatus = "Shipping";
  const orderStatusList = ["Packaging", "Shipping", "Delivering", "Complete"];
  const stepIconList = [PackageBox, TruckFilled, Delivery];
  const breakpoint = 350;
  const statusIndex = orderStatusList.indexOf(orderStatus);
  function getRefund() {
    console.log("Click")
    if (format(new Date(), "yyyy-MM-dd")>itemList.travelStartDate){
        window.alert("REFUND IS NOT AVAILABLE AFTER THE TRAVEL START DATE")
    }else{
    if(window.confirm("Do you want to get a refund?")){
    fetch(targetUrl + "/checkout/refund/"+itemList.payId, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  }).then(response => response.json())
    .then(response => {console.log(response); if (response.status=="success") {window.alert("$"+response.data.refundedPrice+" is refunded")} else {window.alert(response.message)}})
  }else{
  console.log("no")
  }
  }}
  function getReview() {
  console.log("review")
  fetch(targetUrl + "/review/member/"+itemList.payId, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  }).then(response => response.json())
    .then(response => {console.log(response); if (response.status=="success") {console.log(response.data);setReviews(response.data); setReview2(true)} else {console.log("Review not exist");setReview(true)}})
  }

  const handleFormSubmit = async (values, {
    resetForm
  }) => {
  console.log(values.rating)
  console.log(values.comment)
  fetch(targetUrl + "/review", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
     body: JSON.stringify({"payId" : itemList.payId,
    "rating" : values.rating,
    "contents" : values.comment })
  }).then(response => response.json())
    .then(response => {console.log(response); if (response.status=="success") {window.alert("Your review has been registered")} else {window.alert("Review registration failed")}})
    {/*if (window.sessionStorage.getItem('id')==null){
        window.alert("Please try again after logging in.")
    }
    else{
    console.log('complete')
    console.log(values)
    fetch('http://localhost:5003/insert_review',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'date': values.date,'review': values.comment,'rating': values.rating, 'email':window.sessionStorage.getItem('id'), 'product_id':product_id})
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.response);
    if(response.response=='success'){
        if (typeof window !== "undefined") {
            window.alert("Your comment has successfully registered.")
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("Comment registration failed. please try again.")
            }
    }})}*/}
    resetForm();
  }
    const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
    validationSchema: reviewSchema
  });
  function checkRefund() {
    console.log("check")
    console.log(itemList.travelStartDate)
    console.log(format(new Date(), "yyyy-MM-dd"))
    console.log(format(new Date(), "yyyy-MM-dd")>itemList.travelStartDate)
    if (format(new Date(), "yyyy-MM-dd")>itemList.travelStartDate){
        window.alert("REFUND IS NOT AVAILABLE AFTER THE TRAVEL START DATE")
    }else{
    fetch(targetUrl + "/checkout/refundable/"+itemList.payId, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  }).then(response => response.json())
    .then(response => {console.log(response); if (response.status=="success") {setRefund(response.data); setOpen(true)}})}
  }

  // SECTION TITLE HEADER
  const HEADER_BUTTON = <Button color="primary" onClick={() => {if (typeof window !== "undefined") {window.location.href="/orders"}}} sx={{
    bgcolor: "primary.light",
    px: 4
  }}>
      Back To List
    </Button>;
useEffect(() => {
  if (router.query==''|| router.query.result==undefined || router.query.result==null){
    if (typeof window !== "undefined") {
      window.alert('Invalid approach')
      window.location.href = "/orders"
    }
  } else {
    setItemList(JSON.parse(router.query.result))
    console.log("router.query.result")
    console.log(JSON.parse(router.query.result))
  }
  },[])

  // Show a loading state when the fallback is rendered
  if (router.isFallback||router.query==''|| router.query.result==undefined || router.query.result==null) {
    return <h1>Loading...</h1>;
  }

  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader icon={ShoppingBag} title="Order Details" navigation={<CustomerDashboardNavigation />} button={HEADER_BUTTON} />
            <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          {itemList!=null? <Typography p="0.5rem 1rem" textAlign="center" borderRadius="300px" color="primary.main" bgcolor="primary.light">
             <b>{itemList.paypalOrderStatus}</b>
          </Typography>:<div />}
          </FlexBox>

      {/*<Card sx={{
          p: "2rem 1.5rem",
          mb: "30px"
        }}>
        <StyledFlexbox>
          {/*stepIconList.map((Icon, ind) => <Fragment key={ind}>
              <Box position="relative">
                <Avatar sx={{
              width: 64,
              height: 64,
              bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
              color: ind <= statusIndex ? "grey.white" : "primary.main"
            }}>
                  <Icon color="inherit" sx={{
                fontSize: "32px"
              }} />
                </Avatar>

                {ind < statusIndex && <Box position="absolute" right="0" top="0">
                    <Avatar sx={{
                width: 22,
                height: 22,
                bgcolor: "grey.200",
                color: "success.main"
              }}>
                      <Done color="inherit" sx={{
                  fontSize: "1rem"
                }} />
                    </Avatar>
                  </Box>}
              </Box>

              {ind < stepIconList.length - 1 && <Box className="line" bgcolor={ind < statusIndex ? "primary.main" : "grey.300"} />}
            </Fragment>)
        </StyledFlexbox>
      </Card>*/}

      {/* ORDERED PRODUCT LIST */}
      {itemList!=null? <Card sx={{
      p: 0,
      mb: "30px"
    }}>
        <TableRow sx={{
        p: "12px",
        borderRadius: 0,
        boxShadow: "none",
        bgcolor: "grey.200"
      }}>
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Order ID:
            </Typography>

            <Typography fontSize={14}>{itemList.payId}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Order Created At:
            </Typography>

            <Typography fontSize={14}>
              {format(new Date(itemList.orderCreatedDate), "yyyy-MM-dd")}
            </Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Travel Start Date:
            </Typography>

            <Typography fontSize={14}>
              {format(new Date(itemList.travelStartDate), "yyyy-MM-dd")}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py={1}>
          <FlexBox px={2} py={1} flexWrap="wrap" alignItems="center" key={"1"}>
              <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
               {/* <Avatar src={itemList.product_img} sx={{
              height: 64,
              width: 64
            }} />*/}
                <Box ml={2.5}>
                  <H6 my="0px">{itemList.productName}</H6>

                  <Typography fontSize="14px" color="grey.600">
                    {currency(itemList.productSalePrice)} x {1}
                  </Typography>
                </Box>
              </FlexBox>

              <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600">
                  Options :
                </Typography>
                {itemList.optionFeeInfoList.map((val, idx)=>
                <Typography fontSize="14px" color="grey.600">
                  {val.name+", "}
                </Typography>)}
              </FlexBox>

              {/*<FlexBox flex="160px" m={0.75} alignItems="center">
                <Button variant="text" color="primary">
                  <Typography fontSize="14px">리뷰 작성</Typography>
                </Button>
              </FlexBox>*/}
            </FlexBox>
        </Box>
      </Card>:
      <div />}


      <Grid container spacing={3}>
       {/*} <Grid item lg={6} md={6} xs={12}>
          <Card sx={{
          p: "20px 30px"
        }}>
            <H5 mt={0} mb={2}>
              주문자 주소
            </H5>

            <Paragraph fontSize={14} my={0}>
              {order.shippingAddress}
            </Paragraph>
          </Card>
        </Grid>*/}

        <Grid item lg={6} md={6} xs={12}>
          {itemList!=null?<Card sx={{
          p: "20px 30px"
        }}>
            <H5 mt={0} mb={2}>
              Amount of payment
            </H5>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Product price:
              </Typography>

              <H6 my="0px">{currency(order.totalPrice)}</H6>
            </FlexBetween>


              {itemList.optionFeeInfoList.map((val, idx)=>
              <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {"Option("+val.name+"):"}
              </Typography>

              <H6 my="0px">{currency(val.price)}</H6>
            </FlexBetween>)}

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Discount:
              </Typography>

              <H6 my="0px">{currency(0)}</H6>
            </FlexBetween>

            <Divider sx={{
            mb: 1
          }} />

            <FlexBetween mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">{currency(itemList.payedTotalPrice)}</H6>
            </FlexBetween>

          </Card>:<div />}

        </Grid>
       <Grid item lg={6} md={6} xs={12}>
          <Card sx={{
          p: "20px 30px"
        }}>
         <H5 mt={0} mb={2}>
              Refund
            </H5>
            <div>
            <Button color="primary" onClick={()=>checkRefund()} sx={{
                bgcolor: "primary.light",
                px: 4
              }}>
                  Check Refundable Amount
                </Button>
                </div>

            {open? <div>
            <H6 mt={0} mb={2}>
            {" "}
            </H6>
            <H6 mt={0} mb={2} color="gray" >
              {"Standard Time(KST) : "+refund.now}
            </H6>
            <H6 mt={0} mb={2} color="gray" >
              {"Time Left Until Departure : "+refund.leftDays+"Days - T"+refund.leftHours+":"+refund.leftMins+":"+refund.leftSecs}
            </H6>
            <H6 mt={0} mb={2} color="gray" >
              {"Refundable Percent : "+refund.refundablePercent}
            </H6>
            <H6 mt={0} mb={2} color="gray" >
              {"Refundable Amount : "+refund.refundablePrice}
            </H6></div>: <div />}
            <H6 mt={0} mb={2}>
            {" "}
            </H6>

                <div>
              <Button color="error" onClick={()=>getRefund()} sx={{
                bgcolor: "error.light",
                px: 4
              }}>
                  Get Refund
              </Button>
              </div>
        </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{
          p: "20px 30px"
        }}>
         <H5 mt={0} mb={2}>
              Review
            </H5>
            {review2?
             <div>
        <div>
        <Card sx={{
          p: "20px 30px"
        }}>
        <H6 mt={0} mb={2}>
              {"Rating: "+reviews.rating}
            </H6>
            </Card>
            </div>
        <div>
        <Card sx={{
          p: "20px 30px"
        }}>
        <H6 mt={0} mb={2}>
              {reviews.contents}
            </H6>
            </Card>
            </div>
            </div>:
            <div />}
            {itemList!=null && itemList.paypalOrderStatus=="COMPLETED" && itemList.travelEndDate<format(new Date(), "yyyy-MM-dd")? <Button color="error" onClick={()=>getReview()} sx={{
                bgcolor: "error.light",
                px: 4
              }}>
                  Write Review
              </Button>
              :<div/>}


              {review? <Box>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Service satisfaction</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating color="warn" size="medium" value={values.rating} onChange={(_, value) => {setFieldValue("rating", value); console.log(values)}} />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Write a review</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField rows={8} multiline fullWidth name="comment" variant="outlined" onBlur={handleBlur} value={values.comment} onChange={handleChange} placeholder="If you leave a detailed review, it will help others!" error={!!touched.comment && !!errors.comment} helperText={touched.comment && errors.comment} />
        </Box>

        <Button variant="contained" color="primary" type="submit" disabled={!(dirty && isValid)}>
          저장
        </Button>
      </form>
    </Box>:<div />}
         </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>;
};
export const getStaticPaths = async () => {
  const paths = await api.getIds();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};
const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString()
};
const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required")
});

export const getStaticProps = async ({
  params
}) => {
  const order = await api.getOrder(String("f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"));
  return {
    props: {
      order
    }
  };
};
export default OrderDetails;