import { Box, Button, TextField, Rating } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox } from "components/flex-box";
import ProductComment from "./ProductComment";
import { H2, H5 } from "components/Typography";
import { useCallback, useState, useEffect } from "react";
import { targetUrl, getAuth } from "components/config";
// ===================================================

// ===================================================

const ProductReview = ({review, product_id}) => {


const handleFormSubmit = async (values, {
    resetForm
  }) => {
    if (window.sessionStorage.getItem('id')==null){
        window.alert("Please try again after logging in.")
    }
    else{
    console.log('complete')
    console.log(values)
    fetch(targetUrl+"/productDetails?productId="+product_id,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'date': values.date,'review': values.comment,'rating': values.rating, 'email':window.sessionStorage.getItem('id'), 'product_id':product_id})
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.response);
    if(response.response=='success'){
        if (typeof window !== "undefined") {
            window.alert("Your comment has successfully registered.")
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("Comment registration failed. please try again.")
            }
    }})}
    resetForm();
  };
  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
    validationSchema: reviewSchema
  });

  return <Box>
      {review.map((item, ind) => <ProductComment {...item} key={ind} />)}

      {/*<H2 fontWeight="600" mt={7} mb={2.5}>
        Please tell us your review about the product.
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Service satisfaction</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating color="warn" size="medium" value={values.rating} onChange={(_, value) => setFieldValue("rating", value)} />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Write a review</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField rows={8} multiline fullWidth name="comment" variant="outlined" onBlur={handleBlur} value={values.comment} onChange={handleChange} placeholder="If you leave a detailed review, it will help others!" error={!!touched.comment && !!errors.comment} helperText={touched.comment && errors.comment} />
        </Box>

        <Button variant="contained" color="primary" type="submit" disabled={!(dirty && isValid)}>
          저장
        </Button>
      </form>*/}
    </Box>;
};

const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString()
};
const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required")
});
export default ProductReview;