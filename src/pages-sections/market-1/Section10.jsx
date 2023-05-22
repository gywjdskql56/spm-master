import Link from "next/link";
import { Box, Container, Grid, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import CategoryIcon from "components/icons/Category";
import CategorySectionHeader from "components/CategorySectionHeader";
import { useEffect, useState } from 'react';

const StyledBazaarCard = styled(BazaarCard)(({
  theme
}) => ({
  display: "flex",
  borderRadius: 8,
  padding: "0.75rem",
  alignItems: "center",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[3]
  }
}));

// ============================================================

// ============================================================

const Section10 = ({
  categories
}) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5003/get_category")
    .then((response) =>
    response.json())
    .then((data) =>
    {setCategory(data['data']); console.log(data['data'])});
  }, []);
  console.log(categories)
  console.log(category)
  return <Container sx={{
    mb: "70px"
  }}>
      <CategorySectionHeader seeMoreLink="#" title="" />
      <Grid container spacing={3}>
        {category.map((item, ind) => <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
            <Link href={`/product/search/${item}`} passHref>
              <a>
                <StyledBazaarCard elevation={1}>
                  {/*<LazyImage width={52} height={52} alt="fashion" src={"/assets/images/banners/category/img_4.png"} objectFit="contain" borderRadius="8px" />*/}
                  <Box fontWeight="600" ml={1.25} fontSize={20}>
                    {item}
                  </Box>
                </StyledBazaarCard>
              </a>
            </Link>
          </Grid>)}
      </Grid>
    </Container>;
};
export default Section10;