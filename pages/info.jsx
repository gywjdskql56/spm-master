import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SEO from "components/SEO";
import Setting from "components/Setting";
import { Box, Container, Grid, styled } from "@mui/material";
// import Newsletter from "components/Newsletter";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/info/Section1";
import Section2 from "pages-sections/info/Section2";
import Section3 from "pages-sections/info/Section3";
import Section4 from "pages-sections/info/Section4";
import Section5 from "pages-sections/info/Section5";
import Section6 from "pages-sections/info/Section6";
import Section7 from "pages-sections/info/Section7";
import Section8 from "pages-sections/info/Section8";
import Section10 from "pages-sections/info/Section10";
import Section11 from "pages-sections/info/Section11";
import Section12 from "pages-sections/info/Section12";
import Section13 from "pages-sections/info/Section13";
import Typography from '@mui/material/Typography';
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import LazyImage from "components/LazyImage";
import Image from "components/BazaarImage";
import Slider from "react-slick";


// =================================================================

const MarketShop = props => {
      const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
  return <ShopLayout1>
      <SEO title="Market v1" />

      <Container sx={{
    mb: "70px",backgroundColor: 'transparent',//"#ffffff",
  }}>
  <Grid container spacing={3}>
  <Grid item lg={4} md={4} xs={4} />
  <Grid item lg={1} md={1} xs={1}>
          {/*<BazaarImage src={`/assets/images/logos/staynlive.png`} alt={"staynlive"} sx={{
              mb: "1.5rem",
              height: 50
            }} />*/}
   </Grid>
   <Grid item lg={5} md={5} xs={5}>
      <Typography variant="h5" fontWeight="600" mb={1}>
         About Allmeditrip
      </Typography>
  </Grid>
  </Grid>
        <hr
        style={{
          background: 'grey',
          color: 'grey',
          borderColor: 'grey',
          height: '1px',
        }}
      />

      <Grid container spacing={3}>
      <Grid item lg={0.5} md={0.5} xs={0.5} />
        <Grid item lg={3.5} md={3.5} xs={3.5} >
        <Image src={"/assets/images/hotel/img_4.jpeg"} width={380} priority={true} sx={{borderRadius: 8, p:2}} />
          {/*  <LazyImage alt={"staynlive"} sx={{borderRadius: 8, p:2}} width={400} height={400} loading="eager" objectFit="contain" src={"/assets/images/hotel/img.png"} /> */}
          </Grid>
          <Grid item lg={8} md={8} xs={8} >
          <Box style={{backgroundColor:"#E2E6ED"}} sx={{borderRadius: 4,p: 5,m: 2}}>
          <H1 textAlign="left" fontSize="26px" lineHeight="1" mt={1}>
                {"Welcome to Allmeditrip"}
          </H1>
          <Typography textAlign="left" fontSize="14px" lineHeight="1" mt={2} sx={{p:2}}>
                {"Allmeditrip guarantees the dignity and respect of customers. Allmeditrip has an incomparable reputation and representativeness with delicate and elegant facilities and services.We provide guaranteed services and facilities anywhere in the world, providing unwavering satisfaction to our customers.We promise to impress you with thoughtful service that matches your leisure and pride in enjoying a high-class life."}
          </Typography>
          </Box>
          </Grid>
      </Grid>
      <Typography variant="h7" fontWeight="100" mb={1}>
         
      </Typography>
      <Section1 />
</Container>
      {/* CATEGORIES */}
{/*      <Section10 categories={props.bottomCategories} />*/}

      {/* MOBILE PHONES */}
{/*      <Section7 shops={props.mobileShops} brands={props.mobileBrands} productList={props.mobileList} />*/}


      {/* HERO SLIDER SECTION */}
{/*      <Section1 carouselData={props.mainCarouselData} />*/}

      {/* FLASH DEALS SECTION */}
{/*      <Section2 flashDeals={props.flashDealsData} />*/}

      {/* TOP CATEGORIES */}
{/*      <Section3 categoryList={props.topCategories} />*/}

      {/* TOP RATED PRODUCTS */}
{/*       <Section4 topRatedList={props.topRatedProducts} topRatedBrands={props.topRatedBrands} />*/}

      {/* NEW ARRIVAL LIST */}
{/*       <Section5 newArrivalsList={props.newArrivalsList} /> */}

      {/* BIG DISCOUNTS */}
{/*       <Section13 bigDiscountList={props.bigDiscountList} /> */}

      {/* CAR LIST */}
{/*       <Section6 carBrands={props.carBrands} carList={props.carList} /> */}

      {/* PROMO BANNERS */}
{/*       <Section8 /> */}

      {/* OPTICS / WATHCH */}
{/*       <Section7 title="Optics / Watch" shops={props.opticsShops} brands={props.opticsBrands} productList={props.opticsList} /> */}

      {/* MORE FOR YOU */}
{/*       <Section11 moreItems={props.moreItems} /> */}

      {/* SERVICE CARDS */}
{/*      <Section12 serviceList={props.serviceList} /> */}

      {/* POPUP NEWSLETTER FORM */}
{/*       <Newsletter /> */}

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      {/*<Setting />*/}
    </ShopLayout1>;
};
export const getStaticProps = async ({
  locale
}) => {
  let locales = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
    props: {
      ...locales,
    }
  };
};
export default MarketShop;