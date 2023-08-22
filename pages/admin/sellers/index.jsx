import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import AdminDashboardLayout from "components/layouts/admin-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import useMuiTable from "hooks/useMuiTable";
import { SellerRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { useEffect, useState } from "react";
import { targetUrl } from "components/config";

// table column list
const tableHeading = [{
  id: "businessRegistrationNumber",
  label: "사업자등록번호",
  align: "left"
}, {
  id: "companyName",
  label: "회사명",
  align: "left"
}, {
  id: "companyType",
  label: "판매사 유형",
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
  id: "approvedDate",
  label: "회원가입 승인날짜",
  align: "left"
},
{
  id: "files",
  label: "서류",
  align: "left"
}
];

const sellers_new = [{
  businessRegistrationNumber: "+12345678910",
  companyName: "떠나요 여행사",
  companyType: "유치업자",
  phoneNum: "010-1234-5678",
  email: "hana@gmail.com",
  approvedDate: "2023-06-11T11:30:30" //"/assets/images/avatars/001-man.svg"
}, {
  businessRegistrationNumber: "+12343458910", //phone
  companyName: "모두투어", //shopName
  companyType: "유치업자", //name
  phoneNum: "010-1234-5678", //package
  email: "hana@gmail.com", //published
  approvedDate: "2023-06-11T11:30:30"
},]


// =============================================================================
SellerList.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function SellerList({
  sellers
}) {


  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(sellers_new);

  const getData = async () => {

  const res = await fetch(targetUrl+"/members/vendor/infos",{
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
    window.location.href =  "/"
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
      <H3 mb={2}>판매자</H3>

      {/*<SearchArea handleSearch={() => {}} buttonText="새로운 판매자 등록" handleBtnClick={() => {}} searchPlaceholder="판매자 검색" />*/}

      <Card>
        <Scrollbar>
          {info!=sellers_new? <TableContainer sx={{
          minWidth: 1100
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={sellers.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((seller, index) => <SellerRow seller={seller} key={index} />)}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <div />
          }
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(sellers.length / rowsPerPage)} />
        </Stack>
      </Card>
    </Box>;
}
export const getStaticProps = async () => {
  const sellers = await api.sellers();
  return {
    props: {
      sellers
    }
  };
};