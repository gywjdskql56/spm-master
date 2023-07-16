import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Box, MenuItem, TextField, styled, useTheme, Button, Grid } from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import TouchRipple from "@mui/material/ButtonBase";
import BazaarMenu from "components/BazaarMenu";
import { FlexBox } from "components/flex-box";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
import api from "utils/__api__/products";
const DropDownHandler = styled(FlexBox)(({
  theme
}) => ({
  whiteSpace: "pre",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: {
    display: "none"
  }
}));
const SearchInputWithCategory = () => {
  const parentRef = useRef();
  const {
    breakpoints
  } = useTheme();
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState("*");
  const [resultList, setResultList] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("카테고리 전체");
  const [keyword, setKeyword] = useState("");

  // HANDLE CHANGE THE CATEGORY
  const handleCategoryChange = cat => () => {
    setCategory(cat.value);
    setCategoryTitle(cat.title);
  };

  // FETCH PRODUCTS VIA API
  const getProducts = async (searchText, category) => {
    const data = await api.searchProducts(searchText, category);
    console.log(data)
    {/*setResultList(data);*/}
  };
  const handleSearch = e => {
    setKeyword(e.target.value)
    console.log(e.target.value)
    startTransition(() => {
      const value = e.target?.value;
      if (!value) setResultList([]);else if (value && category !== "*") getProducts(value, category);else getProducts(value);
    });
  };
  const handleDocumentClick = () => setResultList([]);
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", null);
  }, []);

  // CATEGORY MENU DROPDOWN
  const categoryDropdown = <BazaarMenu direction="left" sx={{
    zIndex: breakpoints.down("md") ? 99999 : 1502
  }} handler={<DropDownHandler px={3} gap={0.5} height="100%" color="grey.700" bgcolor="grey.100" alignItems="center" component={TouchRipple}>
          {categoryTitle}
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </DropDownHandler>}>
      {categories.map(item => <MenuItem key={item.value} onClick={handleCategoryChange(item)}>
          {item.title}
        </MenuItem>)}
    </BazaarMenu>;
  return <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" {...{
    ref: parentRef
  }}>
      <Grid container spacing={3}>
      <Grid item lg={10} md={10} xs={10}>
      <TextField fullWidth variant="outlined" placeholder="Please type the keyword that you want to search.." onChange={handleSearch} InputProps={{
      sx: {
        height: 44,
        paddingRight: 0,
        borderRadius: 300,
        color: "grey.700",
        overflow: "hidden",
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "primary.main"
        }
      },
      endAdornment: null,//categoryDropdown,
      startAdornment: <SearchOutlinedIcon fontSize="small" />
    }} />

      {resultList.length > 0 && <SearchResultCard elevation={2}>
          {resultList.map(item => <Link href={`/product/search/${item}`} key={item} passHref>
              <MenuItem key={item}>{item}</MenuItem>
            </Link>)}
        </SearchResultCard>}
        </Grid>
        <Grid item lg={2} md={2} xs={2}>
        <Link href={`/product/search/${keyword}`}>
       <Button variant="contained" color="primary" sx={{fontSize: "16px"}}>
          Search
        </Button>
        </Link>
        </Grid>
        </Grid>
    </Box>;
};
const categories = [{
  title: "카테고리 전체",
  value: "*"
}, {
  title: "성형(얼굴)",
  value: "성형(얼굴)"
}, {
  title: "성형(몸매)",
  value: "성형(몸매)"
}, {
  title: "얼굴시술(필러,보톡스)",
  value: "얼굴시술(필러,보톡스)"
}, {
  title: "지방흡입",
  value: "지방흡입"
}, {
  title: "라식/라섹",
  value: "라식/라섹"
}, {
  title: "임플란트",
  value: "임플란트"
}, {
  title: "이비인후과",
  value: "이비인후과"
}];
export default SearchInputWithCategory;