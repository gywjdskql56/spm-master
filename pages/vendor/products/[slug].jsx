import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import AdminDashboardLayout from "components/layouts/admin-dashboard";
// import api from "utils/__api__/products";
import DateObject from "react-date-object";
import dynamic from 'next/dynamic'
// =============================================================================
EditProduct.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// =============================================================================


export default function EditProduct() {
    const validationSchema = yup.object().shape({
      name: yup.string().required("required"),
      category: yup.array().min(1).required("required"),
      dates: yup.array().required("required"),
      option: yup.array().required("required"),
      description: yup.string().required("required"),
      stock: yup.number().required("required"),
      price: yup.number().required("required"),
      sale_price: yup.number().required("required"),
      tags: yup.string().required("required")
    });

  const [product, setProduct] = useState(null);


   useEffect(() => {
    const product_id = window.location.href.split("/").splice(-1);
    console.log(product_id)
     fetch("http://localhost:5003/get_product_by_id/"+product_id)
    .then((response) =>
        response.json())
    .then((data) =>
        {console.log(data);
        console.log(data[product_id]);
        console.log(data[product_id].date_list);
          const date_list = []
          for (let i=0; i<data[product_id].date_list.length; i++) {
            if (data[product_id].date_list[i].length>1){
                date_list.push([new DateObject(data[product_id].date_list[i][0]),new DateObject(data[product_id].date_list[i][1])])
            } else if (data[product_id].date_list[i].length==1){
                date_list.push([new DateObject(data[product_id].date_list[i][0])])
            }
          }
          console.log(date_list)
        setProduct(
        {
          name: data[product_id].product_name,
          tags: data[product_id].tags,
          price: data[product_id].price,
          sale_price: data[product_id].sale_price,
          category1: data[product_id].category_name,
          category2: data[product_id].region_name,
          description: data[product_id].detail,
          option: data[product_id].option.split('|'),
          img: data[product_id].img,
          show: data[product_id].public=='Y'?true:false,
          dates : date_list}
        )
        })

 }, []);


    const {
    query
  } = useRouter();

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
      {product!=null?
      <ProductForm initialValues={product} validationSchema={validationSchema} handleFormSubmit={handleFormSubmit} />:
      <div />}
    </Box>;
}