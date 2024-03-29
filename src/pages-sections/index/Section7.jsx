import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  MenuItem,
  styled,
} from "@mui/material";
import { H3, Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
import BazaarCard from "components/BazaarCard";
import ProductCategoryItem from "./ProductCategoryItem";
import ProductCard1 from "components/product-cards/ProductCard1";
import CategorySectionHeader from "components/CategorySectionHeader";
// import LazyImage from "components/LazyImage";
// import CategoryIcon from "components/icons/Category";
import { targetUrl } from "components/config";
import Link from "next/link";

const sortOptions = [
  // {
  //   label: "Relevance",
  //   value: "Relevance",
  // },
  {
    label: "Date",
    value: "DESC,writeDate",
  },
  {
    label: "Price Low to High",
    value: "ASC,salePrice",
  },
  {
    label: "Price High to Low",
    value: "DESC,salePrice",
  },
];

const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  display: "flex",
  borderRadius: 8,
  padding: "0.75rem",
  alignItems: "center",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[3],
    backgroundColor: "#81F2B4",
  },
  "&:active": {
    boxShadow: theme.shadows[3],
    //    backgroundColor:"#060F60",
    backgroundColor: "#81F2B4",
    //    color:"white"
  },
}));

const Section7 = (props) => {
  const { products, regions, title, categories } = props;
  const [sort, setSort] = useState(sortOptions[0].value);

  const handleChange = (event) => {
    setSort(event.target.value);
    console.log("handleChange");
    console.log(event.target.value);
  };
  console.log("categories");

  const FilterProduct = async () => {
    console.log("FilterProduct")
    var url = "";
    if (cate == "*" && region == "*") {
      console.log("all");
      url = targetUrl + `/open-products?sortCondition=${encodeURIComponent(encodeURIComponent(sort))}`;
    } else if (cate == "*") {
      url = targetUrl + `/open-products?regionId=${region}&sortCondition=${encodeURIComponent(encodeURIComponent(sort))}`;
    } else if (region == "*") {
      url = targetUrl + `/open-products?categoryId=${cate}&sortCondition=${encodeURIComponent(encodeURIComponent(sort))}`;
    } else {
      url = targetUrl + `/open-products?categoryId=${cate}&regionId=${region}sortCondition=${encodeURIComponent(encodeURIComponent(sort))}`;
    }
    const filterproductRes = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      },
    });
    console.log(url)
    const filterproduct = await filterproductRes.json();
    setProductList(filterproduct.data);
  };

  const [productList, setProductList] = useState(products);
  const [selected, setSelected] = useState("");
  const [type, setType] = useState("region_name");
  const [cate, setCate] = useState("*");
  const [region, setRegion] = useState("*");

  const handleCategoryClick = (region) => () => {
    setRegion(region);
    console.log(region);
    if (selected.match(region)) {
      setSelected("");
    } else {
      setSelected(region.toString());
    }
  };

  useEffect(() => {
    FilterProduct();
  }, [cate, region, sort]);
  return (
    <Container
      sx={{
        mb: "70px",
      }}
    >
      <Container
        sx={{
          mb: "10px",
        }}
      />
      <Grid container spacing={3}>
        {Object.values(categories).map((item, ind) => (
          <Grid item lg={2} md={3} sm={4} xs={6} key={ind}>
            {/*<Link href={`/product/search/${item.name}`} passHref>*/}
            <a>
              <StyledBazaarCard
                id={ind}
                sx={{
                  mb: "0.75rem",
                  bgcolor: cate.match(item.categoryId.toString())
                    ? "#E2E6ED"
                    : "white",
                  color: cate.match(item.categoryId.toString())
                    ? "white"
                    : "black",
                }}
                onClick={(e) => {
                  console.log(item.name);
                  setCate(item.categoryId.toString());
                  handleCategoryClick(region);
                }}
                elevation={1}
              >
                {/*<LazyImage width={52} height={52} alt="fashion" src={"/assets/images/banners/category/img_4.png"} objectFit="contain" borderRadius="8px" />*/}
                <Box
                  id={item.name}
                  onClick={(e) => {
                    if (typeof window !== "undefined") {
                      window.sessionStorage.setItem(
                        "category",
                        e.target.outerText
                      );
                      console.log(window.sessionStorage.getItem("category"));
                    }
                  }}
                  fontWeight="600"
                  ml={1.25}
                  fontSize={20}
                  sx={{ height: 100 }}
                  style={{ color: "#021460" }}
                >
                  {item.name}
                </Box>
              </StyledBazaarCard>
            </a>
            {/*</Link>*/}
          </Grid>
        ))}
      </Grid>

      <CategorySectionHeader seeMoreLink="#" title="" />

      <FlexBox gap="1.75rem">
        <BazaarCard
          sx={{
            height: "100%",
            padding: "1.25rem",
            borderRadius: "10px",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <FlexBox mt={-1} mb={1}>
            <H3
              fontSize={20}
              fontWeight={600}
              padding="0.5rem 1rem"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setType("region_name")}
              color={type === "region_name" ? "grey.900" : "grey.600"}
            >
              CITY
            </H3>
          </FlexBox>

          {regions.map((item) => (
            <ProductCategoryItem
              key={item.regionId}
              title={item.name}
              isSelected={!!selected.match(item.regionId)}
              onClick={handleCategoryClick(item.regionId)}
              sx={{
                mb: "0.75rem",
                bgcolor: selected.match(item.regionId) ? "#060F60" : "#E2E6ED",
                color: selected.match(item.regionId) ? "white" : "black",
              }}
            />
          ))}
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
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Short by"
                defaultValue={sortOptions[0].value}
                sx={{
                  flex: "1 1 0",
                  minWidth: "50px",
                }}
                onChange={handleChange}
              >
                {sortOptions.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {productList.map((item) => (
              <Grid item lg={4} sm={4} xs={6} key={item.product_id}>
                <ProductCard1
                  hoverEffect
                  id={item.productId}
                  slug={item.productId}
                  title={item.productName}
                  price={item.price}
                  rating={4.9}
                  imgUrl={`data:image/png;base64,${item.thumbnailImageBase64String}`}
                  discount={5}
                  item={item}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexBox>
    </Container>
  );
};
export default Section7;
