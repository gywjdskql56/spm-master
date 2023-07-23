import { Avatar, Box, Button, TextField, Rating, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarRating from "components/BazaarRating";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { getDateDifference } from "lib";
import { useCallback, useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Select from 'react-select'
import { useFormik } from "formik";
import * as yup from "yup";
import { targetUrl, weburl } from "components/config";

const ProductComment = props => {

  const {
  productQnaId,
  memberEmail,
  oauthProvider,
  type,
  title,
  contents,
  writeDate,
  updateDate,
  answerDate,
  answer,
  answerUpdateDate,
  open
  } = props;
  console.log(type)
  const options = [
  { value: '회원가입/로그인', label: 'Signup/Login' },
  { value: '예약/결제', label: 'Booking/Pay' },
  { value: '환불/교환', label: 'Refund/Exchange' },
  { value: '기타', label: 'Etc' }
]
  var option = options[0]
  for (let i=0; i<options.length; i++){
    if (options[i].value==type){
        option = options[i]
    }
  }
  const [category, setCategory] = useState(type);
  const [publicval, setPublic] = useState(open);
  const [titleval, setTitle] = useState(title);
  const [contentsval, setContents] = useState(contents);

  console.log(memberEmail)
  console.log(window.sessionStorage.getItem('id'))
  console.log(memberEmail==window.sessionStorage.getItem('id'))
  const [faqId, setFaqId] = useState(null);
  const [modify, setModify] = useState(false);

function handleChange_comment(e){
    setContents(e.target.value)
//    values.comment = e.target.value
//    console.log(values.comment)
}

function handleChange_title(e){
    setTitle(e.target.value)
//    values.title = e.target.value
//    console.log(values.title)
}

  function ModifyFAQ(){
    console.log(productQnaId)
    setFaqId(productQnaId)
    setModify(true)
  }

  function DeleteFAQ(){
    console.log(productQnaId)
    setFaqId(productQnaId)
    fetch(targetUrl+'/productqnas/'+productQnaId,{
      method: 'DELETE',
      credentials : 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(response => {console.log(response)
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 삭제되었습니다.")
            setModify(false)
            window.location.reload();
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("상품삭제에 실패하였습니다. 다시 시도해주세요.")
        }}
    })
  }
  const handleFormSubmit = async (values) => {

  console.log({'productQnaId':productQnaId, 'type': category, 'title':titleval,'contents': contentsval, 'open':publicval })

    fetch(targetUrl+'/productqnas/'+productQnaId,{
      method: 'PUT',
      credentials : 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'type': category, 'title':titleval,'contents': contentsval, 'open':publicval })
    })
    .then(response => response.json())
    .then(response => {console.log(response)
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 수정되었습니다.")
            setModify(false)
            window.location.reload();
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("상품수정에 실패하였습니다. 다시 시도해주세요.")
        }}
    })
  };

const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString(),
  title : title,
  comment : contents
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

  console.log(values)


  return <Box mb={4} maxWidth="600px">
      <FlexBox alignItems="center" mb={2}>
{/*        <Avatar src={imgUrl} sx={{
        width: 48,
        height: 48
      }} />*/}
        <Box ml={2}>
        <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box sx={{width: "600px", borderColor:"grey.100",border: 2,borderRadius: '16px',p: 2}}>
          <H5 mb={0.5}>{title}</H5>
          <Span mb={0.5}>{memberEmail}</Span>
          {updateDate==null?
           <Span>{" | "+ getDateDifference(writeDate)}</Span>
          : <Span>{" | "+ getDateDifference(updateDate)}</Span>}

          {modify==false && publicval?
           <Box sx={{borderColor:"grey.700", borderRadius: '10px',p: 2,backgroundColor:"#E2E6ED"}}>
          <FlexBox alignItems="center">
          <H6 mx={1.25}>{contents}</H6>
          </FlexBox>
        </Box>
          :
            (modify==false?
             <Box sx={{borderColor:"grey.700", borderRadius: '10px',p: 2,backgroundColor:"#E2E6ED"}}>
            <FlexBox alignItems="center">
                <H6 mx={1.25}>{"This is a private message"}</H6>
            </FlexBox>
            </Box>
            :
            <div />
            )
            }

        <Box mb={1} />
            {answer==null && memberEmail==window.sessionStorage.getItem('id') && modify==false?
            <Grid container spacing={3}>
            <Grid item lg={1} md={1} sm={1} xs={1}>
            <Button variant="contained" color="primary" onClick={()=>ModifyFAQ()} >
              Modify
            </Button>
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={1} />
            <Grid item lg={3} md={3} sm={3} xs={3}>
            <Button variant="contained" color="success" onClick={()=>DeleteFAQ()} >
              Delete
            </Button>
            </Grid>
            </Grid>
            :
            ///////////////////////////////////////////
            (answer==null && memberEmail==window.sessionStorage.getItem('id') && modify==true? <Box>
      <form onSubmit={handleFormSubmit}>
       <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Please select a category of your question</FormLabel>
      <Select defaultValue={option} options={options} onChange={(e) => setCategory(e.value)} />
    </FormControl>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">Inquiries about products</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>
          <FlexBox mb={1.5} gap={0.5}>
          <TextField rows={1} fullWidth name="title" variant="outlined" onBlur={handleBlur} value={titleval} onChange={(e)=>handleChange_title(e)} placeholder="Title" error={!!touched.title && !!errors.title} helperText={touched.title && errors.title} />
          </FlexBox>
          <TextField rows={8} multiline fullWidth name="comment" variant="outlined" onBlur={handleBlur} value={contentsval} onChange={(e)=>handleChange_comment(e)} placeholder="If you leave a detailed review, we can get a more detailed answer!" error={!!touched.comment && !!errors.comment} helperText={touched.comment && errors.comment} />
        </Box>

        <FormControlLabel
        control={
          <Checkbox checked={publicval} onChange={()=>{setPublic(!publicval)}} name="shop" />
        }
        label="Public"
      />

        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
    </Box>:
    <div />)}
        <Box mb={2} />

          {publicval && answer!=null?
          <Box sx={{borderColor:"grey.700", borderRadius: '10px',p: 2,backgroundColor:"#D3D3D3"}}>
          <FlexBox alignItems="center">
            <H6 mx={1.25}>{answer}</H6>
            </FlexBox>
            </Box>:
            (publicval && answer==null?
            <div></div>
            :<Box sx={{borderColor:"grey.700", borderRadius: '10px',p: 2,backgroundColor:"#D3D3D3"}}>
          <FlexBox alignItems="center">
          <H6 mx={1.25}>{"This is a private message"}</H6>
          </FlexBox>
            </Box>)
            }

        </Box>
        </Grid>
        </Grid>
        </Box>
      </FlexBox>

{/*      <Paragraph color="grey.700">{answer}</Paragraph>*/}
    </Box>;
};

const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required")
});
export default ProductComment;