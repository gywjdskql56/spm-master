import { Pagination } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import OrderRow from "pages-sections/orders/OrderRow";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/orders";
import { targetUrl } from "components/config";
import { Fragment, useState, useEffect } from "react";
// ====================================================

// ====================================================

const Orders = ({
  orderList,
  order
}) => {
    const [orders, setOrders] = useState([]);
    console.log("order")
    console.log(orderList)
    console.log(order)
    useEffect(() => {
    const orderRes = fetch(targetUrl + "/checkout/member", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  }).then(response => response.json())
    .then(response => {console.log(response); if (response.status=="success") {setOrders(response.data)}});}, [])

  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader title="My Order" icon={ShoppingBag} navigation={<CustomerDashboardNavigation />} />

      {/* ORDER LIST AREA */}
      <TableRow elevation={0} sx={{
      padding: "0px 18px",
      background: "none",
      display: {
        xs: "none",
        md: "flex"
      }
    }}>
        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Order ID
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Order Status
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Pay Date
        </H5>

        <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
          Pay Amount
        </H5>

        <H5 my={0} px={2.75} color="grey.600" flex="0 0 0 !important" display={{
        xs: "none",
        md: "block"
      }} />
      </TableRow>

      {orders!=[]? orders.map(order => <OrderRow order={order} key={order.payId} />): <div />}

      <FlexBox justifyContent="center" mt={5}>
        <Pagination count={5} color="primary" variant="outlined" onChange={data => console.log(data)} />
      </FlexBox>
    </CustomerDashboardLayout>;
};
export const getStaticProps = async () => {
  const orderList = await api.getOrders();
  const orderRes = await fetch(targetUrl + "/checkout/member", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  const order = await orderRes.json();
  console.log(order)
  return {
    props: {
      orderList,
      order
    }
  };
};
export default Orders;