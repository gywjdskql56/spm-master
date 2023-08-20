import Link from "next/link";
import { format } from "date-fns";
import { East } from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { currency } from "lib";
import { useRouter } from 'next/router';

// =================================================

const OrderRow = ({
  order
}) => {
  const router = useRouter()
  const getColor = status => {
    switch (status) {
      case "주문 접수":
        return "secondary";
      case "주문처리중":
        return "secondary";
      case "예약확정":
        return "success";
      case "주문취소":
        return "error";
      default:
        return "";
    }
  };
  function ToDetails(){
    console.log('Click')
    router.push({
      pathname: '/orders/'+order.payId,
      query: { result: JSON.stringify(order)}
    },"/orders/"+order.payId);
  }
  console.log(order)
  return <div onClick={()=>ToDetails()}>
      <a>
        <TableRow sx={{
        my: "1rem",
        padding: "6px 18px"
      }}>
          <H5 m={0.75} textAlign="left">
            {order.payId}
          </H5>

          <Box m={0.75}>
            <Chip size="small" label={order.paypalOrderStatus} sx={{
            p: "0.25rem 0.5rem",
            fontSize: 12,
            color: !!getColor(order.paypalOrderStatus) ? `${getColor(order.paypalOrderStatus)}.900` : "inherit",
            backgroundColor: !!getColor(order.paypalOrderStatus) ? `${getColor(order.paypalOrderStatus)}.100` : "none"
          }} />
          </Box>

          <Typography className="pre" m={0.75} textAlign="left">
            {format(new Date(order.orderCreatedDate), "yyyy-MM-dd")}
          </Typography>

          <Typography m={0.75} textAlign="left">
            {currency(order.payedTotalPrice)}
          </Typography>

          <Typography color="grey.600" textAlign="center" sx={{
          flex: "0 0 0 !important",
          display: {
            xs: "none",
            md: "block"
          }
        }}>
            <IconButton>
              <East fontSize="small" color="inherit" sx={{
              transform: ({
                direction
              }) => `rotate(${direction === "rtl" ? "180deg" : "0deg"})`
            }} />
            </IconButton>
          </Typography>
        </TableRow>
      </a>
    </div>;
};
export default OrderRow;