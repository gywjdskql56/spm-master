import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import AdminDashboardLayout from "components/layouts/admin-dashboard";
import useMuiTable from "hooks/useMuiTable";
import { OrderRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { useState, useEffect } from "react";
import { targetUrl, getAuth } from "components/config";
// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "id",
  label: "주문 번호",
  align: "left"
}, {
  id: "qty",
  label: "수량",
  align: "left"
}, {
  id: "purchaseDate",
  label: "구매날짜",
  align: "left"
}, {
  id: "billingAddress",
  label: "구매자",
  align: "left"
}, {
  id: "amount",
  label: "금액",
  align: "left"
}, {
  id: "status",
  label: "처리 상태",
  align: "left"
}, {
  id: "action",
  label: "수정/삭제",
  align: "center"
}];

// =============================================================================
OrderList.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function OrderList({
  orders
}) {
const [open, setOpen] = useState(false);
const [list, setList] = useState([]);
useEffect(() => {fetch(targetUrl+"/checkout/sysadmin",{
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
  // RESHAPE THE ORDER LIST BASED TABLE HEAD CELL ID
  const filteredOrders = list.map(item => ({
    id: item.payId,
    qty: 1,
    purchaseDate: item.orderCreatedDate,
    billingAddress: item.payedMemberEmail,
    amount: item.productSalePrice,
    status: item.paypalOrderStatus
  }));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: list,
    defaultSort: "purchaseDate",
    defaultOrder: "desc"
  });
  return <Box py={4}>
      <H3 mb={2}>주문내역</H3>

      {open? <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(order => <OrderRow order={order} key={order.id} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
        </Stack>
      </Card> : <div />}
    </Box>;
}
export const getStaticProps = async () => {
  const orders = await api.orders();
  return {
    props: {
      orders
    }
  };
};