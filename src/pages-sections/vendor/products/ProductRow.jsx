import { useState } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../StyledComponents";
import { targetUrl } from "components/config";
// ========================================================================

// ========================================================================

const ProductRow = ({
  product
}) => {
  console.log(product)
  const {
    category,
    name,
    price,
    image,
    region,
    id,
    published,
    slug
  } = product;
  const router = useRouter();
  const [productPulish, setProductPublish] = useState(published);
  const handleChange_open = (event) => {


    fetch(targetUrl + "/products/open/"+id, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  }).then((response) =>
        response.json())
    .then((data) =>
        {console.log(data.data);if(data.status=='success'){setProductPublish(data.data.current)}})


  }

  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar src={`data:image/png;base64,${image}`} sx={{
          borderRadius: "8px"
        }} />
          <Box>
            <Paragraph>{name}</Paragraph>
            <Small color="grey.600">#{id}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{region}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={productPulish} onClick={handleChange_open} /> {/*() => setProductPublish(state => !state)*/}
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/vendor/products/${slug}`)}>
          <Edit />
        </StyledIconButton>

        {/*<StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>*/}
      </StyledTableCell>
    </StyledTableRow>;
};
export default ProductRow;