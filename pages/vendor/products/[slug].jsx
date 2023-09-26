import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/vendor";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
// import api from "utils/__api__/products";
import DateObject from "react-date-object";
import dynamic from 'next/dynamic'
import { targetUrl } from "components/config";

// =============================================================================
EditProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================


export default function EditProduct() {
    const validationSchema = yup.object().shape({
      name: yup.string(),
      category: yup.array().min(1),
      dates: yup.array(),
      option: yup.array(),
      description: yup.string(),
      stock: yup.number(),
      price: yup.number(),
      sale_price: yup.number(),
      tags: yup.string()
    });

  const [product, setProduct] = useState(null);


   useEffect(() => {
    const product_id = window.location.href.split("/").splice(-1);
    console.log(product_id)
     fetch(targetUrl+"/vendor-productDetails?productId="+product_id,{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
    .then((response) =>
        response.json())
    .then((res) =>
        {console.log(res);
        const data = res.data
        const date_list = []
        for (let i=0; i<data.servicePeriodList.length; i++) {
            if (data.servicePeriodList[i].length>1){
                date_list.push([new DateObject(data.servicePeriodList[i].startDate),new DateObject(data.servicePeriodList[i].endDate)])
            } else if (data.servicePeriodList[i].length==1){
                date_list.push([new DateObject(data.servicePeriodList[i].startDate)])
            }
        }
        console.log("date_list")
        console.log(date_list)
        console.log(data.servicePeriodList)
        console.log(data.courseDetailsList)
        const option_list = []
        for (let i=0; i<data.optionFeeList.length; i++) {
            option_list.push({'description': data.optionFeeList[i].name, 'price':data.optionFeeList[i].price, 'id':data.optionFeeList[i].id})
        }
       const desc_list = []
        for (let i=0; i<10; i++) {
            if (i<data.courseDetailsList.length){
            desc_list.push(data.courseDetailsList[i].description)
            }
            else {
            desc_list.push("")
            }
        }
        console.log("*********")
        console.log(desc_list)
        const productval = {
          name: data.productName,
          tags: data.tagList,
          price: data.price,
          sale_price: data.salePrice,
          category1: data.category.categoryId,
          category2: data.region.regionId,
          description: data.productDetails.description,
          option: option_list,
          optionNew: option_list,
          not_included: data.nonIncludedPartList,
          included: data.includedPartList,
          description: data.courseDetailsList,
          img: data.thumbnailImage,
          show: data.open,
          dates : date_list,
          servicePeriodList : data.servicePeriodList,
          type : data.type,
          data: data,
          desc_list :desc_list
          }
        setProduct( productval )
        console.log(product)
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