import Link from "next/link";
import { Fragment, useState } from "react";
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
import { useAppContext } from "contexts/AppContext";
import Image from "components/BazaarImage";
import MiniCart from "components/MiniCart";
import Category from "components/icons/Category";
import { Paragraph } from "components/Typography";
import MobileMenu from "components/navbar/MobileMenu";
import { FlexBetween, FlexBox } from "components/flex-box";
import CategoryMenu from "components/categories/CategoryMenu";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@material-ui/core/Typography';

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

const MenuTab = ({
  isFixed,
  className,
  searchInput
}) => {
  const theme = useTheme();
  const {
    state
  } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(900));
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);
  const [value, setValue] = useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // FOR SMALLER DEVICE
  if (downMd) {
    const ICON_STYLE = {
      color: "grey.600",
      fontSize: 20
    };
    return <HeaderWrapper className={clsx(className)}>
      <StyledContainer>
        <Box sx={{ width: '100%'}} > 
        {/* <Image width="96px" height="44px" src="/assets/images/logo_new3.png" alt="logo" /> */}
          <Tabs
            value={value}
            onChange={handleChange}
//            textColor="#4D87E2"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            // style={{color:"#4D87E2"}}
           >
          <Link href={`/`}>
            <Tab value={0} label="HOME" />
          </Link>
          <Link href={`/info`}>
            <Tab value={1} label="ABOUT US" />
          </Link>
          <Link href={`/profile`}>
            <Tab value={3} label="PROFILE" />
          </Link>
          <Link href={`/support-tickets`}>
            <Tab value={4} label="FAQ" />
          </Link>
          </Tabs> 
        </Box>
      </StyledContainer>
      </HeaderWrapper>;
  }
  return <HeaderWrapper className={clsx(className)}>
        <StyledContainer>
          <Box sx={{ width: '100%' }} sx={{ height: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
//              textColor="#4D87E2"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Link href={`/`}>
                <Tab value={0} label={(<Typography variant="h6">HOME</Typography>)} />
              </Link>
              <Link href={`/info`}>
              <Tab value={1} label={(<Typography variant="h6">ABOUT ALLMEDITRIP</Typography>)} />
              </Link>
              {/*<Link href={`/#`}>
              <Tab value={2} label={(<Typography variant="h6">HOSPITAL</Typography>)} />
              </Link>*/}
              <Link href={`/profile`}>
                <Tab value={3} label={(<Typography variant="h6">PROFILE</Typography>)} />
              </Link>
              <Link href={`/support-tickets`}>
                  <Tab value={4} label={(<Typography variant="h6">SERVICE CENTER</Typography>)} />
              </Link>
              {/*
              <Link href={`/admin/dashboard`}>
                  <Tab value="five" label={(<Typography variant="h6">관리자페이지</Typography>)} />
              </Link>
              <Link href={`/vendor/dashboard`}>
                  <Tab value="five" label={(<Typography variant="h6">판매자페이지</Typography>)} />
              </Link>
              */}
            </Tabs>
          </Box>
        </StyledContainer>
    </HeaderWrapper>;
};
export default MenuTab;