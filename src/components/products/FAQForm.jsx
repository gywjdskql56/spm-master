import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Box, Button, Divider, Grid, Radio, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import { getDateDifference } from "lib";
import { targetUrl } from "components/config";

const FAQForm = ({itemList}) => {
  console.log("itemList")
  console.log(itemList)
  const [faqId, setFAQID] = useState(null);
  const [secret, setSecret] = useState([]);
  const [itemLists, setItemLists] = useState(itemList);
  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;
  const handleFormSubmit = async values => router.push("/payment");
  const handleChangeFAQ = ({
    target: {
      name
    }
  }) => {
    setFAQID(name);
    console.log("name")
    console.log(name)
  };
  const handlePrivate = async (productQnaId) => {

    fetch(targetUrl+'/secret-productqna/'+productQnaId,{
      method: 'GET',
      credentials : 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    })
    .then(response => response.json())
    .then(response => {console.log(response)
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("접근권한이 있습니다.")
            setSecret((prev)=>[...prev, productQnaId])
            var new_itemLists = []
            console.log(itemLists.length)
            for (var i=0; i<itemLists.length; i++){
                if(itemLists[i].productQnaId!=productQnaId){
                    console.log(i)
                    new_itemLists.push(itemLists[i])
                }else{
                    console.log("new_"+i)
                    response.data['memberEmail'] = response.data.email
                    response.data['productQnaId'] = response.data.productqnaId
                    console.log(response.data)

                    new_itemLists.push(response.data)

                }
            }
            setItemLists(prev=>new_itemLists)
        console.log(new_itemLists)
        console.log(response)
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("해당 문의에 대한 접근권한이 없습니다.")
        }}
    })
  };

  const handleDelete = async (productQnaId) => {

    fetch(targetUrl+'/productqnas/'+productQnaId,{
      method: 'DELETE',
      credentials : 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    })
    .then(response => response.json())
    .then(response => {console.log(response)
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("삭제되었습니다.")
            window.location.reload()
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("해당 문의에 대한 삭제권한이 없습니다.")
        }}
    })
  }
  return <Fragment>
      <Card1 sx={{
      mb: 4
    }}>
         {itemLists.map((faqItem)=><div>
            <FormControlLabel sx={{ mb: 3, mt : 3 }} name={faqItem.productQnaId} onChange={handleChangeFAQ} disabled={!faqItem.open && !secret.includes(faqItem.productQnaId)}
            label={<div><Paragraph fontWeight={600}>{"Q: " + faqItem.title}</Paragraph><Paragraph fontWeight={100}>{faqItem.updateDate==null?
           <Span sx={{textAlign: "right"}}>{faqItem.memberEmail+" | "+ getDateDifference(faqItem.writeDate)}</Span>
          : <Span sx={{textAlign: "right"}}>{faqItem.memberEmail+" | "+ getDateDifference(faqItem.updateDate)}</Span>}</Paragraph></div>}
          control={<Radio checked={faqId === faqItem.productQnaId.toString()} color="primary" size="small" />} />
           {faqItem.open?<div />
            :<Button variant="contained" color="success" onClick={()=>handlePrivate(faqItem.productQnaId)} >
              View Private
            </Button>}
        <Divider sx={{
        mb: 3,
        mx: -4
      }} />

        {faqId === faqItem.productQnaId.toString() &&
            <Grid container spacing={7}>
                <Grid item sm={12} xs={12}>
                <Box sx={{borderColor:"grey.700", borderRadius: '10px',p: 2,backgroundColor:"#E2E6ED", textAlign: "left"}}>
                <div sx={{mb : 3}}>
                {faqItem.contents}
                </div>
                {/*<Button variant="contained" color="error" onClick={()=>handleEdit(faqItem.productQnaId)} >
                  Edit
                </Button>*/}
                <div>
                <Button variant="contained" color="error" onClick={()=>handleDelete(faqItem.productQnaId)} >
                  Delete
                </Button>
                </div>
                </Box>
                </Grid>
                {faqItem.answer==null? <div />
                :<Box sx={{borderColor:"grey.700", borderRadius: '10px',p: 2,backgroundColor:"#E2E6ED", textAlign: "right"}}>
                {faqItem.answer}
                </Box>
                }
                </Grid>
                }
          </div>)}

        {/*<FormControlLabel name="paypal" sx={{
        mb: 3
      }} onChange={handleChangeFAQ} label={<Paragraph fontWeight={600}>Pay with Paypal</Paragraph>} control={<Radio checked={faqId === "paypal"} color="primary" size="small" />} />

        <Divider sx={{
        mb: 3,
        mx: -4
      }} />

         {faqId === "paypal" && <Fragment>
        {true && <Fragment>
            <FlexBox alignItems="flex-end" mb={4}>
              <TextField fullWidth name="email" type="email" label="Paypal Email" sx={{
            mr: isMobile ? "1rem" : "30px"
          }} />
              <Button variant="outlined" color="primary" type="button">
                Submit
              </Button>
            </FlexBox>

            <Divider sx={{
          mb: 3,
          mx: -4
        }} />
          </Fragment>} */}

        {/* <FormControlLabel name="cod" onChange={handleChangeFAQ} label={<Paragraph fontWeight={600}>Cash On Delivery</Paragraph>} control={<Radio checked={faqId === "cod"} color="primary" size="small" />} /> */}
      </Card1>

    </Fragment>;
};
const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",
  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: ""
};
const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("required"),
  name: yup.string().required("required"),
  exp_date: yup.string().required("required"),
  cvc: yup.string().required("required")
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default FAQForm;