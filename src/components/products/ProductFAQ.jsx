import { Box, Button, TextField, Rating, Checkbox, FormControlLabel } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox } from "components/flex-box";
import ProductCommentFAQ from "./ProductCommentFAQ";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { H2, H5 } from "components/Typography";
import { useCallback, useState, useEffect } from "react";
import Select from 'react-select'
// ===================================================

// ===================================================

const ProductFAQ = ({review, product_id}) => {
  const options = [
  { value: '회원가입/로그인', label: '회원가입/로그인' },
  { value: '예약/결제', label: '예약/결제' },
  { value: '환불/교환', label: '환불/교환' },
  { value: '기타', label: '기타' }
]
const handleFormSubmit = async (values, {
    resetForm
  }) => {
  console.log(review)
    if (window.sessionStorage.getItem('id')==null){
        window.alert("로그인 후에 다시 진행해주세요.")
    }
    else{
    console.log('complete')
    console.log(values)
    fetch('http://localhost:5003/insert_review',{
      method: 'POST',
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
            window.alert("성공적으로 등록되었습니다.")
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("상품등록에 실패하였습니다. 다시 시도해주세요.")
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
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(true);

  return <Box>
      {review.map((item, ind) => <ProductCommentFAQ {...item} key={ind} />)}

      <H2 fontWeight="600" mt={7} mb={2.5}>
        Please write your question about the product.
      </H2>

      <form onSubmit={handleSubmit}>
        {/*<Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">서비스 만족도</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating color="warn" size="medium" value={values.rating} onChange={(_, value) => setFieldValue("rating", value)} />
        </Box>*/}

       <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Please select a category of your question</FormLabel>
      <Select options={options} onChange={(e) => setCategory(e.value)} />
    </FormControl>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Inquiries about products</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>
          <FlexBox mb={1.5} gap={0.5}>
          <TextField rows={1} fullWidth name="title" variant="outlined" onBlur={handleBlur} value={values.title} onChange={handleChange} placeholder="Title" error={!!touched.title && !!errors.title} helperText={touched.title && errors.title} />
          </FlexBox>
          <TextField rows={8} multiline fullWidth name="comment" variant="outlined" onBlur={handleBlur} value={values.comment} onChange={handleChange} placeholder="If you leave a detailed review, we can get a more detailed answer!" error={!!touched.comment && !!errors.comment} helperText={touched.comment && errors.comment} />
        </Box>

        <FormControlLabel
        control={
          <Checkbox checked={open} onChange={()=>{setOpen(!open)}} name="shop" />
        }
        label="Public"
      />

        <Button variant="contained" color="primary" type="submit" disabled={!(dirty && isValid)}>
          저장
        </Button>
      </form>
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
export default ProductFAQ;