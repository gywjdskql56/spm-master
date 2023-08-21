import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import useMuiTable from "hooks/useMuiTable";
import { RefundRequestRow } from "pages-sections/admin";
import api from "utils/__api__/vendor";
import { useState, useEffect } from "react";
import { targetUrl, getAuth } from "components/config";

// table column list
const tableHeading = [{
  id: "payId",
  label: "주문번호",
  align: "left"
}, {
  id: "payedMemberEmail",
  label: "주문자",
  align: "left"
}, {
  id: "productName",
  label: "상품 정보",
  align: "left"
}, {
  id: "productSalePrice",
  label: "금액",
  align: "left"
}, {
  id: "paypalOrderStatus",
  label: "처리상태",
  align: "left"
}, {
  id: "action",
  label: "자세히",
  align: "center"
}];

// =============================================================================
RefundRequest.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function RefundRequest({
  requests
}) {
const [open, setOpen] = useState(false);
const [list, setList] = useState([]);
useEffect(() => {fetch(targetUrl+"/checkout/vendor",{
          credentials : 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
    .then((response) =>
        response.json())
    .then((data) =>
        {if(data.status=='success'){console.log(data.data); setList(data.data);setOpen(true)} })},[])

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: list
  });
  return <Box py={4}>
      <H3 mb={2}>결제 내역</H3>

      {open? <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={list.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((request, index) => <RefundRequestRow request={request} key={index} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(list.length / rowsPerPage)} />
        </Stack>
      </Card>
      :<div />
      }
    </Box>;
}
export const getStaticProps = async () => {
  const requests = await api.getAllRefundRequests();
  return {
    props: {
      requests
    }
  };
};