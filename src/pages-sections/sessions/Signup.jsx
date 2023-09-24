import { useCallback, useState, useEffect } from "react";
import * as React from 'react';
import { Button, Checkbox, Box, FormControlLabel, Grid, TextField, MenuItem } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, H6 } from "components/Typography";
import { targetUrl } from "components/config";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons_signup";
import EyeToggleButton from "./EyeToggleButton";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Small } from "components/Typography";
import Alert from '@mui/material/Alert';
import AlertPopup from 'react-popup-alert'
import Autocomplete from "@mui/material/Autocomplete";
import countryList from "data/countryList";
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Signup = () => {

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "ja",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  // {/*includedLanguages: 'en,ko,ja,zh-CN,zh,th',*/}
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.type = 'text/javascript';
  addScript.src =
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(addScript);
  window.googleTranslateElementInit = googleTranslateElementInit;
}, []);
    {/*addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);*/}
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(visible => !visible);
  }, []);
  const handleFormSubmit = async values => {
    console.log(values);
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema
  });
  const [state, setState] = React.useState({
    cust: true,
    shop: false,
  });
    const [state2, setState2] = React.useState({
    tour: true,
    hospital: false,
  });
  const [value, setValue] = useState()

  const handleChange_check = (event) => {
  if (event.target.name=='cust'){
  setState({
    cust: true,
    shop: false,});
  } else {
  setState({
    cust: false,
    shop: true,});
  }
  };

    const handleChange_check2 = (event) => {
  if (event.target.name=='tour'){
  setState2({
    tour: true,
    hospital: false,});
  } else {
  setState2({
    tour: false,
    hospital: true,});
  }
  };

  const [fieldvalue, setFieldValue] = React.useState(false);
  const [fieldlabel, setFieldLabel] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [verify, setVerify] = React.useState(false);
  const [type, setType] = React.useState(1);
  const { cust, shop } = state;
  const { tour, hospital } = state2;
  const error = [cust, shop].filter((v) => v).length !== 1;
  const error2 = [tour, hospital].filter((v) => v).length !== 1;
  const [file, setFile] = React.useState(null);
  const [file1, setFile1] = React.useState(null);
  const [file2, setFile2] = React.useState(null);
  const [acc, setAcc] = React.useState(null);
  const [bankcode, setBankcode] = React.useState(1);
  const handleChange_bc = (event) => {
    setBankcode(event.target.value);
  };
   const handleChange_acc = (event) => {
    setAcc(event.target.value);
  };

  function handleEmail() {
    console.log("Email: ", values.email)
    console.log("Email: ", targetUrl)
    if (cust){
    fetch(targetUrl+'/members/email/code',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'emailAddr': values.email, 'accountType':'member'})
    })
    .then(response => response.json())
    .then(response => console.log(response))
    }
    else {
     fetch(targetUrl+'/members/email/code',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'emailAddr': values.email, 'accountType':'vendor'})
    })
    .then(response => response.json())
    .then(response => console.log(response))
    }
  }
    const handleFileChange1 = (e) => {
    if (e.target.files) {
      setFile1(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };
  const handleFileChange2 = (e) => {
    if (e.target.files) {
      setFile2(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };
  const handleFileChange = (e) => {
    setFile(event.target.files);
    console.log(event.target.files)
  };




  function checkEmail() {
    console.log("Email: ", values.email)
    console.log("Code: ", values.check)
    if (cust){
    fetch(targetUrl+'/members/email-verify',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'emailAddr':values.email,'code': values.check, 'accountType':'member'})
    })
    .then(response => response.json())
    .then(response => {console.log(response);console.log(response.status); if(response.status=='success'){if (typeof window !== "undefined") {
            setVerify(true)
            window.alert("Verified")

            }}
            else {if (typeof window !== "undefined") {

            window.alert("Try again")
            }}
            })
            } else {
     fetch(targetUrl+'/members/email-verify',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'emailAddr':values.email,'code': values.check, 'accountType':'vendor'})
    })
    .then(response => response.json())
    .then(response => {console.log(response);console.log(response.status); if(response.status=='success'){if (typeof window !== "undefined") {
            setVerify(true)
            window.alert("Verified")
            }}
            else {if (typeof window !== "undefined") {
            window.alert("Try again")
            }}
            })
            }
  }

  function checkform(){

    if(cust) {
    if (typeof(acc.replace("-",''))!="number") {
         if (typeof window !== "undefined") {
            window.alert("Only - and number are allowed in account number.")
         }
      }
      else if (typeof(values.regist.replace("-",''))!="number") {
         if (typeof window !== "undefined") {
            window.alert("Only - and number are allowed in registration number.")
         }
      }
    else if (verify!=true) {
          if (typeof window !== "undefined") {
            window.alert("Please verify your Email")
         }
      }
      else {
        fetch(targetUrl+'/members/signup',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({
          "country": fieldvalue,
          "email": values.email,
          "firstName": values.nameF,
          "lastName": values.nameL,
          "password": values.password,
          "phoneNum": value
        })
        })
        .then(response => response.json())
        .then(response => {console.log(response);
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("Success for sign-up")
            window.location.href =  "/"
            }}
            else {
                if (typeof window !== "undefined") {
                    if (response.message=="ALREADY EXIST MEMBER"){
                    window.alert("You already have account")
                    }else {
                    window.alert("Try again")
                    }
                }}})
      }
      }
      else {
    if (typeof(acc.replace("-",''))!="number") {
         if (typeof window !== "undefined") {
            window.alert("Only - and number are allowed in account number.")
         }
      }
      else if (typeof(values.regist.replace("-",''))!="number") {
         if (typeof window !== "undefined") {
            window.alert("Only - and number are allowed in registration number.")
         }
      }
    else if (verify!=true) {
          if (typeof window !== "undefined") {
            window.alert("Please verify your Email")
         }
      }
      else {
        const fd = new FormData();
        Object.values(file).forEach((file) => fd.append("proofFiles", file));

        if (tour){
            setType("유치업자")
        }else {
            setType("의료업자")
        }
        const body_data = {
          "businessRegistrationNumber": values.regist,
          "companyName": values.nameC,
          "companyType": type,
          "email": values.email,
          "password": values.password,
          "phoneNum": value,
          "bankCode": bankcode,
          "accountNumber":acc
        }
        console.log("body_data")
        console.log(body_data)
        fd.append(
            'vendorSignUpRequestDto',
            new Blob([JSON.stringify(body_data)], { type: 'application/json' })
        );
        for (var pair of fd.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
        fetch(targetUrl+'/members/vendor-signup',{
          credentials : 'include',
          method: 'POST',
//          headers: {
//            'Accept': 'application/json',
//        },
          body: fd
        })
        .then(response => response.json())
        .then(response => {console.log(response);
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("Success for sign-up")
            window.location.href =  "/"
            }}
            else {
                if (typeof window !== "undefined") {
                    if (response.message=="ALREADY EXIST MEMBER"){
                    window.alert("You already have account")
                    }else {
                    window.alert("Try again")
                    }
                }}})
                }
      }
  }

  function signup() {
   if(cust){
        checkform()
        }
  else{
    if (values.nameC==""){
       if (typeof window !== "undefined") {
            window.alert("Please type company name")
            }
    } else if (values.regist==""){
       if (typeof window !== "undefined") {
            window.alert("Please type company registration code")
            }
    }
    else{
       checkform()
    }
  }
    }

    const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  })

  function onCloseAlert() {
    setAlert({
      type: '',
      text: '',
      show: false
    })
  }

  function onShowAlert(type) {
    setAlert({
      type: type,
      text: 'Demo alert',
      show: true
    })
  }

  return <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <BazaarImage src="/assets/images/logo_new.png" sx={{
        m: "auto"
      }} />
      <>
      <div id="google_translate_element"></div>
      <h4>If you want to change language, please choose language you want</h4>
    </>

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Sign up
        </H1>

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Please select a membership type</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={cust} onChange={handleChange_check} name="cust" />
            }
            label="Regular customer"
          />
          <FormControlLabel
            control={
              <Checkbox checked={shop} onChange={handleChange_check} name="shop" />
            }
            label="Vendor"
          />
        </FormGroup>
      </FormControl>

      {shop? <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">업체 종류를 골라주세요</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={tour} onChange={handleChange_check2} name="tour" />
            }
            label="외국인환자 유치업자"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hospital} onChange={handleChange_check2} name="hospital" />
            }
            label="외국인환자 유치병원"
          />
        </FormGroup>
      </FormControl>:
      <div />}

      {shop?
        (<div>
        {/*<Alert severity="error">This is an error alert — check it out!</Alert>
        <Alert variant="filled" severity="error">
          This is an error alert — check it out!
        </Alert>*/}
         <div>
                <input type="file" id="file" onChange={handleFileChange} multiple="multiple"></input>
            </div>

        <FormControlLabel name="agreement" className="agreement" control={<div />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">사업자등록증과 외국인유치업자/의료유치업자 관련서류를 업로드해주세요.</FlexBox>} />
          {/*<div>
            <input type="file" name="file" onChange={handleFileChange} />
          </div>
        <FormControlLabel name="agreement" className="agreement" control={<div />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">사업자등록증을 업로드해주세요.</FlexBox>} />
          <div>
            <input type="file" name="file" onChange={handleFileChange1} />
          </div>
          <FormControlLabel name="agreement" className="agreement" control={<div />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">외국인유치업자/의료유치업자 관련서류를 업로드해주세요.</FlexBox>} />
          <div>
            <input type="file" name="file" onChange={handleFileChange2} />
          </div>*/}
          <FormControlLabel name="agreement" className="agreement" control={<div />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start"></FlexBox>} />
          <BazaarTextField mb={1.5} fullWidth name="nameC" size="small" label="Company Name" variant="outlined" onBlur={handleBlur} value={values.nameC} onChange={handleChange} placeholder="HJ Agency" error={!!touched.nameC && !!errors.nameC} helperText={touched.nameC && errors.nameC} />
        <BazaarTextField mb={1.5} fullWidth name="regist" size="small" variant="outlined" onBlur={handleBlur} value={values.regist} onChange={handleChange} label="Company Registration Number" placeholder="123-45-67890" error={!!touched.regist && !!errors.regist} helperText={touched.regist && errors.regist} />
          <div />
          </div>)
          : <div />}
        {cust? <Grid container spacing={2}>
            <Grid item xs={6}>
            <BazaarTextField mb={1.5} name="nameF" size="small" label="First Name" variant="outlined" onBlur={handleBlur} value={values.nameF} onChange={handleChange} placeholder="" error={!!touched.nameF && !!errors.nameF} helperText={touched.nameF && errors.nameF} />
            </Grid>
            <Grid item xs={6}>
            <BazaarTextField mb={1.5} name="nameL" size="small" label="Last Name" variant="outlined" onBlur={handleBlur} value={values.nameL} onChange={handleChange} placeholder="" error={!!touched.nameL && !!errors.nameL} helperText={touched.nameL && errors.nameL} />
            </Grid>
        </Grid> :
        <div />}
        <BazaarTextField mb={1.5} fullWidth name="email" size="small" type="email" variant="outlined" onBlur={handleBlur} value={values.email} onChange={handleChange} label="Email" placeholder="exmple@mail.com" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />

        <div>
        {/*<Button mb={1.5} color="primary" variant="contained" sx={{ height: 30}} onClick={() => {setOpen(true); console.log('click')}} >
          인증하기
        </Button>*/}
        {open?
        (<Grid container spacing={2}>
        <Grid item xs={5}>
        <BazaarTextField mb={1.5} name="check" size="small" variant="outlined" onBlur={handleBlur} value={values.check} onChange={handleChange} placeholder="******" error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
        </Grid>
        <Grid item xs={3}>
        <Button mb={1.5} color="primary" variant="contained" sx={{ height: 40}} onClick={() => checkEmail()} >
          Verification
        </Button>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
        <Button mb={1.5} color="primary" variant="contained" sx={{ height: 40}} onClick={() => handleEmail()} >
          Re-send email
        </Button>
        </Grid>
        </Grid>)
        :
        (<Button mb={1.5} color="primary" variant="contained" sx={{ height: 40}} onClick={() => {setOpen(true); console.log('click'); handleEmail()}} >
          Send email
        </Button>)
        }
        </div>

        <BazaarTextField mb={1.5} fullWidth size="small" name="password" label="Password" variant="outlined" autoComplete="on" placeholder="*********" onBlur={handleBlur} onChange={handleChange} value={values.password} type={passwordVisibility ? "text" : "password"} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} InputProps={{
        endAdornment: <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
      }} />

        <BazaarTextField mb={1.5} fullWidth size="small" autoComplete="on" name="re_password" variant="outlined" label="Check password" placeholder="*********" onBlur={handleBlur} onChange={handleChange} value={values.re_password} type={passwordVisibility ? "text" : "password"} error={!!touched.re_password && !!errors.re_password} helperText={touched.re_password && errors.re_password} InputProps={{
        endAdornment: <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
      }} />

    <Small display="block" mb={1.5} textAlign="left" fontWeight="600" color="grey.700">
          Phone Number
    </Small>
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}/>
    {cust==true?
    <div>
    <Small display="block" mb={1.5} textAlign="left" fontWeight="600" color="grey.700">
          Country
    </Small>
      <Autocomplete fullWidth sx={{
              mb: 2
        }} options={countryList} value={values.billing_country} getOptionLabel={option => option.label} onChange={(_, value) => {setFieldLabel(value.label);setFieldValue(value.value); values.billing_country=value.value; console.log(value);console.log(value.value); console.log(value.label)}} renderInput={params => <TextField label="Country" placeholder="Select Country" error={!!touched.billing_country && !!errors.billing_country} helperText={touched.billing_country && errors.billing_country} {...params} />} />
 </div>
:<div />}
{shop==true?
<div>
<Grid container spacing={3}>
    <Grid item xs={4}>
                <div mb={1.5}
                    mt={1.5}>
                <H6> 은행코드 </H6>
                <Select
                    mb={1.5}
                    mt={1.5}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={bankcode}
                      label="관광일수"
                      onChange={handleChange_bc}
                    >
                      <MenuItem value={1}>국민은행</MenuItem>
                      <MenuItem value={2}>신한은행</MenuItem>
                      <MenuItem value={3}>우리은행</MenuItem>
                      <MenuItem value={4}>하나은행</MenuItem>
                    </Select></div></Grid>
<Grid item xs={7}><BazaarTextField mb={1.5} name="nameF" size="small" label="Account Number" variant="outlined" onBlur={handleBlur} value={acc} onChange={handleChange_acc} placeholder="" /></Grid></Grid></div>  : <div />
}
        <div />
       <TextField rows={6} multiline fullWidth mb={1.5} sx={{mb: 2, m:2}} color="info" size="medium" name="Terms & Conditions" onBlur={handleBlur} value={values.description} label="Terms & Conditions" error={Boolean(errors.description && touched.description)} helperText={touched.description && errors.description} />
        <FormControlLabel name="agreement" className="agreement" onChange={handleChange} control={<Checkbox size="small" color="secondary" checked={values.agreement || false} />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">
              Please agree to the following
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  terms and conditions
                </H6>
              to sign up as a member
            </FlexBox>} />

        <Button fullWidth type="submit" color="primary" variant="contained" sx={{
        height: 44}} onClick={()=>signup()}>
          Sign up
        </Button>
      </form>
      {cust==true?
      <SocialButtons />
      :<div />}
      <FlexRowCenter mt="1.25rem">
        <Box>Already have an account?</Box>
        <Link href="/login" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Log in
            </H6>
          </a>
        </Link>
      </FlexRowCenter>
    </Wrapper>;
};
const initialValues = {
  nameF: "",
  nameL: "",
  nameC: "",
  email: "",
  regist: "",
  password: "",
  re_password: "",
  description: "This Privacy Policy (the \"Policy\") explains the way of treatment of the information which is provided or collected in the websites on which this Policy is posted. In addition the Policy also explains the information which is provided or collected in the course of using the applications of the Company which exist in the websites or platforms of other company. Through this Policy, the Company regards personal information of the users as important and inform them of the purpose and method of Company\'s using the personal information provided by the users and the measures taken by the Company for protection of those personal information. This Policy will be effective on the 23th day of August, 2023 and, in case of modification thereof, the Company will make public notice of it through posting it on the bulletin board of Company\'s website or individual notice through sending mails, fax or e-mails).  ",

  agreement: false
};
const formSchema = yup.object().shape({
  description: yup.string(),
  nameF: yup.string().required("First name is required"),
  nameL: yup.string().required("Last name is required"),
  nameC: yup.string().required("Company name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  regist: yup.string().required("Registration number is required"),
  password: yup.string().required("Password is required"),
  re_password: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Please re-type password"),
  agreement: yup.bool().test("agreement", "You have to agree with our Terms and Conditions!", value => value === true).required("You have to agree with our Terms and Conditions!")
});
export default Signup;