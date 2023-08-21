import { useRouter } from "next/router";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { currency } from "lib";
import { StatusWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "../StyledComponents";
import { format } from "date-fns";

// ========================================================================

// ========================================================================

const OrderRow = ({
  order
}) => {
    console.log("order")
    console.log(order)
  const {
    productSalePrice,
    payId,
    orderCreatedDate,
    billingAddress,
    paypalOrderStatus,
    payedMemberEmail
  } = order;
  const router = useRouter();
  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">#{payId}</StyledTableCell>
      <StyledTableCell align="left">{1}</StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {format(new Date(orderCreatedDate), "dd MMM yyyy")}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {payedMemberEmail}
      </StyledTableCell>

      <StyledTableCell align="left">{currency(productSalePrice)}</StyledTableCell>

      <StyledTableCell align="left">
        <StatusWrapper status={paypalOrderStatus}>{paypalOrderStatus}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/orders/${payId}`)}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};
export default OrderRow;