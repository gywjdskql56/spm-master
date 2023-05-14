import { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import AdminDashboardLayout from "components/layouts/admin-dashboard";
// import api from "utils/__api__/products";
import DateObject from "react-date-object";

// =============================================================================
EditProduct.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// =============================================================================

const INITIAL_VALUES = {
  name: "test-product",
  tags: "hi",
  price: 100,
  sale_price: 100,
  category1: '성형',
  category2: '서울',
  description: "desc",
  option: "추가(1029)|추가1(234)".split('|'),
  img: 'img_1',
  show: true,
  dates : [[new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
  [new DateObject().set({ day: 28 }), new DateObject().set({ day: 28 })],
  [new DateObject("2023-05-23"), new DateObject("2023-05-24")]]
};

// form field validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("required"),
  category: yup.array().min(1).required("required"),
  dates: yup.array().required("required"),
  description: yup.string().required("required"),
  stock: yup.number().required("required"),
  price: yup.number().required("required"),
  sale_price: yup.number().required("required"),
  tags: yup.string().required("required")
});
export default function EditProduct() {
  const {
    query
  } = useRouter();
  console.log(INITIAL_VALUES)
  const [product, setProduct] = useState({
    ...INITIAL_VALUES
  });

  // useEffect(() => {
  //   api.getProduct(query.slug as string).then((data) => {
  //     setProduct((state) => ({
  //       ...state,
  //       name: data.title,
  //       price: data.price,
  //       category: data.categories,
  //     }));
  //   });
  // }, [query.slug]);

  const handleFormSubmit = () => {};
  return <Box py={4}>
      <H3 mb={2}>Edit Product</H3>

      <ProductForm initialValues={product} validationSchema={validationSchema} handleFormSubmit={handleFormSubmit} />
    </Box>;
}