import { useEffect, useState } from "react";
import { Box, Container, Grid, TextField, MenuItem, styled } from "@mui/material";
import { H3, Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
import BazaarCard from "components/BazaarCard";
import ProductCategoryItem from "./ProductCategoryItem";
import ProductCard1 from "components/product-cards/ProductCard1";
import CategorySectionHeader from "components/CategorySectionHeader";
import LazyImage from "components/LazyImage";
import CategoryIcon from "components/icons/Category";
import { targetUrl, weburl } from "components/config";
import Link from "next/link";
// ======================================================
const StyledBazaarCard = styled(BazaarCard)(({
  theme
}) => ({
  display: "flex",
  borderRadius: 8,
  padding: "0.75rem",
  alignItems: "center",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[3],
    backgroundColor:"#81F2B4"
  },
  "&:active": {
    boxShadow: theme.shadows[3],
//    backgroundColor:"#060F60",
    backgroundColor:"#81F2B4",
//    color:"white"
  }
}));

const Section7 = props => {
  const {
    productList,
    shops,
    title
  } = props;
    const [category, setCategory] = useState([]);


  const getData = async () => {
  const res = await fetch(targetUrl+"/categories",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  setCategory(data.data)
  console.log(data);
  if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 관리자로 로그인해주세요. ")
    window.location.href =  weburl
    }
  const res2 = await fetch(`http://localhost:5003/get_product_by_category/${window.sessionStorage.getItem('category')}`)
  const data = await res2.json();
  setProduct(data)
  {/*  .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data); setProduct(data)});*/}
  }
  console.log(data.data);
  setCategory((data.data))
  return data;
  }
///  console.log(categories)
//  console.log(category)
//  console.log(Object.values(category))

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);

  const sortOptions = [{
  label: "Relevance",
  value: "Relevance"
}, {
  label: "Date",
  value: "Date"
}, {
  label: "Price Low to High",
  value: "Price Low to High"
}, {
  label: "Price High to Low",
  value: "Price High to Low"
}];
  const brands = [  {
  id: "e73dc783-c355-4a30-9ae3-4995d4f13513",
  slug: "seoul",
  name: "Seoul",
}, {
  id: "52cc15f6-d076-432b-94d2-1bd73bd01447",
  slug: "busan",
  name: "Busan",
}, {
  id: "6c794f56-aaa4-433b-a6fe-3b78dbb357f9",
  slug: "incheon",
  name: "Incheon",
}, {
  id: "75f6ccee-8946-41a7-977f-61b3a5fc6401",
  slug: "zezu",
  name: "Zezu",
}, {
  id: "d0a80046-7044-4b77-a1c2-2d06335e9d2e",
  slug: "gyeonggi",
  name: "Gyeonggi-do",
},  ];
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState("region_name");
  const [cate, setCate] = useState("");
  const [brand, setBrand] = useState("*");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getData();
    window.sessionStorage.setItem('category', 'all')
    fetch(`http://localhost:5003/get_product_by_category/${window.sessionStorage.getItem('category')}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data); setProduct(data)});

    }, []);


  const handleCategoryClick = brand => () => {
    setBrand(brand)
    if (selected.match(brand)) setSelected("");else setSelected(brand);
    console.log(`http://localhost:5003/get_product_filter/${type}|${brand}|${cate}`)
    fetch(`http://localhost:5003/get_product_filter/${type}|${brand}|${cate}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data); setProduct(data)});
  };
  useEffect(() => {
    if (type === "region_name") setList(brands);else setList(shops);
  }, [brands, shops, type]);

  useEffect(() => {
    console.log(`http://localhost:5003/get_product_filter/${type}|${brand}|${cate}`)
    fetch(`http://localhost:5003/get_product_filter/${type}|${brand}|${cate}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data); setProduct(data)});
  }, [cate]);
  return <Container sx={{
    mb: "70px"
  }}>
  <Container sx={{
    mb: "10px"
  }} />
        <Grid container spacing={3}>
        {Object.values(category).map((item, ind) => <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
            {/*<Link href={`/product/search/${item.name}`} passHref>*/}
              <a>
                <StyledBazaarCard id={ind} sx={{
          mb: "0.75rem",
          bgcolor: cate.match(item.name) ? "#E2E6ED" : "white",
          color: cate.match(item.name) ? "white" : "black"
        }} onClick={(e)=>{console.log(item.name);setCate(item.name);handleCategoryClick(brand)}} elevation={1}>
                  {/*<LazyImage width={52} height={52} alt="fashion" src={"/assets/images/banners/category/img_4.png"} objectFit="contain" borderRadius="8px" />*/}
                  <Box id={item.name} onClick={(e)=>{if (typeof window !== 'undefined') {window.sessionStorage.setItem('category',e.target.outerText); console.log(window.sessionStorage.getItem('category'))}}} fontWeight="600" ml={1.25} fontSize={20} sx={{ height: 100,}} style={{ color: '#021460' }}>
                    {item.name}
                  </Box>
                </StyledBazaarCard>
              </a>
           {/*</Link>*/}
          </Grid>)}
      </Grid>

        <CategorySectionHeader seeMoreLink="#" title="" />


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
              CITY
            </H3>
            {/*<H3 fontSize={20} lineHeight="1.3" color="grey.400" fontWeight={600} paddingTop="0.5rem">
              |
            </H3>
            <H3 fontSize={20} fontWeight={600} padding="0.5rem 1rem" style={{
            cursor: "pointer"
          }} onClick={() => setType("company_name")} color={type === "company_name" ? "grey.900" : "grey.600"}>
              VENDOR
            </H3>*/}
          </FlexBox>

          {list.map(item => <ProductCategoryItem key={item.id} title={item.name} isSelected={!!selected.match(item.slug)} onClick={handleCategoryClick(item.slug)}
//          imgUrl={type === "company_name" ? `/assets/images/shops/${item.thumbnail}.png` : item.image}
          sx={{
          mb: "0.75rem",
          bgcolor: selected.match(item.slug) ? "#060F60" : "#E2E6ED",
          color: selected.match(item.slug) ? "white" : "black"
        }} />)}

          {/*<ProductCategoryItem title={`${type} 모두보기`} isSelected={!!selected.match(`all-${type}`)} onClick={handleCategoryClick(`all-${type}`)} sx={{
          mt: 8,
          bgcolor: selected.match(`all-${type}`)
        }} />*/}
        </BazaarCard>

        <Box flex="1 1 0" minWidth="0px">
        <Grid container spacing={3}>
        <Grid item lg={8} sm={8} xs={8}>
          <CategorySectionHeader title={title} seeMoreLink="#" />
        </Grid>
        <Grid item lg={1} sm={1} xs={1}>
              <Paragraph color="grey.600" whiteSpace="pre">
                Sort by:
              </Paragraph>
        </Grid>
        <Grid item lg={3} sm={3} xs={3}>
          <TextField select fullWidth size="small" variant="outlined" placeholder="Short by" defaultValue={sortOptions[0].value} sx={{
              flex: "1 1 0",
              minWidth: "50px"
            }}>
                {sortOptions.map(item => <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>)}
          </TextField>
          </Grid>
          </Grid>
          <Grid container spacing={3}>
            {product.map(item => <Grid item lg={4} sm={6} xs={12} key={item.product_id}>
                {/*todo:slug={item.slug}*/}
                <ProductCard1 hoverEffect id={item.product_id} slug={item.product_id} title={item.product_name} price={item.price} rating={4.9} imgUrl={"/assets/images/products/Package/"+item.img+".png"} discount={item.discount} item={item} />
              </Grid>)}
          </Grid>
        </Box>
      </FlexBox>
    </Container>;
};
export default Section7;