import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, Stack, Table, TableContainer, Grid } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import AdminDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import SearchInput from "components/SearchInput";
import useMuiTable from "hooks/useMuiTable";
import { StatusWrapper, StyledTableRow, StyledTableCell, StyledIconButton } from "pages-sections/vendor";
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
import { targetUrl, getAuth } from "components/config";

// =============================================================================
SupportTickets.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function SupportTickets() {

  const router = useRouter();

  const [ticket, setTicket] = useState([]);
  const [id, setId] = useState([]);

  const getTicket = async () => {
  const ticket_id = window.location.href.split("/").splice(-1);
  setId(ticket_id)
  const res = await fetch(targetUrl+"/productqnas/",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  console.log(data);
  console.log(data.data);
for ( let i = 0; i < data.data.length; i++) {
    if (data.data[i].productId == ticket_id){
        console.log("Ticket")
        console.log(data.data[i])
        setTicket(data.data[i])
        setText(data.data[i].answer)
    }
}


//  setTicket(data.data)
//  setText(data.data[ticket_id].answer)
  if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 관리자로 로그인해주세요. ")
    window.location.href =  "/"
    }
  }
  console.log(data.data);
//  setTicket((data.data[ticket_id]))
  return data;
  }

   const DeleteFAQ = async (id) => {
        getAuth()
        console.log(id)
      const res = await fetch(targetUrl+"/sysqnas/answer/"+id,{
              method: 'DELETE',
              credentials : 'include',
              headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": true,
            }})
      const data = await res.json();
      console.log(data);
      if (data.status =="success"){
        if (typeof window !== "undefined") {
        window.alert("성공적으로 삭제되었습니다.")
        window.location.href =  "/vendor/support-tickets"
        }
      } else {
        if (typeof window !== "undefined") {
        window.alert("문의글 삭제에 실패했습니다.")
        window.location.reload()
        }
      }
    console.log(id)
  }



  // HANDLE FORM SUBMIT
    const cors = require("cors");
//    const app = express();
//    app.use(cors());
  const handleFormSubmit = event => {

    {/*fetch(targetUrl + '/members/vendor-approve/1',{
      method: "PATCH",
      credentials : 'include',
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({
      'answer': text})
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.response);
    if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 등록되었습니다.")
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("상품등록에 실패하였습니다. 다시 시도해주세요.")
            }
    }})*/}

    event.preventDefault();
    console.log(text)
    fetch(targetUrl + '/sysqnas/answer/'+id,{
      method: 'PATCH',
      credentials : 'include',
      headers: {
         "Content-Type": "application/json",
    },
      body: JSON.stringify({
      'answer': text})
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.response);
    if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 등록되었습니다.")
            window.location.href =  "/admin/support-tickets"
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("수정에 실패하였습니다. 다시 시도해주세요.")
            }
    }})
  };

  const [text, setText] = useState("");

  useEffect(() => {
    const ticket_id = window.location.href.split("/").splice(-1);
    console.log(ticket_id[0]);
    {/*fetch(`http://localhost:5003/get_ticket_by_id/${window.location.href.split("/").splice(-1)[0]}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {setTicket(data['data']);console.log(data);setText(data['data'].answer)}
    );*/}
    getTicket()
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

      <Link href={"/vendor/support-tickets"} passHref>
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
              {ticket.title}
            </H5>

            <Span color="grey.600">
              {ticket.email}{" | "}{ticket.writeDate}}
            </Span>

            <Box borderRadius="10px" bgcolor="grey.400" p={2} mt={2}>
              {ticket.contents}
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
      <Grid container spacing={1}>
      <Grid item lg={10} md={10} xs={10} />
      <Grid item lg={1} md={1} xs={1} >
        <Button type="submit" color="primary" variant="contained" sx={{
        ml: "auto",
        display: "block"
      }}>
          수정
        </Button>
        </Grid>
        <Grid item lg={1} md={1} xs={1} >
        <Button color="success" variant="contained" onClick={() => DeleteFAQ(ticket.sysqnaId)}
        sx={{
        ml: "auto",
        display: "block"
      }}>
          삭제
        </Button>
        </Grid>
        </Grid>
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