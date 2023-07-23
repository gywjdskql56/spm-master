import { Delete, Edit } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "./StyledComponents";
import { currency } from "lib";

// ========================================================================

// ========================================================================

const CustomerRow = ({
  customer
}) => {
  const {
    email,
    firstName,
    lastName,
    phoneNum,
    avatar,
    country,
    joinDate
  } = customer;
  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar src={avatar} />
          <Paragraph>{firstName}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Paragraph>{lastName}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {phoneNum}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {email}
      </StyledTableCell>

     <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {country}
      </StyledTableCell>

      {/*<StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {currency(balance)}
      </StyledTableCell>*/}

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {joinDate}
      </StyledTableCell>

      {/*<StyledTableCell align="center">
        <StyledIconButton>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>*/}
    </StyledTableRow>;
};
export default CustomerRow;