import { Avatar } from "@mui/material";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { StatusWrapper, StyledIconButton, StyledTableCell, StyledTableRow } from "./StyledComponents";
import { currency } from "lib";

// ========================================================================

// ========================================================================

const RefundRequestRow = ({
  request
}) => {
  const {
    productName,
    image,
    payId,
    payedMemberEmail,
    productSalePrice,
    paypalOrderStatus
  } = request;

  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        #{payId}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {payedMemberEmail}
      </StyledTableCell>

      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {/*<Avatar src={image} sx={{
          borderRadius: "8px"
        }} />*/}
          <Paragraph>{productName}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {currency(productSalePrice)}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        <StatusWrapper status={paypalOrderStatus}>{paypalOrderStatus}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="center">

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

      </StyledTableCell>
    </StyledTableRow>;
};
export default RefundRequestRow;