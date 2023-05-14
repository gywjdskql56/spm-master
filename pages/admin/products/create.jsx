import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import AdminDashboardLayout from "components/layouts/admin-dashboard";
import DateObject from "react-date-object";
// =============================================================================
CreateProduct.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// =============================================================================

export default function CreateProduct() {
  const INITIAL_VALUES = {
    name: "",
    tags: "",
    sale_price: "",
    price: "",
    category1: "",
    category2: "",
    option: [],
    description: "",
    show: false,
    img: "",
    dates: [[new DateObject().set({ day: 19 }), new DateObject().set({ day: 23 })]],
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.array().min(1).required("required"),
    dates: yup.array().required("required"),
    option: yup.array().required("required"),
    description: yup.string().required("required"),
    region: yup.string().required("required"),
    img: yup.string().required("required"),
    price: yup.number().required("required"),
    sale_price: yup.number().required("required"),
    tags: yup.string().required("required")
  });
  const handleFormSubmit = values => {
    console.log(values);
  };
  return <Box py={4}>
      <H3 mb={2}>새로운 상품 추가하기</H3>

      <ProductForm initialValues={INITIAL_VALUES} validationSchema={validationSchema} handleFormSubmit={handleFormSubmit} />
    </Box>;
}