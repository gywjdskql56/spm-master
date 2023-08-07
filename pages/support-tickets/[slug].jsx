import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Avatar, Box, Button, Divider, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H5, Span } from "components/Typography";
import CustomerService from "components/icons/CustomerService";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/ticket";
import { targetUrl, getAuth } from "components/config";

// ==========================================================

const SupportTicketDetails = () => {
  const router = useRouter();


    const [ticket, setTicket] = useState(null);
    const getTicket = async () => {

    getAuth()

    {/*const response = await fetch(targetUrl+"/members/auth/",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const datar = await response.json();
  console.log(datar.status);*/}


    const ticket_id = window.location.href.split("/").splice(-1);
    const res = await fetch(targetUrl+"/sysqnas/"+ticket_id,{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();

  console.log(data);
  if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("Try again")
    window.location.href =  "/"
    }
  }else {
    if (data.data.open==false && data.data.email!=window.sessionStorage.getItem('id')){
        window.alert("You do not have access to private posts. Please log in with that account.")
        window.location.href =  "/support-tickets"
    }
    else {
        setTicket(data.data)
        return data;
    }
  }
  }
    useEffect(() => {
    getTicket()
    ;},[])

  // HANDLE FORM SUBMIT
  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(event);
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href="/support-tickets" passHref>
      <Button color="primary" sx={{
      px: 4,
      bgcolor: "primary.light"
    }}>
        고객센터 목록으로 돌아가기
      </Button>
    </Link>;



  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader button={HEADER_LINK} icon={CustomerService} title="고객센터" navigation={<CustomerDashboardNavigation />} />

      {/* CONVERSATION LIST */}
      <FlexBox gap={2} mb={4} key="1">
          {/*<Avatar src={ticket.conversation.imgUrl} />*/}

          {ticket!=null? <Box>
            <H5 fontWeight="600" mt={0} mb={0}>
              {ticket.title}
            </H5>

            <Span color="grey.600">
              {ticket.email}{" | "}{format(new Date(ticket.writeDate), "hh:mm:a | dd MMM yyyy")}
            </Span>

            <Box borderRadius="10px" bgcolor="grey.400" p={2} mt={2}>
              {ticket.contents}
            </Box>
          </Box>: <div />}
        </FlexBox>

        <FlexBox className='align-right' gap={2} mb={4} key="2">
          {/*<Avatar src={ticket.conversation.imgUrl} />*/}

          {ticket!=null? <Box>
            <H5 fontWeight="600" mt={0} mb={0}>
              ADMIN
            </H5>

            <Span color="grey.600">
              {format(new Date(ticket.answerDate), "hh:mm:a | dd MMM yyyy")}
            </Span>

            <Box borderRadius="10px" bgcolor="grey.400" p={2} mt={2}>
              {ticket.answer}
            </Box>
          </Box>: <div />}
        </FlexBox>

      <Divider sx={{
      mb: 4,
      borderColor: "grey.300"
    }} />

      {/* FORM AREA */}
      {/*<form onSubmit={handleFormSubmit}>
        <TextField rows={8} fullWidth multiline sx={{
        mb: 3
      }} placeholder="Write your message here..." />

        <Button type="submit" color="primary" variant="contained" sx={{
        ml: "auto",
        display: "block"
      }}>
          저장
        </Button>
      </form>*/}
      {ticket!=null && ticket.email==window.sessionStorage.getItem('id')?
      <Button type="submit" color="primary" variant="contained" sx={{
        ml: "auto",
        display: "block"
      }}>
          삭제
        </Button>:<div />
      }
    </CustomerDashboardLayout>;
};
{/*export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params
}) => {
  console.log(String(params.slug))
  const ticket = await api.getTicket(String(params.slug));
  return {
    props: {
      ticket
    }
  };
};*/}
export default SupportTicketDetails;