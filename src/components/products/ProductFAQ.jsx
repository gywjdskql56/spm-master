import { Box, Button, TextField, Rating, Checkbox, FormControlLabel, Grid } from "@mui/material";
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
import { targetUrl } from "components/config";
import FAQForm from "./FAQForm";

const ProductFAQ = ({faq, product_id}) => {
  const options = [
  { value: '예약', label: 'Booking' },
  { value: '결제', label: 'Pay' },
  { value: '상품', label: 'Product' },
  { value: '환불/교환', label: 'Refund/Exchange' },
  { value: '기타', label: 'Etc' }
]
const handleFormSubmit = async (values, {
    resetForm
  }) => {

  console.log({'productId':product_id, 'type': category, 'title':values.title,'contents': values.comment, 'open':open })

    fetch(targetUrl+'/productqnas',{
      method: 'POST',
      credentials : 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'productId':product_id, 'type': category, 'title':values.title,'contents': values.comment, 'open':open })
    })
    .then(response => response.json())
    .then(response => {console.log(response)
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 등록되었습니다.")
            window.location.reload()
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("상품등록에 실패하였습니다. 다시 시도해주세요.")
        }}
    })

    {/*fetch('http://localhost:5003/insert_review',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'date': values.date,'review': values.comment,'rating': values.rating, 'email':window.sessionStorage.getItem('id'), 'product_id':product_id})
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.response);*/}



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
      {/*faq.map((item, ind) => <Grid container spacing={2}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
      <ProductCommentFAQ {...item} key={ind} />
      </Grid>
      </Grid>)*/}
      <FAQForm itemList={faq} />

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
          Save
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