import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { Badge, Box, Button, Dialog, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Clear, KeyboardArrowDown, PersonOutline } from "@mui/icons-material";
import clsx from "clsx";
import Icon from "components/icons";
import { layoutConstant } from "utils/constants";
import Login from "pages-sections/sessions/Login";
import Image from "components/BazaarImage";
import MiniCart from "components/MiniCart";
import Category from "components/icons/Category";
import { Paragraph } from "components/Typography";
//import MobileMenu from "components/navbar/MobileMenu";
import { FlexBetween, FlexBox, FlexRowCenter } from "components/flex-box";
import CategoryMenu from "components/categories/CategoryMenu";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { H1, H6 } from "components/Typography";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import { Grid } from "@mui/material";
import { targetUrl, getAuth } from "components/config";
import { useAppContext } from "contexts/AppContext";
// styled component
export const HeaderWrapper = styled(Box)(({
  theme
}) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight
  }
}));
const StyledContainer = styled(Container)({
  gap: 2,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});

// ==============================================================

// ==============================================================

const Header = ({
  isFixed,
  className,
  searchInput
}) => {
  const theme = useTheme();
//  const temp = useAppContext2()
//  console.log(temp)
const [state, setState] = useState({'cart':[]});
const getData = async () => {
const res = await fetch(targetUrl+"/cart",{
              credentials : 'include',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": true,
            }})
console.log(res)
const data = await res.json();
console.log("RENEW!!!!!!!!!!!!!!!!")
console.log(data)
if(data.status=="success"){
    console.log(data.status)
   console.log(data);
   var cartval = data.data
   for (var j=0; j<cartval.length; j++){
       var total_option_fee = 0
       cartval[j]["optionFee"] = 0
       for (var i=0; i<cartval[j].optionFeeInfoList.length; i++){
            total_option_fee += cartval[j].optionFeeInfoList[i].price
   }
   cartval[j]["optionFee"] = total_option_fee
   console.log(j+'-----'+total_option_fee)
   }
   console.log(cartval)

   cartval = cartval.map((item)=> ({
   'option': item.optionFeeInfoList,
   'qty': item.count,
   'name': item.productName,
   'id':item.cartId,
   'price': item.price+item.optionFee
   }))
   setState({'cart':cartval})
};

}

  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const toggleDialog = async () => {
  console.log("result")
  var result = await getAuth()
  console.log(result)
  setDialogOpen(!dialogOpen)};
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);
  const [value, setValue] = useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//    const {
//    state
//  } = useAppContext();
useEffect(() => {
    getData()
},[])
useEffect(() => {
    getData()
},[dialogOpen])
useEffect(() => {
    getData()
},[sidenavOpen])

  console.log(state);

  const Logout = async () => {

      const res = await fetch(targetUrl+"/logout",{
          method: 'POST',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
        const data = await res.json();
        console.log(data)
        if (data.status=="success"){
            window.alert("로그아웃 되었습니다.")
        }else {
            window.alert("로그아웃에 실패하였습니다.")
        }
        window.sessionStorage.removeItem('id')
        window.sessionStorage.removeItem('type')
//        .then(res=>{console.log(res.json()); getAuth()})

  }

  // LOGIN AND MINICART DRAWER
  const DIALOG_DRAWER = <Fragment>
      <Dialog scroll="body" open={dialogOpen} fullWidth={isMobile} onClose={toggleDialog} sx={{
      zIndex: 9999
    }}>
    {typeof window == 'undefined'?
    <Login />
    :(window.sessionStorage.getItem('id') != null?
    <div>
      <form>
        <H1 textAlign="center" mt={1} mb={2} fontSize={16}>
          Welcome to K-MEDI
        </H1>
        <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
        <FormLabel component="legend">{"Signed as "+window.sessionStorage.getItem('id')}</FormLabel>
      </FormControl>
      <Grid container spacing={3}>
      <Grid item md={5} xs={5}>
      {window.sessionStorage.getItem('id')=="ROLE_SYSADMIN"?
      <Link href="/admin/dashboard">
      <Button size="medium" fullWidth sx={{height: 44, margin: 2}} style={{backgroundColor:'orange', color:'white'}}>
        <Box fontSize="12px" ml={1}>
          Admin Page
        </Box>
      </Button>
      </Link>
      : (window.sessionStorage.getItem('id')=="ROLE_VENDOR"?
      <Link href="/vendor/dashboard">
      <Button size="medium" fullWidth sx={{height: 44, margin: 2}} style={{backgroundColor:'orange', color:'white'}}>
        <Box fontSize="12px" ml={1}>
          Vendor Page
        </Box>
      </Button>
      </Link>
      : <Link href="/profile">
      <Button size="medium" fullWidth sx={{height: 44, margin: 2}} style={{backgroundColor:'orange', color:'white'}}>
        <Box fontSize="12px" ml={1}>
          My Page
        </Box>
      </Button>
      </Link>
      )
      }
      </Grid>
      <Grid item md={5} xs={5}>
      <Button size="medium" fullWidth sx={{height: 44, margin: 2}} style={{backgroundColor:'black', color:'white'}} onClick={()=>Logout()}>
        <Box fontSize="12px" ml={1}>
          Logout
        </Box>
        </Button>
      </Grid>
      <Grid item md={1} xs={1} />
      </Grid>

      </form>

      </div>
    :<Login />)
    }

      </Dialog>

      <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav} sx={{
      zIndex: 9999
    }}>
        <MiniCart toggleSidenav={toggleSidenav} />
      </Drawer>
    </Fragment>;

  // FOR SMALLER DEVICE
  if (downMd) {
    const ICON_STYLE = {
      color: "grey.600",
      fontSize: 20
    };

    return <HeaderWrapper className={clsx(className)}>
        <StyledContainer>
          <FlexBetween width="100%">
            {/* LEFT CONTENT - NAVIGATION ICON BUTTON */}
             {/* <Box flex={1}>
              <MobileMenu />
            </Box> */}

            {/* MIDDLE CONTENT - LOGO */}
            <Link href="/">
              <a>
                <Image height={44} src="/assets/images/logo_new3.png" alt="logo" />
              </a>
            </Link>

            {/* RIGHT CONTENT - LOGIN, CART, SEARCH BUTTON */}
            <FlexBox justifyContent="end" flex={1}>
              <Box component={IconButton} onClick={toggleSearchBar}>
                <Icon.Search sx={ICON_STYLE} />
              </Box>

              <Box component={IconButton} onClick={toggleDialog}>
                <Icon.User sx={ICON_STYLE} />
              </Box>

              <Box component={IconButton} onClick={toggleSidenav}>
                {state!=null? <Badge badgeContent={state.cart.length} color="primary">
                  <Icon.CartBag sx={ICON_STYLE} />
                </Badge>:<div />}
              </Box>
            </FlexBox>
          </FlexBetween>

          {/* SEARCH FORM DRAWER */}
          <Drawer open={searchBarOpen} anchor="top" onClose={toggleSearchBar} sx={{
          zIndex: 9999
        }}>
            <Box sx={{
            width: "auto",
            padding: 2,
            height: "100vh"
          }}>
              <FlexBetween mb={1}>
                <Paragraph>Search to Bazaar</Paragraph>

                <IconButton onClick={toggleSearchBar}>
                  <Clear />
                </IconButton>
              </FlexBetween>

              {/* CATEGORY BASED SEARCH FORM */}
              {searchInput}
            </Box>
          </Drawer>

          {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
          {DIALOG_DRAWER}
        </StyledContainer>
      </HeaderWrapper>;
  }
  return <HeaderWrapper className={clsx(className)}>
      <StyledContainer>
        {/* LEFT CONTENT - LOGO AND CATEGORY */}
        <FlexBox mr={2} minWidth="170px" alignItems="center">
          <Link href="/">
            <a>
              <Image height={44} src="/assets/images/logo_new3.png" alt="logo" />
            </a>
          </Link>

          {/* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */}
          {isFixed && <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <Button color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </Button>
              </FlexBox>
            </CategoryMenu>}
        </FlexBox>

        {/* SEARCH FORM */}
        <FlexBox justifyContent="center" flex="1 1 0">
          {searchInput}
        </FlexBox>

        {/* LOGIN AND CART BUTTON */}
        <FlexBox gap={1.5} alignItems="center">
          <Box component={IconButton} p={1.25} bgcolor="grey.200" onClick={toggleDialog}>
            <PersonOutline />
          </Box>

          {state!=null? <Badge badgeContent={state.cart.length} color="primary">
            <Box p={1.25} bgcolor="grey.200" component={IconButton} onClick={toggleSidenav}>
              <ShoppingBagOutlined />
            </Box>
          </Badge> : <div />}
        </FlexBox>

        {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
        {DIALOG_DRAWER}
        </StyledContainer>
    </HeaderWrapper>;
};
export default Header;