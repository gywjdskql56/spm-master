import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import useMuiTable from "hooks/useMuiTable";
import { RefundRequestRow } from "pages-sections/vendor";
import api from "utils/__api__/vendor";
import { useState, useEffect } from "react";
import { targetUrl, getAuth } from "components/config";
import axios from 'axios';
// table column list
const tableHeading = [{
  id: "payId",
  label: "주문번호",
  align: "left"
}, {
  id: "payedMemberEmail",
  label: "고객",
  align: "left"
}, {
  id: "productName",
  label: "상품 정보",
  align: "left"
}, {
  id: "payedTotalPrice",
  label: "금액",
  align: "left"
}, {
  id: "paypalOrderStatus",
  label: "처리상태",
  align: "left"
}, {
  id: "action",
  label: "자세히보기",
  align: "center"
}];

// =============================================================================
RefundRequest.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function RefundRequest({
      requests,

}) {


console.log("requests")
console.log(requests)

    const [sell, setSell] = useState(null);
    const [open, setOpen] = useState(false);
  useEffect(() => {fetch(targetUrl + "/checkout/vendor" , {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  }).then(response => response.json())
    .then(response => {console.log(response); if (response.status=="success") {


        var new_sell=[]
        console.log(response.data)
        for (var i=0; i<response.data.length; i++){
           new_sell.push({
            productName : response.data[i].productName,
            payId : response.data[i].payId,
            payedMemberEmail : response.data[i].payedMemberEmail,
            payedTotalPrice : response.data[i].payedTotalPrice,
            paypalOrderStatus : response.data[i].paypalOrderStatus,
            travelStartDate : response.data[i].travelStartDate,
           })
        }
        setSell(new_sell);
        console.log(new_sell);
        setOpen(true)
    } else {window.alert("Error")}})
    console.log(requests)
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
    listData: sell
  });
  return <Box py={4}>
      <H3 mb={2}>주문 내역</H3>

      {open? <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={sell.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((request, index) => <RefundRequestRow request={request} key={index} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(sell.length / rowsPerPage)} />
        </Stack>
      </Card>: <div />}
    </Box>;
}
export const getServerSideProps = async () => {
  const requests = await api.getAllRefundRequests();

  return {
    props: {
      requests,

    }
  };
}