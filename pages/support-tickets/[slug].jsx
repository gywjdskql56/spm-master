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
// ==========================================================

const SupportTicketDetails = () => {
  const router = useRouter();

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

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const ticket_id = window.location.href.split("/").splice(-1);
    console.log(ticket_id[0]);
    fetch(`http://localhost:5003/get_ticket_by_id/${window.location.href.split("/").splice(-1)[0]}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {setTicket(data['data']);console.log(data)}
    );
  },[])

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
              QUESTION
            </H5>

            <Span color="grey.600">
              {ticket.email}{" | "}{format(new Date(ticket.date), "hh:mm:a | dd MMM yyyy")}
            </Span>

            <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
              {ticket.question}
            </Box>
          </Box>: <div />}
        </FlexBox>

        <FlexBox gap={2} mb={4} key="2">
          {/*<Avatar src={ticket.conversation.imgUrl} />*/}

          {ticket!=null? <Box>
            <H5 fontWeight="600" mt={0} mb={0}>
              ANSWER
            </H5>

            <Span color="grey.600">
              {format(new Date(ticket.date_answer), "hh:mm:a | dd MMM yyyy")}
            </Span>

            <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
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