import Router from "next/router";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { ProductRow } from "pages-sections/vendor";
import api from "utils/__api__/dashboard";
import { targetUrl } from "components/config";

// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "name",
  label: "상품명",
  align: "left"
}, {
  id: "category",
  label: "카테고리",
  align: "left"
}, {
  id: "brand",
  label: "지역",
  align: "left"
}, {
  id: "price",
  label: "가격",
  align: "left"
}, {
  id: "published",
  label: "공개여부",
  align: "left"
}, {
  id: "action",
  label: "수정 및 삭제",
  align: "center"
}];

// =============================================================================
ProductList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================
const product_base = [{
"id":1,
"slug":1,
"name":"Plastic Surgery in Gyeongbokgung Palace",
"region":"SEOUL",
"price":1,
"sale_price":2,
"option":'',
"image":1,
"published":true,
"category":"",
}]

export default function ProductList(props) {
  const [product, setProduct] = useState(product_base);
  useEffect(() => {
    fetch(targetUrl+"/vendor-products",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data); setProduct(data.data)});
    }, []);
  const {
    products
  } = props;

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredProducts = product.map(item => ({
    id: item.productId,
    slug: item.productId,
    name: item.productName,
    region: item.regionName,
    price: item.price,
    sale_price: item.salePrice,
    option: item.option,
    image: "/assets/images/products/Package/"+item.img+".png",
    published: item.open,
    category: item.category.categoryName
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
    listData: filteredProducts
  });

  return <Box py={4}>
      <H3 mb={2}>상품 리스트</H3>

      {/*<SearchArea handleSearch={() => {}} buttonText="상품 추가하기" searchPlaceholder="상품 검색하기..." handleBtnClick={() => Router.push("/vendor/products/create")} />*/}

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={product.length} numSelected={selected.length} onRequestSort={handleRequestSort} />
                <TableBody>
                  {filteredList.map((product, index) => <ProductRow product={product} key={index} />)}
                </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(product.length / rowsPerPage)} />
        </Stack>
      </Card>
    </Box>;
}
export const getStaticProps = async () => {
  const products = await api.products();
//  const [product, setProduct] = useState([]);
//  fetch("http://localhost:5003/get_product/123-45-12345")
//    .then((response) =>
//        response.json())
//    .then((data) =>
//        {console.log(data); setProduct(data)});
  return {
    props: {
      products
    }
  };
};