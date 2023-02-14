import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import Google from "components/icons/Google";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram";

// styled component
const StyledLink = styled("a")(({
  theme
}) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100]
  }
}));
const Footer1 = () => {
  return <footer>
      <Box bgcolor="#222935">
        <Container sx={{
        p: "1rem",
        color: "white"
      }}>
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image mb={2.5} src="/assets/images/logo.svg" alt="logo" />
                  </a>
                </Link>

                <Paragraph mb={2.5} color="grey.500">
                  한국의료관광 중개 플랫폼입니다.
                </Paragraph>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box fontSize="18px" fontWeight="600" mb={1.5} lineHeight="1" color="white">
                  회사소개
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>)}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box fontSize="18px" fontWeight="600" mb={1.5} lineHeight="1" color="white">
                  고객지원
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>)}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box fontSize="18px" fontWeight="600" mb={1.5} lineHeight="1" color="white">
                  본사
                </Box>

                <Box py={0.6} color="grey.500">
                  서울특별시 강남구 테헤란로 97-2, 4층
                </Box>

                <Box py={0.6} color="grey.500">
                  Email: 00000000@gmail.com
                </Box>

                <Box py={0.6} mb={2} color="grey.500">
                  Phone: +82 3913-0284
                </Box>

                <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => <a href={item.url} target="_blank" rel="noreferrer noopenner" key={ind}>
                      <IconButton sx={{
                    margin: 0.5,
                    fontSize: 12,
                    padding: "10px",
                    backgroundColor: "rgba(0,0,0,0.2)"
                  }}>
                        <item.icon fontSize="inherit" sx={{
                      color: "white"
                    }} />
                      </IconButton>
                    </a>)}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>;
};
const aboutLinks = ["인사말","언론보도","자료공개"];
const customerCareLinks = ["자주 묻는 말","고객센터"];
const iconList = [{
  icon: Facebook,
  url: "https://www.facebook.com/UILibOfficial"
}, {
  icon: Twitter,
  url: "https://twitter.com/uilibofficial"
}, {
  icon: Youtube,
  url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg"
}, {
  icon: Google,
  url: "https://www.google.com/search?q=ui-lib.com"
}, {
  icon: Instagram,
  url: "https://www.instagram.com/uilibofficial/"
}];
export default Footer1;