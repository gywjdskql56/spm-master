import { Box, Button, Grid } from "@mui/material";
import { H2, H3, H5, H6 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { FlexBox, FlexRowCenter } from "../flex-box";
import Typography from '@mui/material/Typography';
import Image from 'mui-image'
// ======================================================

// ======================================================

const ProductDescription = ({explain}) => {
  return <Box style={{backgroundColor:"#E2E6ED"}} sx={{ borderRadius: '16px',p: 2, m:2 }}>

      <Box sx={{ borderRadius: '16px',p: 2 }}>
      <H2 mb={2}>Overview</H2>
      <Box sx={{borderColor:"grey.500",border: 2,borderRadius: '16px',p: 2}}>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
        <Typography variant="subtitle1">{explain}</Typography>
        <br />
        <br />
      </Box>

      <H5 mb={0}># Included</H5>
      <Button key="1" color="success" variant="contained" sx={{
          mb: 4.5,
          px: "1.75rem",
          height: 30,
          margin: 1
        }}><H6 mb={1} style={{color:'white'}}>{"Accomodation"}</H6>
      </Button>
      <Button key="1" color="success" variant="contained" sx={{
          mb: 4.5,
          px: "1.75rem",
          height: 30,
          margin: 1
        }}><H6 mb={1} style={{color:'white'}}>{"Hospital"}</H6>
      </Button>

      <H5 mb={0}># Not Included</H5>
      <Button key="1" color="error" variant="contained" sx={{
          mb: 4.5,
          px: "1.75rem",
          height: 30,
          margin: 1
        }}><H6 mb={1} style={{color:'white'}}>{"Flight"}</H6>
      </Button>



      <H3 mb={2}>Accommodation Information</H3>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
        {"[호텔 U5]\n"}
        {"요즘 핫한 을지로 호텔. 광장시장이 근처에 위치해 있으며, 서울 한가운데 위치해서 다른 도시로 가기 편리함"}
        <FlexBox justifyContent="left" mb={3}>
          <Image src={"/assets/images/products/Place/img_15.png"} width={300} priority={true} sx={{borderRadius: 8, p:2}} />
          <LazyImage alt={"title"} sx={{borderRadius: 8, p:2}} width={300} height={180} objectFit="contain" src={"/assets/images/products/Place/img_15.png"} />
        </FlexBox>
      </Box>

      <H3 mb={2}>Hospital Information</H3>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
        {"[서산제일병원]"}
        <FlexBox justifyContent="left" mb={3}>
        <div>
           <Image src={"/assets/images/products/Hospital/img_2.png"} width={300} priority={true} sx={{borderRadius: 8, p:2}} />
        </div>
          {/*<LazyImage alt={"title"} width={200} height={200} loading="eager" objectFit="contain" src={"/assets/images/products/Hospital/img_2.png"} />*/}
        </FlexBox>
      </Box>
      </Box>
      </Box>

    <Box sx={{ borderRadius: '16px',p: 2 }}>
      <H2 mb={2}>Detail</H2>
      <Box sx={{borderColor:"grey.500",border: 2,borderRadius: '16px',p: 2}} >
      <H3 mb={2}>Day 1</H3>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
        {"[경복궁 투어] \n한국 정통 궁의 모습을 느껴볼 수 있습니다"}
        <FlexBox justifyContent="left" mb={3}>
        <div>
          <Image src={"/assets/images/products/Place/img_1.png"} width={300} priority={true} sx={{borderRadius: 8, p:2}} />
        </div>
        </FlexBox>
      </Box>

      <H3 mb={2}>Day 2</H3>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
        {"[경복궁 투어] \n한국 정통 궁의 모습을 느껴볼 수 있습니다"}
        <FlexBox justifyContent="left" mb={3}>
        <div>
           <Image src={"/assets/images/products/Place/img_2.png"} width={300} priority={true} sx={{borderRadius: 8, p:2}} />
        </div>
        </FlexBox>
      </Box>

      <H3 mb={2}>Day 3</H3>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
        {"[콜로세움 투어] \n한국 정통 궁의 모습을 느껴볼 수 있습니다"}
        <FlexBox justifyContent="left" mb={3}>
        <div>
          <Image src={"/assets/images/products/Place/img_3.png"} width={300} priority={true} sx={{borderRadius: 8, p:2}} />
        </div>
        </FlexBox>
      </Box>
      </Box>
      </Box>
    </Box>;
};
export default ProductDescription;