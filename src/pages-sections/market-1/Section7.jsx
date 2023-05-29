import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { H3 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import BazaarCard from "components/BazaarCard";
import ProductCategoryItem from "./ProductCategoryItem";
import ProductCard1 from "components/product-cards/ProductCard1";
import CategorySectionHeader from "components/CategorySectionHeader";
// ======================================================

const Section7 = props => {
  const {
    productList,
    shops,
    brands,
    title
  } = props;
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState("region_name");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    window.sessionStorage.setItem('category', 'all')
    fetch(`http://localhost:5003/get_product_by_category/${window.sessionStorage.getItem('category')}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data); setProduct(data)});

    }, []);


  if (typeof window !== 'undefined')
  {console.log(window.sessionStorage.getItem('category'))}
  const handleCategoryClick = brand => () => {
    if (selected.match(brand)) setSelected("");else setSelected(brand);
    console.log(brand)
    fetch(`http://localhost:5003/get_product_filter/${type}|${brand}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data); setProduct(data)});
  };
  useEffect(() => {
    if (type === "region_name") setList(brands);else setList(shops);
  }, [brands, shops, type]);
  return <Container sx={{
    mb: "70px"
  }}>
      <FlexBox gap="1.75rem">
        <BazaarCard sx={{
        height: "100%",
        padding: "1.25rem",
        borderRadius: "10px",
        display: {
          xs: "none",
          md: "block"
        }
      }}>
          <FlexBox mt={-1} mb={1}>
            <H3 fontSize={20} fontWeight={600} padding="0.5rem 1rem" style={{
            cursor: "pointer"
          }} onClick={() => setType("region_name")} color={type === "region_name" ? "grey.900" : "grey.600"}>
              도시
            </H3>
            <H3 fontSize={20} lineHeight="1.3" color="grey.400" fontWeight={600} paddingTop="0.5rem">
              |
            </H3>
            <H3 fontSize={20} fontWeight={600} padding="0.5rem 1rem" style={{
            cursor: "pointer"
          }} onClick={() => setType("company_name")} color={type === "company_name" ? "grey.900" : "grey.600"}>
              여행사
            </H3>
          </FlexBox>

          {list.map(item => <ProductCategoryItem key={item.id} title={item.name} isSelected={!!selected.match(item.slug)} onClick={handleCategoryClick(item.slug)}
//          imgUrl={type === "company_name" ? `/assets/images/shops/${item.thumbnail}.png` : item.image}
          sx={{
          mb: "0.75rem",
          bgcolor: selected.match(item.slug) ? "white" : "grey.100"
        }} />)}

          <ProductCategoryItem title={`${type} 모두보기`} isSelected={!!selected.match(`all-${type}`)} onClick={handleCategoryClick(`all-${type}`)} sx={{
          mt: 8,
          bgcolor: selected.match(`all-${type}`)
        }} />
        </BazaarCard>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader title={title} seeMoreLink="#" />

          <Grid container spacing={3}>
            {product.map(item => <Grid item lg={4} sm={6} xs={12} key={item.product_id}>
                {/*todo:slug={item.slug}*/}
                <ProductCard1 hoverEffect id={item.product_id} slug={item.product_id} title={item.product_name} price={item.price} rating={5} imgUrl={"/assets/images/products/Package/"+item.img+".png"} discount={item.discount} />
              </Grid>)}
          </Grid>
        </Box>
      </FlexBox>
    </Container>;
};
export default Section7;