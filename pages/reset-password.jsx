import Link from "next/link";
import SEO from "components/SEO";
import { Box, Button, Card, TextField, FormControlLabel, Grid, Checkbox } from "@mui/material";
import { H1, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { targetUrl, weburl } from "components/config";
import { useState, useEffect } from "react";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [pw, setPW] = useState('');
  const [newpw, setNEWPW] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("members");
  const [state, setState] = useState({
    cust: true,
    shop: false,
  });
  const { cust, shop } = state;
  const handleChange_check = (event) => {
  if (event.target.name=='members'){
  setState({
    cust: true,
    shop: false,});
  } else {
  setState({
    cust: false,
    shop: true,});
  }
  setType(event.target.name)
  };
  const resetPW = async () => {
    console.log(email)
    var body = {}
    if (type=='members') {
        body = {'emailAddr': email}
    } else {
        body = {'businessRegistrationNumber': email}
    }
    const res = await fetch(targetUrl+"/accounts/"+type+"/temp-code",{
          method: 'POST',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
          },
      body: JSON.stringify(body)
    })
  const data = await res.json();
  console.log(data)
  setOpen(true)
  }

    const verifyPW = async () => {
    console.log(email)
    const res = await fetch(targetUrl+"/accounts/"+type+"/pw",{
          method: 'PATCH',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
          },
      body: JSON.stringify({
      'id': email,
      'code' : pw,
      'newPw' : newpw,
      })
    })

  const data = await res.json();
  if(data.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("비밀번호가 성공적으로 변경되었습니다.")
            window.location.href = weburl
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("비밀번호 변경에 실패하였습니다. 다시 시도해주세요.")
            }
  }
  console.log(data)

  }
  return <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Reset Password" />

      <Card sx={{
      padding: 4,
      maxWidth: 600,
      marginTop: 4,
      boxShadow: 1
    }}>
        <H1 fontSize={20} fontWeight={700} mb={4} textAlign="center">
          Reset Password
        </H1>

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Please select a membership type</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={cust} onChange={handleChange_check} name="members" />
            }
            label="Regular customer"
          />
          <FormControlLabel
            control={
              <Checkbox checked={shop} onChange={handleChange_check} name="vendors" />
            }
            label="Vendor"
          />
        </FormGroup>
      </FormControl>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form style={{
          width: "100%"
        }}>
        {type=="members"? <TextField fullWidth name="email" value={email} type="email" label="email" onChange={(e)=>{setEmail(e.target.value)}}
          //   onBlur={handleBlur}
          //   value={values.email}
          //   onChange={handleChange}
          //   error={Boolean(touched.email && errors.email)}
          //   helperText={touched.email && errors.email}
          />
          :
          <TextField fullWidth name="사업자등록번호" value={email} type="사업자등록번호" label="사업자등록번호" onChange={(e)=>{setEmail(e.target.value)}} />
          }
          <Box sx={{
            mt: 2
          }}>
           <Button fullWidth color="primary" variant="contained" onClick={()=>resetPW()} >
                Send temporary password
              </Button>
            </Box>
            {open==true?
            <div>
            <Box sx={{
            mt: 2
          }} />
          <TextField fullWidth name="pw" value={pw} type="pw" label="password" onChange={(e)=>{setPW(e.target.value)}} />
          <Box sx={{
            mt: 0.5
          }} />
          <TextField fullWidth name="new_pw" value={newpw} type="new_pw" label="new password" onChange={(e)=>{setNEWPW(e.target.value)}} />
          <Box sx={{
            mt: 2
          }}>
              <Button fullWidth color="primary" variant="contained" onClick={()=>verifyPW()} >
                {"Verify temporary password & Make new password"}
              </Button>
            </Box>
            </div>
            :
            <div />}



          </form>

          <FlexRowCenter mt="1.25rem" justifyContent="center" width="100%">
            <Box>{"Don\'t you have an account?"}</Box>
            <Link href="/signup" passHref legacyBehavior>
              <a>
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  {"Sign up"}
                </H6>
              </a>
            </Link>
          </FlexRowCenter>
        </FlexBox>
      </Card>
    </FlexRowCenter>;
};
export default ResetPassword;