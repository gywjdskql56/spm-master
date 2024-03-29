import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarRating from "components/BazaarRating";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { getDateDifference } from "lib";

// ===========================================================

// ===========================================================

const ProductComment = props => {
  const {
    productReviewId,
    memberEmail,
    contents,
    rating,
    writeDate,
    updateDate
  } = props;
  return <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
{/*        <Avatar src={imgUrl} sx={{
        width: 48,
        height: 48
      }} />*/}
        <Box ml={2}>
          <H5 mb={0.5}>{memberEmail}</H5>
          <FlexBox alignItems="center">
            <BazaarRating value={rating} color="warn" readOnly />
            <H6 mx={1.25}>{rating}</H6>
            <Span>{getDateDifference(writeDate)}</Span>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="grey.700">{contents}</Paragraph>
    </Box>;
};
export default ProductComment;