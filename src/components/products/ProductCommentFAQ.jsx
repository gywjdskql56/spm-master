import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarRating from "components/BazaarRating";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { getDateDifference } from "lib";

// ===========================================================

// ===========================================================
//answer
//answerDate
//answerUpdateDate
//contents
//email
//oauthProvider
//open
//productqnaId
//title
//type
//updateDate
//writeDate

const ProductComment = props => {
  const {
  answer,
  answerDate,
  answerUpdateDate,
  contents,
  email,
  oauthProvider,
  open,
  productqnaId,
  title,
  type,
  updateDate,
  writeDate
  } = props;
  return <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
{/*        <Avatar src={imgUrl} sx={{
        width: 48,
        height: 48
      }} />*/}
        <Box ml={2}>
        <Box sx={{borderColor:"grey.500",border: 2,borderRadius: '16px',p: 2}}>
          <H5 mb={0.5}>{title}</H5>
          <Span mb={0.5}>{email}</Span> <Span>{" | "+ getDateDifference(writeDate)}</Span>
          <Box sx={{borderColor:"grey.700", borderRadius: '10px',p: 2,backgroundColor:"#E2E6ED"}}>
          <FlexBox alignItems="center">
          {open?
            <H6 mx={1.25}>{contents}</H6>:
            <H6 mx={1.25}>{"This is a private message"}</H6>
            }
          </FlexBox>
        </Box>
        <Box mb={2} />
        <Box sx={{borderColor:"grey.700", borderRadius: '10px',p: 2,backgroundColor:"#D3D3D3"}}>
          <FlexBox alignItems="center">
          {open?
            <H6 mx={1.25}>{answer}</H6>:
            <H6 mx={1.25}>{"This is a private message"}</H6>
            }
          </FlexBox>
        </Box>
        </Box>
        </Box>
      </FlexBox>

{/*      <Paragraph color="grey.700">{answer}</Paragraph>*/}
    </Box>;
};
export default ProductComment;