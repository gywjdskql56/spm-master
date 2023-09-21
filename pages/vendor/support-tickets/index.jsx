import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import SearchInput from "components/SearchInput";
import useMuiTable from "hooks/useMuiTable";
import { useCallback, useState, useEffect } from "react";
import { StatusWrapper, StyledTableRow, StyledTableCell, StyledIconButton } from "pages-sections/vendor";
import api from "utils/__api__/ticket";
import { targetUrl, getAuth } from "components/config";
import { useRouter } from "next/router";

const tableHeading = [{
  id: "title",
  label: "문의",
  align: "left"
}, {
  id: "category",
  label: "카테고리",
  align: "left"
}, {
  id: "type",
  label: "진행상황",
  align: "left"
},{
  id: "date",
  label: "업로드 날짜",
  align: "left"
},{
  id: "date2",
  label: "답변 날짜",
  align: "left"
},  {
  id: "action",
  label: "수정",
  align: "center"
}];

const table_base = [{
answer : null,
answerDate : null,
answerUpdateDate : null,
contents : "test",
email : "gywjdskql5915@gmail.com",
oauthProvider: "self",
open : true,
productId : 1,
productqnaId : 2,
title : "test",
type : "결제",
updateDate : null,
writeDate : "2023-08-22T14:12:57.136695"}]

// =============================================================================
SupportTickets.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function SupportTickets({
  ticketList
}) {
  const router = useRouter();

  const [tickets, setTickets] = useState(table_base);

    const getTicket = async () => {
    const res = await fetch(targetUrl+"/productqnas",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  setTickets(data.data)
  console.log(data);
  if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 판매자로 로그인해주세요. ")
    window.location.href =  "/"
    }
  }
  console.log(data.data);
  setTickets((data.data))
  return data;
  }
  const DeleteFAQ = async (id) => {
        console.log(id)
      const res = await fetch(targetUrl+"/sysqnas/"+id,{
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
        window.location.reload()
        }
      } else {
        if (typeof window !== "undefined") {
        window.alert("문의글 삭제에 실패했습니다.")
        window.location.reload()
        }
      }
    console.log(id)
  }

  useEffect(() => {
    getTicket()
  },[])


  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: tickets,
    defaultSort: "date"
  });
  return <Box py={4}>
      {/*<SearchInput placeholder="Search Ticket.." sx={{
      mb: 4
    }} />*/}

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 800
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={tickets.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((ticket, index) =>
                    <StyledTableRow role="checkbox" key={index}>
                    <StyledTableCell align="left">
                      {ticket.title}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <StatusWrapper status={ticket.type}>
                        {ticket.type}
                      </StatusWrapper>
                    </StyledTableCell>
                    {ticket.answerDate ==null?
                    <StyledTableCell align="left">
                      <StatusWrapper status={"답변대기중"}>
                        {"답변대기중"}
                      </StatusWrapper>
                    </StyledTableCell>
                    :
                    <StyledTableCell align="left">
                      <StatusWrapper status={"답변완료"}>
                        {"답변완료"}
                      </StatusWrapper>
                    </StyledTableCell>}
                    <StyledTableCell align="left">
                      {ticket.writeDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {ticket.updateDate==null? ticket.answerDate: ticket.updateDate}
                    </StyledTableCell>


                    <StyledTableCell align="center">
                      <StyledIconButton onClick={() => router.push(`/vendor/support-tickets/${ticket.productqnaId}`)}>
                        <Edit />
                      </StyledIconButton>
                      {/*<StyledIconButton>
                        <Delete />
                      </StyledIconButton>*/}
                    </StyledTableCell>
                  </StyledTableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(tickets.length / rowsPerPage)} />
        </Stack>
      </Card>
    </Box>;
}
export const getStaticProps = async () => {
  const ticketList = await api.getTicketList();
  return {
    props: {
      ticketList
    }
  };
};