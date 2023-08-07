import Link from "next/link";
import { format } from "date-fns";
import { Person } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Grid, Typography, useMediaQuery } from "@mui/material";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { useState, useEffect } from "react";
import { targetUrl, weburl } from "components/config";
// ============================================================

const Profile = ({
  profiles
}) => {
  console.log(profiles)
  const downMd = useMediaQuery(theme => theme.breakpoints.down("md"));
  const [users, setUsers] = useState({"memberId":"0","firstName":"-","lastName":"-"});
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (profiles.status =="error"){
      if (typeof window !== "undefined") {
        setUsers({"memberId":"0","firstName":"-","lastName":"-"})
       window.alert("권한이 없습니다. 회원으로 로그인해주세요. ")
       window.location.href =  weburl
      }
    } else {
      setUsers(profiles.data)
    }
    setOpen(true)
  },[open])

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href={`/profile/${users.memberId}`} passHref>
      <Button color="primary" sx={{
      px: 4,
      bgcolor: "primary.light"
    }}>
        프로필 수정
      </Button>
    </Link>;
  const infoList = [{
    title: "-",
    subtitle: "전체 주문건수"
  }, {
    title: "-",
    subtitle: "결제 대기"
  }, {
    title: "-",
    subtitle: "사용 대기"
  }, {
    title: "-",
    subtitle: "리뷰 작성"
  }];
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader icon={Person} title="내 프로필" button={HEADER_LINK} navigation={<CustomerDashboardNavigation />} />

      {/* USER PROFILE INFO */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card sx={{
            display: "flex",
            p: "14px 32px",
            height: "100%",
            alignItems: "center"
          }}>
              {/*<Avatar src={user.avatar} sx={{
              height: 64,
              width: 64
            }} />*/}

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">{`${users.firstName} ${users.lastName}`}</H5>
                    <FlexBox alignItems="center">
                      {/*<Typography color="grey.600">포인트:</Typography>
                      <Typography ml={0.5} color="primary.main">
                        {currency(5.50)}
                      </Typography>*/}
                    </FlexBox>
                  </div>

                  <Typography color="grey.600" letterSpacing="0.2em">
                     일반회원
                  </Typography>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              {infoList.map(item => <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card sx={{
                height: "100%",
                display: "flex",
                p: "1rem 1.25rem",
                alignItems: "center",
                flexDirection: "column"
              }}>
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {item.title}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>)}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow sx={{
      cursor: "auto",
      p: "0.75rem 1.5rem",
      ...(downMd && {
        alignItems: "start",
        flexDirection: "column",
        justifyContent: "flex-start"
      })
    }}>
        <TableRowItem title="이름" value={users.firstName} />
        <TableRowItem title="성" value={users.lastName} />
        <TableRowItem title="이메일" value={users.email} />
        <TableRowItem title="휴대폰번호" value={users.phoneNum} />
        <TableRowItem title="국가" value={users.country} />
      </TableRow>
    </CustomerDashboardLayout>;
};
const TableRowItem = ({
  title,
  value
}) => {
  return <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textAlign="left">
        {title}
      </Small>
      <span>{value}</span>
    </FlexBox>;
};
export const getStaticProps = async () => {
  const profileRes = await fetch(targetUrl+"/members/myinfo",{
    method: 'GET',
    credentials : 'include',
    headers: {
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": true,
  }})
const profile = await profileRes.json();
console.log("profile")
console.log(profile)

return {
  props: {
    profiles : profile
  }
};

// {"status":"error", "data": {"memberId":"0","firstName":"-","lastName":"-"}
};
export default Profile;