import Router from "next/router";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import AdminDashboardLayout from "components/layouts/admin-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { CategoryRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import { useState, useEffect } from "react";
import { targetUrl, weburl, getAuth, } from "components/config";

// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "id",
  label: "카테고리 코드",
  align: "left"
}, {
  id: "name",
  label: "카테고리명",
  align: "left"
}, ];


{/*{
  id: "image",
  label: "이미지",
  align: "left"
}, {
  id: "level",
  label: "카테고리 단계",
  align: "left"
}, {
  id: "featured",
  label: "공개 여부",
  align: "left"
}, {
  id: "action",
  label: "수정/편집",
  align: "center"
}*/}
const category_base = [
        {
            "categoryId": 1,
            "name": "LASIK,LASEK"
        },
        {
            "categoryId": 2,
            "name": "IMPLANT"
        },
        {
            "categoryId": 3,
            "name": "PLASTIC SURGERY"
        },
        {
            "categoryId": 4,
            "name": "MEDICAL CHECK"
        },
        {
            "categoryId": 5,
            "name": "NON-SURGICAL COSMETIC TREATMENT"
        },
        {
            "categoryId": 6,
            "name": "LASER"
        }
    ]
// =============================================================================
CategoryList.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function CategoryList(props) {
  const {
    categories
  } = props;

   const [category, setCategory] = useState(category_base);
   const [open, setOpen] = useState(false);
   const [open2, setOpen2] = useState(false);

   {/*const [order, setOrder] = useState(null);
   const [orderBy, setOrderBy] = useState(null);
   const [rowsPerPage, setRowsPerPage] = useState(null);
   const [filteredList, setFilteredList] = useState(null);
   const [handleChangePage, setHandleChangePage] = useState(null);
   const [handleRequestSort, setHandleRequestSort] = useState(null);*/}

   const getData = async () => {

   const res = await fetch(targetUrl+"/categories",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
   const data = await res.json();
   setCategory(data.data)
   console.log(data);
   if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 관리자로 로그인해주세요. ")
    window.location.href =  weburl
    }
  }
  console.log(data.data);
  setCategory((data.data))

  return data;
  }
  useEffect(() => {

   getData()
   setOpen2(true)
  }, []);

   const filteredCategories = category.map(item => ({
    id: item.categoryId,
    name: item.name,

  }));

      {/*slug: item.slug,
    image: item.image,
    featured: item.featured,
    level: Math.ceil(Math.random() * 1)*/}
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredCategories
  });
  {/*setOrder(order1)
  setOrderBy(orderBy1)
  setRowsPerPage(selected1)
  setFilteredList(rowsPerPage1)
  setHandleChangePage(handleChangePage1)
  setHandleRequestSort(handleRequestSort1)8/}




  {/*setOrder(order1)
  setOrderBy(orderBy1)
  setRowsPerPage(selected1)
  setFilteredList(rowsPerPage1)
  setHandleChangePage(handleChangePage1)
  setHandleRequestSort(handleRequestSort1)*/}



  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  {/*const filteredCategories = categories.map(item => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: item.image,
    featured: item.featured,
    level: Math.ceil(Math.random() * 1)
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
    listData: filteredCategories
  });*/}
  return <Box py={4}>
      <H3 mb={2}>상품 카테고리</H3>

      {/*<SearchArea handleSearch={() => {}} buttonText="카테고리 추가" searchPlaceholder="카테고리 검색" handleBtnClick={() => Router.push("/admin/categories/create")} />*/}
       {open2?
      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={categories.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(category => <CategoryRow item={category} key={category.categoryId} selected={selected} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(categories.length / rowsPerPage)} />
        </Stack>
      </Card>:
      <div />}
    </Box>;
}
export const getStaticProps = async () => {
  const categories = await api.category();
  return {
    props: {
      categories
    }
  };
};