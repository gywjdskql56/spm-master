import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import AdminDashboardLayout from "components/layouts/admin-dashboard";
import useMuiTable from "hooks/useMuiTable";
import { CustomerRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { targetUrl, weburl } from "components/config";
import { useEffect, useState } from "react";

const customers_new = [{
  id: "df933ff2-2813-4a8a-9db5-8a7c97c1ea06",
  email: "ethan@gmail.com",
  phoneNum: "+12345678910",
  avatar: "/assets/images/avatars/001-man.svg",
  oauthProvider: 10350.25,
  country: "07",
  firstName: "Ethan Booth",
  lastName: "Ethan Booth"
}, {
  id: "bddc6241-21fd-4bd8-a4e4-ea289ec609cd",
  email: "sofia@gmail.com",
  phoneNum: "+12343458910",
  joinDate: "/assets/images/avatars/002-girl.svg",
  oauthProvider: 12350.45,
  country: "02",
  firstName: "Sofia Hall",
  lastName: "Sofia Hall"
},];

// table column list
const tableHeading = [{
  id: "firstName",
  label: "이름",
  align: "left"
},{
  id: "lastName",
  label: "성",
  align: "left"
}, {
  id: "phoneNum",
  label: "휴대폰 번호",
  align: "left"
}, {
  id: "email",
  label: "이메일",
  align: "left"
}, {
  id: "country",
  label: "국가",
  align: "left"
}, {
  id: "joinDate",
  label: "가입일",
  align: "left"
}, ];

// =============================================================================
CustomerList.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function CustomerList({
  customers,
}) {
console.log(customers)



//
  const [info, setInfo] = useState(customers_new);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
//  const [order, setOrder] = useState(null);
//  const [orderBy, setOrderBy] = useState(null);
//  const [selected, setSelected] = useState(null);
//  const [rowsPerPage, setRowsPerPage] = useState(null);
//  const [filteredList, setFilteredList] = useState(null);
//  const [handleChangePage, setHandleChangePage] = useState(null);
//  const [handleRequestSort, setHandleRequestSort] = useState(null);


  const getData = async () => {

  const res = await fetch(targetUrl+"/members/infos",{
          credentials : 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  const infos = data.data;
  console.log(data);
  if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 관리자로 로그인해주세요. ")
    window.location.href =  weburl
    }
  }
  console.log(data.data);
  setInfo(data.data)
  return data;
  }

   useEffect(() => {
    getData();
    setOpen(true)
  }, []);

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: info
  });





  return <Box py={4}>
      <H3 mb={2}>회원 리스트</H3>

      {/*<SearchArea handleSearch={() => {}} buttonText="회원 추가" handleBtnClick={() => {}} searchPlaceholder="회원 검색" />*/}

      <Card>
        {info!=customers_new? <div><Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(customer => <CustomerRow customer={customer} key={customer.id} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
        </Stack></div>:
        <div />
        }
      </Card>
    </Box>;
}
export const getStaticProps = async () => {
  const customers = await api.customers();
  return {
    props: {
      customers,
    }
  };
};