import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import ProductFAQ from "components/products/ProductFAQ";
import AvailableShops from "components/products/AvailableShops";
import RelatedProducts from "components/products/RelatedProducts";
import FrequentlyBought from "components/products/FrequentlyBought";
import ProductDescription from "components/products/ProductDescription";
import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";
import api from "utils/__api__/products";
import { targetUrl, weburl } from "components/config";

// styled component
const StyledTabs = styled(Tabs)(({
  theme
}) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize"
  }
}));

// ===============================================================

// ===============================================================

const ProductDetails = props => {
  const {
    frequentlyBought,
    relatedProducts,
    products
  } = props;
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const [product, setProduct] = useState(null);
  const [FAQ, setFAQ] = useState(0);
  const [id, setId] = useState(null);
  const handleOptionClick = (_, value) => setSelectedOption(value);
  console.log(product)

  useEffect(() => {
    const product_id = window.location.href.split("/").splice(-1);
    console.log(product_id)
    setId(product_id)
    fetch(targetUrl+"/productDetails?productId="+product_id,{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data.data);setProduct(data.data)})

    {/* fetch(targetUrl+"/productqnas?productId=1"+product_id,{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data);setFAQ(data.data)}) */}

 }, []);
  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return <ShopLayout1>
      <Container sx={{
      my: 4
    }}>
        {/* PRODUCT DETAILS INFO AREA */}
        {product!=null ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

        {/* PRODUCT DESCRIPTION AND REVIEW */}
        <StyledTabs textColor="primary" value={selectedOption} indicatorColor="primary" onChange={handleOptionClick}>
          <Tab className="inner-tab" label="Description" />
          {product ? <Tab className="inner-tab" label={"Review ("+product.reviewList.length+")"} /> : <Tab className="inner-tab" label={"Review"} />}
          {product ? <Tab className="inner-tab" label={"FAQ ("+product.productQnaInfoList.length+")"} /> : <Tab className="inner-tab" label={"FAQ"} />}
        </StyledTabs>

        <Box mb={6}>
          {product!=null && selectedOption === 0 && <ProductDescription explain={product} />}
          {product!=null && selectedOption === 1 && <ProductReview review={product.reviewList} product_id={product.productId} />}
          {product!=null && selectedOption === 2 && <ProductFAQ faq={product.productQnaInfoList} product_id={product.productId} />}
        </Box>

{/*        {frequentlyBought && <FrequentlyBought productsData={frequentlyBought} />} */}

{/*        <AvailableShops />  */}

{/*        {relatedProducts && <RelatedProducts productsData={relatedProducts} />} */}
      </Container>
    </ShopLayout1>;
};
export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params
}) => {
  const relatedProducts = await getRelatedProducts();
  const frequentlyBought = await getFrequentlyBought();
  console.log(params.slug)
  const product = await api.getProduct('test-product');
  return {
    props: {
      frequentlyBought,
      relatedProducts,
      product
    }
  };
};
export default ProductDetails;