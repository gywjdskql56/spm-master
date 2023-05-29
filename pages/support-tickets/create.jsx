import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useCallback, useState, useEffect } from "react";
import { Avatar, Box, Button, Divider, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H5, Span } from "components/Typography";
import CustomerService from "components/icons/CustomerService";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/ticket";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Select from 'react-select'
// ==========================================================

const SupportTicketDetails = ({
}) => {
  const router = useRouter();
  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(text)
    fetch('http://localhost:5003/insert_ticket_question',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'email': window.sessionStorage.getItem('id'),
      'to': admin, 'type': category, 'public':open, 'question':text, 'question_title':title})
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
    }})
  };

  // HANDLE FORM SUBMIT
  const options = [
  { value: '회원가입/로그인', label: '회원가입/로그인' },
  { value: '예약/결제', label: '예약/결제' },
  { value: '환불/교환', label: '환불/교환' },
  { value: '기타', label: '기타' }
]

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href="/support-tickets" passHref>
      <Button color="primary" sx={{
      px: 4,
      bgcolor: "primary.light"
    }}>
        고객센터 목록으로 돌아가기
      </Button>
    </Link>;

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(true);
  const [state, setState] = useState({
    admin: true,
    shop: false,
  });
    const handleChange_check = (event) => {
  if (event.target.name=='admin'){
  setState({
    admin: true,
    shop: false,});
  } else {
  setState({
    admin: false,
    shop: true,});
  }
  };
  const { admin, shop } = state;
  const error = [admin, shop].filter((v) => v).length !== 1;
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader button={HEADER_LINK} icon={CustomerService} title="고객센터" navigation={<CustomerDashboardNavigation />} />


      <Divider sx={{
      mb: 4,
      borderColor: "grey.300"
    }} />

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Please select a recipient</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={admin} onChange={handleChange_check} name="admin" />
            }
            label="Administrator"
          />
          <FormControlLabel
            control={
              <Checkbox checked={shop} onChange={handleChange_check} name="shop" />
            }
            label="Vendor"
          />
        </FormGroup>
      </FormControl>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Please select a category of your question</FormLabel>
      <Select options={options} onChange={(e) => setCategory(e.value)} />
    </FormControl>
      {/* FORM AREA */}
      <form onSubmit={handleFormSubmit}>
      <TextField rows={8} fullWidth sx={{
        mb: 3
      }} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Write your title.." />

        <TextField rows={8} fullWidth multiline sx={{
        mb: 3
      }} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your message here..." />

      <FormControlLabel
        control={
          <Checkbox checked={open} onChange={()=>{setOpen(!open)}} name="shop" />
        }
        label="Private"
      />

        <Button type="submit" color="primary" variant="contained" sx={{
        ml: "auto",
        display: "block"
      }}>
          저장
        </Button>
      </form>
    </CustomerDashboardLayout>;
};
//export const getStaticPaths = async () => {
//  const paths = await api.getSlugs();
//  return {
//    paths: paths,
//    //indicates that no page needs be created at build time
//    fallback: "blocking" //indicates the type of fallback
//  };
//};

//export const getStaticProps = async ({
//  params
//}) => {
////  const ticket = await api.getTicket(String(params.slug));
//  return {
//    props: {
//      ticket
//    }
//  };
//};
export default SupportTicketDetails;