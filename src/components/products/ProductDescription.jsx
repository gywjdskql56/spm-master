import { Box, Button, Grid } from "@mui/material";
import { H2, H3, H5, H6 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { FlexBox, FlexRowCenter } from "../flex-box";
import Typography from '@mui/material/Typography';
import Image from 'mui-image'
// ======================================================

// ======================================================

const ProductDescription = ({explain}) => {
 console.log(explain)
 console.log(explain.type)
  return <Box style={{backgroundColor:"#E2E6ED"}} sx={{ borderRadius: '16px',p: 2, m:2 }}>

      <Box sx={{ borderRadius: '16px',p: 2 }}>
      <H2 mb={2}>Overview</H2>
      <Box sx={{borderColor:"grey.500",border: 2,borderRadius: '16px',p: 2}}>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
        <Typography variant="subtitle1">{explain.productDetails.description}</Typography>
        <br />
        <br />
      </Box>

      <H5 mb={0}># Included</H5>
      {explain.includedPartList.map(item=><Button key="1" color="success" variant="contained" sx={{
          mb: 4.5,
          px: "1.75rem",
          height: 30,
          margin: 1
        }}><H6 mb={1} style={{color:'white'}}>{item}</H6>
      </Button>)}

      <H5 mb={0}># Not Included</H5>
      {explain.nonIncludedPartList.map(item=><Button key="1" color="error" variant="contained" sx={{
          mb: 4.5,
          px: "1.75rem",
          height: 30,
          margin: 1
        }}><H6 mb={1} style={{color:'white'}}>{item}</H6>
      </Button>)}


       {explain.type==1?
       <div>
      <H3 mb={2}>Accommodation Information</H3>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
      <div style={{whiteSpace: "pre-line"}}>
        {explain.accommodationDetails.description}
      </div>
        <FlexBox justifyContent="left" mb={3}>
          {explain.accommodationDetails.imageList.map((url, ind) => <Image src={`data:image/png;base64,${url.imageBase64String}`} width={300} height={200} priority={true} sx={{borderRadius: 8, p:2}} />)}
          {/*<Image src={"/assets/images/products/Place/img_14.png"} width={300} priority={true} sx={{borderRadius: 8, p:2}} />*/}
          {/*<LazyImage alt={"title"} sx={{borderRadius: 8, p:2}} width={300} height={180} objectFit="contain" src={"/assets/images/products/Place/img_15.png"} />*/}
        </FlexBox>
      </Box></div>:<div/>}

      <H3 mb={2}>Hospital Information</H3>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
      <div style={{whiteSpace: "pre-line"}}>
        {explain.hospitalDetails.description}
      </div>
        <FlexBox justifyContent="left" mb={3}>
          {explain.hospitalDetails.imageList.map((url, ind) => <Image src={`data:image/png;base64,${url.imageBase64String}`} width={300} height={200} priority={true} sx={{borderRadius: 8, p:2}} />)}

        {/*<div>
           <Image src={"/assets/images/products/Hospital/img_2.png"} width={300} priority={true} sx={{borderRadius: 8, p:2}} />
        </div>*/}
          {/*<LazyImage alt={"title"} width={200} height={200} loading="eager" objectFit="contain" src={"/assets/images/products/Hospital/img_2.png"} />*/}
        </FlexBox>
      </Box>
      </Box>
      </Box>
{explain.type==1?
    <Box sx={{ borderRadius: '16px',p: 2 }}>
      <H2 mb={2}>Detail</H2>
      <Box sx={{borderColor:"grey.500",border: 2,borderRadius: '16px',p: 2}} >

      {explain.courseDetailsList.map((item,ind) => (<div><H3 mb={2}>{"Day "+item.day}</H3>
      <Box style={{backgroundColor:"white"}} sx={{ borderRadius: '16px',p: 2 }}>
      <div style={{whiteSpace: "pre-line"}}>
        {item.description}
      </div>
        <FlexBox justifyContent="left" mb={3}>
          {item.imageList.map((url, ind) => <Image src={`data:image/png;base64,${url.imageBase64String}`} width={300} height={200} priority={true} sx={{borderRadius: 8, p:2}} />)}
        </FlexBox>
      </Box></div>))}

      </Box>
      </Box>:<div/>}
    </Box>;
};
export default ProductDescription;