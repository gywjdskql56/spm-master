import { useState, useEffect } from "react";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../StyledComponents";
import { currency } from "lib";
import { targetUrl, weburl } from "components/config";
// ========================================================================

// ========================================================================
 {/*
           {
  businessRegistrationNumber: "+12343458910", //phone
  balance: 12_350.45, //balance
  companyName: "모두투어", //shopName
  companyType: "유치업자", //name
  phoneNum: "010-1234-5678", //package
  email: "hana@gmail.com", //published
  approvedDate: "2023-06-11T11:30:30"
}
        */}
const SellerRow = ({
  seller
}) => {
  const {
    businessRegistrationNumber,
    companyName,
    companyType,
    phoneNum,
    email,
    approvedDate,
  } = seller;
//  const [shopPulish, setShopPublish] = useState(published);
  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {/*<Avatar src={image} alt={name} />*/}
          <Box>
            <Paragraph>{businessRegistrationNumber}</Paragraph>
            {/*<Small color="grey.600">{phone}</Small>*/}
          </Box>
        </FlexBox>
      </StyledTableCell>

      {/*<StyledTableCell align="left">{balance}</StyledTableCell>*/}

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {companyName}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {companyType}
      </StyledTableCell>

      <StyledTableCell align="left">
        {/*<BazaarSwitch color="info" checked={shopPulish} onChange={() => setShopPublish(state => !state)} />*/}
        {phoneNum}
      </StyledTableCell>

      <StyledTableCell align="left">
        {/*<BazaarSwitch color="info" checked={shopPulish} onChange={() => setShopPublish(state => !state)} />*/}
        {email}
      </StyledTableCell>

      <StyledTableCell align="left">
        {/*<BazaarSwitch color="info" checked={shopPulish} onChange={() => setShopPublish(state => !state)} />*/}
        {approvedDate}
      </StyledTableCell>

      {/*<StyledTableCell align="center">
        <StyledIconButton>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>*/}
    </StyledTableRow>;
};
export default SellerRow;