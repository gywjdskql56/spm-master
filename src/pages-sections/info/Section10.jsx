import Link from "next/link";
import { Box, Container, Grid, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import CategoryIcon from "components/icons/Category";
import CategorySectionHeader from "components/CategorySectionHeader";
import { useEffect, useState } from 'react';
import { targetUrl, weburl } from "components/config";

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
    backgroundColor:"#060F60",
    color:"white"
  }
}));

// ============================================================

// ============================================================

const Section10 = ({
  categories
}) => {

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
  }
  console.log(data.data);
  setCategory((data.data))
  return data;
  }
  useEffect(() => {
   getData()
  }, []);
//  console.log(categories)
  console.log(category)
  console.log(Object.values(category))

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);

 {/*} const getData = async () => {

  const res = await fetch(targetUrl+"/categories",{
          credentials : 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  const infos = data.data;
  console.log(data);
  if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 관리자로 로그인해주세요. ")
    window.location.href =  weburl
    }
  }
  console.log(data.data);
  setCategory(data.data)
  return data;
  }

  useEffect(() => {
    getData();
    setOpen(true)
  }, []);*/}

  return <Container sx={{
    mb: "70px"
  }}>
      <CategorySectionHeader seeMoreLink="#" title="" />
      <Grid container spacing={3}>
        {Object.values(category).map((item, ind) => <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
            <Link href={`/product/search/${item.name}`} passHref>
              <a>
                <StyledBazaarCard id={ind} onClick={(e)=>console.log(item.name)} elevation={1}>
                  {/*<LazyImage width={52} height={52} alt="fashion" src={"/assets/images/banners/category/img_4.png"} objectFit="contain" borderRadius="8px" />*/}
                  <Box id={item.name} onClick={(e)=>{if (typeof window !== 'undefined') {window.sessionStorage.setItem('category',e.target.outerText); console.log(window.sessionStorage.getItem('category'))}}} fontWeight="600" ml={1.25} fontSize={20} sx={{ height: 100,}} style={{ color: '#021460' }}>
                    {item.name}
                  </Box>
                </StyledBazaarCard>
              </a>
            </Link>
          </Grid>)}
      </Grid>
    </Container>;
};
export default Section10;