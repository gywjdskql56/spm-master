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
import api from "utils/__api__/market-1";
import BazaarImage from "components/BazaarImage";
import LazyImage from "components/LazyImage";
import Image from "components/BazaarImage";


// =================================================================

const MarketShop = props => {
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
         About StaynLive
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
        <Grid item lg={4.5} md={4.5} xs={4.5} >
        <Image src={"/assets/images/hotel/img.png"} width={400} priority={true} sx={{borderRadius: 8, p:2}} />
          {/*  <LazyImage alt={"staynlive"} sx={{borderRadius: 8, p:2}} width={400} height={400} loading="eager" objectFit="contain" src={"/assets/images/hotel/img.png"} /> */}
          </Grid>
          <Grid item lg={7} md={7} xs={7} >
          <Box style={{backgroundColor:"#E2E6ED"}} sx={{borderRadius: 4,p: 5,m: 2}}>
          <H1 textAlign="left" fontSize="26px" lineHeight="1" mt={1}>
                {"Welcome to StaynLive"}
          </H1>
          <Typography textAlign="left" fontSize="14px" lineHeight="1" mt={2} sx={{p:2}}>
                {"StaynLive's history guarantees the dignity and respect of customers. StaynLive has an incomparable reputation and representativeness with delicate and elegant facilities and services.We provide guaranteed services and facilities anywhere in the world, providing unwavering satisfaction to our customers.We promise to impress you with thoughtful service that matches your leisure and pride in enjoying a high-class life."}
          </Typography>
          </Box>
          </Grid>
      </Grid>
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
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const moreItems = await api.getMoreItems();
  const mobileList = await api.getMobileList();
  const opticsList = await api.getOpticsList();
  const mobileShops = await api.getMobileShops();
  const opticsShops = await api.getOpticsShops();
  const serviceList = await api.getServiceList();
  const mobileBrands = await api.getMobileBrands();
  const flashDealsData = await api.getFlashDeals();
  const opticsBrands = await api.getOpticsBrands();
  const bottomCategories = await api.getCategories();
  const topCategories = await api.getTopCategories();
  const topRatedBrands = await api.getTopRatedBrand();
  const mainCarouselData = await api.getMainCarousel();
  const newArrivalsList = await api.getNewArrivalList();
  const bigDiscountList = await api.getBigDiscountList();
  const topRatedProducts = await api.getTopRatedProduct();
  let locales = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
    props: {
      ...locales,
      carList,
      carBrands,
      moreItems,
      mobileList,
      opticsList,
      serviceList,
      mobileShops,
      opticsShops,
      mobileBrands,
      opticsBrands,
      topCategories,
      flashDealsData,
      topRatedBrands,
      newArrivalsList,
      bigDiscountList,
      mainCarouselData,
      topRatedProducts,
      bottomCategories
    }
  };
};
export default MarketShop;