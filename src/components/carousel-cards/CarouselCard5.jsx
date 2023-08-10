import { Favorite } from "@mui/icons-material";
import { Box, Button, Grid, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { H2, H3, H4, Paragraph } from "components/Typography";
import Countdown from "pages-sections/fashion-shop-1/countdown";
import { useState } from "react";
import Modal from '@mui/material/Modal';
import LazyImage from "components/LazyImage";
// styled component
const ContentWrapper = styled(Box)(({
  theme
}) => ({
  [theme.breakpoints.down("sm")]: {
    "&": {
      padding: "2rem",
      width: "100%"
    }
  },
  [theme.breakpoints.between("sm", "md")]: {
    "&": {
      padding: "0 3rem",
      paddingBottom: "2rem",
      width: "80%"
    }
  }
}));

// ================================================================

// ================================================================

const CarouselCard5 = ({
  title,
  description,
  imgUrl,
  productName,
  content,
  expireDate
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };
  return <Grid container alignItems="center" justifyContent="center">
      {/* <Grid item lg={6} md={5} sm={12} xs={12}>
        <BazaarImage src={imgUrl} alt="xiaomi-watch-1" sx={{
        display: "block",
        mx: "auto",
        maxWidth: "100%",
        p: 5
      }} />
      </Grid> */}

      <Grid item lg={11} md={11} sm={11} xs={11}>
        {/* <ContentWrapper backgroundColor="#E2E6ED" borderRadius="8px"> */}
        <ContentWrapper>
        <BazaarImage src={imgUrl} alt="xiaomi-watch-1" sx={{
        display: "block",
        mx: "auto",
        maxWidth: "100%",
        // height:"200px",
        // width:"300px",
        p: 5
      }} />
          <H3 color="black" mb="0.2rem" textAlign="center">
             {title}
          </H3>
          <H2>{productName}</H2>

          <Paragraph mt="0.3rem">
            {description}
          </Paragraph>

          {/* <H4 mt="1.5rem" mb="0.3rem">
            Fresh Deal Everyday, Get It Now!
          </H4> */}

          {/* countdown time */}
          {/* <Countdown expireDate={expireDate} /> */}

          <Box mt={3}>
            <Button color="primary" disableElevation variant="contained" className="button-link" onClick={()=>{console.log(open);setOpen(prev=>!prev)}} sx={{
            px: "1.75rem",
            height: "30px",
            borderRadius: "8px",
            mr: "1rem"
          }}>
              View Detail
            </Button> 

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: "auto" }}
            // disableScrollLock={true}
          >
            
          <Box sx={style}>
          <H3 color="black" mb="0.2rem" textAlign="center">
          {/* <Text>{title}</Text> */}
          {title}
          </H3>
          <BazaarImage alt={title} width={"100%"} height="100%" loading="eager" objectFit="contain" src={imgUrl} />
           {/* <LazyImage alt={title} width={"100%"} height="100%" loading="eager" objectFit="contain" src={imgUrl} /> */}
           {/* <Paragraph mt="0.3rem">
            {content}
          </Paragraph> */}
          <Paragraph mt="0.3rem">
          {content.split('\n').map(str => <p>{str}</p>)}
          </Paragraph>
          </Box>
          </Modal>


          </Box>
        </ContentWrapper>
      </Grid>
    </Grid>;
};
export default CarouselCard5;