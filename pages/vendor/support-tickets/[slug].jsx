import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import SearchInput from "components/SearchInput";
import useMuiTable from "hooks/useMuiTable";
import { StatusWrapper, StyledTableRow, StyledTableCell, StyledIconButton } from "pages-sections/admin";
import api from "utils/__api__/ticket";
import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar, Button, Divider, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { H3, H5, Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { format } from "date-fns";

// =============================================================================
SupportTickets.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function SupportTickets() {

  const router = useRouter();

  // HANDLE FORM SUBMIT
  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(text)
    fetch('http://localhost:5003/insert_ticket',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'id': window.location.href.split("/").splice(-1)[0],
      'answer': text})
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.response);
    if(response.response=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 등록되었습니다.")
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("상품등록에 실패하였습니다. 다시 시도해주세요.")
            }
    }})
  };

  const [text, setText] = useState("");
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const ticket_id = window.location.href.split("/").splice(-1);
    console.log(ticket_id[0]);
    fetch(`http://localhost:5003/get_ticket_by_id/${window.location.href.split("/").splice(-1)[0]}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {setTicket(data['data']);console.log(data);setText(data['data'].answer)}
    );
  },[])

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const [open, setOpen] = useState(true);
  const [state, setState] = useState({
    cust: true,
    shop: false,
  });
    const handleChange_check = (event) => {
  if (event.target.name=='cust'){
  setState({
    cust: true,
    shop: false,});
  } else {
  setState({
    cust: false,
    shop: true,});
  }
  };
  const { cust, shop } = state;
  const error = [cust, shop].filter((v) => v).length !== 1;

  return <Box py={4}>
      {/*<SearchInput placeholder="Search Ticket.." sx={{
      mb: 4
    }} />*/}
    <H3 mb={2}>Edit Support-tickets</H3>

            <Divider sx={{
      mb: 4,
      borderColor: "grey.300"
    }} />

      <Link href="admin/insert_ticket_answer" passHref>
      <Button color="primary" sx={{
      px: 4, mb: 3,
      bgcolor: "primary.light"
    }}>
        고객센터 목록으로 돌아가기
      </Button>
    </Link>
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

      {/*<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Please select a recipient</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={cust} onChange={handleChange_check} name="cust" />
            }
            label="Administrator"
          />
          <FormControlLabel
            control={
              <Checkbox checked={shop} onChange={handleChange_check} name="shop" />
            }
            label="Vendor"
          />
        </FormGroup>
      </FormControl>*/}

      {/* FORM AREA */}
      <form onSubmit={handleFormSubmit}>
        <TextField rows={8} fullWidth multiline sx={{
        mb: 3
      }} placeholder="Write your message here..." value={text} onChange={e => setText(e.target.value)} />

      {/*<FormControlLabel
        control={
          <Checkbox checked={open} onChange={()=>{setOpen(!open)}} name="shop" />
        }
        label="Private"
      />*/}

        <Button type="submit" color="primary" variant="contained" sx={{
        ml: "auto",
        display: "block"
      }}>
          수정
        </Button>
      </form>
{/*//        <Scrollbar>
//          <TableContainer sx={{
//          minWidth: 800
//        }}>
//            <Table>
//              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={ticketList.length} numSelected={selected.length} onRequestSort={handleRequestSort} />
//
//              <TableBody>
//                {filteredList.map((ticket, index) => <StyledTableRow role="checkbox" key={index}>
//                    <StyledTableCell align="left">
//                      {ticket.title}
//                    </StyledTableCell>
//
//                    <StyledTableCell align="left">
//                      <StatusWrapper status={ticket.type}>
//                        {ticket.type}
//                      </StatusWrapper>
//                    </StyledTableCell>
//                    <StyledTableCell align="left">
//                      {ticket.category}
//                    </StyledTableCell>
//                    <StyledTableCell align="left">
//                      {ticket.date}
//                    </StyledTableCell>
//
//
//                    <StyledTableCell align="center">
//                      <StyledIconButton onClick={() => router.push(`/admin/support-tickets/${slug}`)}>
//                        <Edit />
//                      </StyledIconButton>
//                      <StyledIconButton>
//                        <Delete />
//                      </StyledIconButton>
//                    </StyledTableCell>
//                  </StyledTableRow>)}
//              </TableBody>
//            </Table>
//          </TableContainer>
//        </Scrollbar>
//
//        <Stack alignItems="center" my={4}>
//          <TablePagination onChange={handleChangePage} count={Math.ceil(ticketList.length / rowsPerPage)} />
//        </Stack>*/}

    </Box>;
}
{/* export const getStaticProps = async () => {
  const ticketList = await api.getTicketList();
  return {
    props: {
      ticketList
    }
  };
};*/}