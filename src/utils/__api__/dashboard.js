import axios from "axios";
import { targetUrl } from "components/config";
// dashboard
const getAllCard = async () => {
  const response = await axios.get("/api/admin/dashboard-cards");
  return response.data;
};
const recentPurchase = async () => {
  const response = await axios.get("/api/admin/recent-purchase");
  return response.data;
};
const stockOutProducts = async () => {
  const response = await axios.get("/api/admin/stock-out-products");
  return response.data;
};

// products
const products = async () => {
  const response = await axios.get("/api/admin/products");
  return response.data;
};
const category = async () => {
  const response = await axios.get("/api/admin/category");
  return response.data;
};
const brands = async () => {
  const response = await axios.get("/api/admin/brands");
  return response.data;
};
const reviews = async () => {
  const response = await axios.get(targetUrl+"/sysqnas" );
  console.log(response)
  return response.data;
};

// orders
const orders = async () => {
  const response = await axios.get("/api/admin/orders");
  return response.data;
};
const getOrder = async id => {
  const response = await axios.get("/api/admin/orders/1", {
    params: {
      id
    }
  });
  return response.data;
};

// customers
const customers = async () => {
  const response = await axios.get("/api/admin/customers");
//  const res = await fetch(targetUrl+"/members/infos",{
//          credentials : 'include',
//          method: 'GET',
//          headers: {
//            'Content-Type': 'application/json',
//            "ngrok-skip-browser-warning": true,
//        }})
//  const data = await res.json();
//  const data2 = data.data;
//  console.log(data);

  return response.data;
};

// refund request
const refundRequests = async () => {
  const response = await axios.get("/api/admin/refund-requests");
  return response.data;
};

// sellers
const sellers = async () => {
  const response = await axios.get("/api/admin/sellers");
  return response.data;
};
const packagePayments = async () => {
  const response = await axios.get("/api/admin/package-payments");
  return response.data;
};
const earningHistory = async () => {
  const response = await axios.get("/api/admin/earning-history");
  return response.data;
};
const payouts = async () => {
  const response = await axios.get("/api/admin/payouts");
  return response.data;
};
const payoutRequests = async () => {
  const response = await axios.get("/api/admin/payout-requests");
  return response.data;
};
export default {
  brands,
  orders,
  reviews,
  sellers,
  payouts,
  products,
  category,
  getOrder,
  customers,
  getAllCard,
  payoutRequests,
  recentPurchase,
  refundRequests,
  earningHistory,
  packagePayments,
  stockOutProducts
};