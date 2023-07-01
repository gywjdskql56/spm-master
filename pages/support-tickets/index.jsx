import Link from "next/link";
import { Box, Chip, IconButton, Pagination, styled, Typography } from "@mui/material";
import { East } from "@mui/icons-material";
import { format } from "date-fns";
import TableRow from "components/TableRow";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { useState, useEffect } from "react";
import CustomerService from "components/icons/CustomerService";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/ticket";
import { targetUrl, weburl } from "components/config";

// styled components
const StyledChip = styled(Chip)(({
  theme,
  green
}) => ({
  height: 26,
  margin: "6px",
  padding: " 0 0.25rem",
  color: green ? theme.palette.success.main : theme.palette.primary.main,
  backgroundColor: green ? theme.palette.success[100] : theme.palette.primary.light
}));

// =============================================

// =============================================

const TicketList = () => {
    const [ticketList, setTicketList] = useState(null);
    const getTicket = async () => {
    const res = await fetch(targetUrl+"/sysqnas",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  setTicketList(data.data)
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
    {/*getTicket()*/}
    fetch("http://localhost:5003/get_ticket")
    .then((response) =>
        response.json())
    .then((data) =>
        {setTicketList(data['data']);console.log(data)}
    )
    ;},[])
  console.log(ticketList)
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader title="고객센터" icon={CustomerService} navigation={<CustomerDashboardNavigation />} />

      {/* SUPPORT TICKET LIST AREA */}
      {ticketList!=null?
      ticketList.map(item => <Link href={`/support-tickets/${item.id}`} key={item.id} passHref>
          <TableRow sx={{
        my: "1rem",
        p: "15px 24px"
      }}>
            <Box>
              <span>{item.question_title}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt={1} m={-0.75}>
                <StyledChip label={item.type} size="small" />
                <StyledChip label={item.status} size="small" green={1} />

                <Span className="pre" m={0.75} color="grey.600">
                  {format(new Date(item.date), "MMM dd, yyyy")}
                </Span>

                <Span m={0.75} color="grey.600">
                  {item.to}
                </Span>
              </FlexBox>
            </Box>

            <Typography flex="0 0 0 !important" textAlign="center" color="grey.600">
              <IconButton>
                <East fontSize="small" color="inherit" sx={{
              transform: ({
                direction
              }) => `rotate(${direction === "rtl" ? "180deg" : "0deg"})`
            }} />
              </IconButton>
            </Typography>
          </TableRow>
        </Link>)
        : <div />}

      {/* PAGINATION AREA */}
      <FlexBox justifyContent="center" mt={5}>
        <Pagination count={5} color="primary" variant="outlined" onChange={data => console.log(data)} />
      </FlexBox>
    </CustomerDashboardLayout>;
};

export default TicketList;