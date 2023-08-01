import { Box, Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { CarouselCard1 } from "components/carousel-cards";
// ======================================================
const mainCarouselData = [{
  title: "10% discount on package products for all customers for the month of February",
  imgUrl: "/assets/images/products/Ads/img_1.png",
  description: `Explore package products that allow you to tour all over Korea while receiving quality medical services at affordable prices.`,
  buttonText: "Learn more",
  buttonLik: "#"
}, {
  title: "Up to 50% discount on plastic surgery and procedure reservations for first-time customers",
  imgUrl: "/assets/images/products/Ads/img.png",
  description: `(Limited to plastic surgery and treatment items) First-time customers receive up to 50% discount.`,
  buttonText: "Learn more",
  buttonLik: "#"
}];
const Section1 = () => {
  return <Box bgcolor="white" mb={7.5}>
      <Container sx={{
      py: 4
    }}>
        <Carousel spacing="0px" totalSlides={2} infinite={true} showDots={true} autoPlay={false} visibleSlides={1} showArrow={false}>
          {mainCarouselData.map((data, ind) => {
          return <CarouselCard1 {...data} key={ind} />;
        })}
        </Carousel>
      </Container>
    </Box>;
};
export default Section1;