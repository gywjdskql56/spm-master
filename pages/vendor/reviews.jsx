import { RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box, Card, Rating, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Scrollbar from "components/Scrollbar";
import { FlexBox } from "components/flex-box";
import TableHeader from "components/data-table/TableHeader";
import { H3, Paragraph, Small } from "components/Typography";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import useMuiTable from "hooks/useMuiTable";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "pages-sections/admin";
import api from "utils/__api__/vendor";
import { useState, useEffect } from "react";
import { targetUrl, getAuth } from "components/config";

const tableHeading = [{
  id: "name",
  label: "상품명",
  align: "left"
}, {
  id: "customer",
  label: "고객",
  align: "left"
}, {
  id: "comment",
  label: "후기",
  align: "left"
}, {
  id: "rating",
  label: "별점",
  align: "left"
}, {
  id: "action",
  label: "수정/삭제",
  align: "center"
}];

// =============================================================================
Reviews.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// =============================================================================

export default function Reviews({
  reviews
}) {
  const [open, setOpen] = useState(false);
const [list, setList] = useState([]);
useEffect(() => {fetch(targetUrl+"/review/vendor",{
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
 console.log(reviews)
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
      <H3 mb={2}>상품 후기</H3>

      {open? <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 1000
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={reviews.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((review, index) => <StyledTableRow tabIndex={-1} role="checkbox" key={index}>
                    <StyledTableCell align="left">
                      <FlexBox alignItems="center" gap={1.5}>
                        <Avatar src={review.image} sx={{
                      borderRadius: "8px"
                    }} />
                        <Paragraph>{review.name}</Paragraph>
                      </FlexBox>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {review.customer}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <Small>{review.comment}</Small>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <Rating value={review.rating} size="small" color="warning" readOnly />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <StyledIconButton>
                        <RemoveRedEye />
                      </StyledIconButton>
                    </StyledTableCell>
                  </StyledTableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(reviews.length / rowsPerPage)} />
        </Stack>
      </Card>:<div />}
    </Box>;
}
export const getStaticProps = async () => {
  const reviews = await api.getAllProductReviews();
  return {
    props: {
      reviews
    }
  };
};