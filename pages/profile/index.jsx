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
import fetch from "isomorphic-fetch";
import { targetUrl, getAuth } from "components/config";
// ============================================================

const Profile = (
) => {
  // console.log(props)
  // console.log(props.profiles)
  function withdraw() {
      fetch(targetUrl+"/accounts/withdraw",{
          credentials : 'include',
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data);
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 탈퇴되었습니다.")
            window.location.href = "/"
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("회원 탈퇴에 실패하였습니다. 다시 시도해주세요.")
            }
    }});
  }

  const getData = async () => {
    const profileRes = await fetch(targetUrl+"/members/myinfo",{
    method: 'GET',
    credentials : 'include',
    headers: {
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": true,
  }})
const profile = await profileRes.json();
console.log(profile)

if (profile.status =="error"){
  if (typeof window !== "undefined") {
    setUsers({"memberId":"0","firstName":"-","lastName":"-"})
   window.alert("권한이 없습니다. 회원으로 로그인해주세요. ")
  //  window.location.href =  '/'
  }
} else {
  setUsers(profile.data)
  setOpen(true)
}
return profile
}
  const downMd = useMediaQuery(theme => theme.breakpoints.down("md"));
  const [users, setUsers] = useState({"memberId":"0","firstName":"-","lastName":"-"});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getData()
//    window.location.href =  '/'
  },[])


  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <div>
      <Button color="primary" onClick={()=>withdraw()} sx={{
      px: 4,
      bgcolor: "primary.light"
    }}>
    Membership Withdrawal
      </Button>
   <Link href={`/profile/${users.memberId}`} passHref>
      <Button color="success" sx={{
      px: 4,
      marginLeft: 3,
      bgcolor: "success.light"
    }}>
        Edit Profile
      </Button>
    </Link>
    </div>;
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
      <UserDashboardHeader icon={Person} title="My Profile" button={HEADER_LINK} navigation={<CustomerDashboardNavigation />} />

      {/* USER PROFILE INFO */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
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
                     Member
                  </Typography>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          {/*<Grid item md={6} xs={12}>
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
          </Grid>*/}
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
        <TableRowItem title="firstName" value={users.firstName} />
        <TableRowItem title="lastName" value={users.lastName} />
        <TableRowItem title="Email" value={users.email} />
        <TableRowItem title="Phone" value={users.phoneNum} />
        <TableRowItem title="Nation" value={users.country} />
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
// export const getStaticProps = async () => {
//   const profileRes = await fetch(targetUrl+"/members/myinfo",{
//     method: 'GET',
//     credentials : 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       "ngrok-skip-browser-warning": true,
//   }})
// const profile = await profileRes.json();
// // console.log("profile")
// // console.log(profile)

// return {
//   props: {
//     profiles : profile
//   }
// };

// // {"status":"error", "data": {"memberId":"0","firstName":"-","lastName":"-"}
// };
export default Profile;