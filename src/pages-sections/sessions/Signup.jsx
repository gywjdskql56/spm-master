import { useCallback, useState, useEffect } from "react";
import * as React from 'react';
import { Button, Checkbox, Box, FormControlLabel, Grid } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
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

  const [open, setOpen] = React.useState(false);
  const [verify, setVerify] = React.useState(false);
  const { cust, shop } = state;
  const error = [cust, shop].filter((v) => v).length !== 1;

  function handleEmail() {
    console.log("Email: ", values.email)
    fetch('https://9093-59-6-221-140.ngrok-free.app/api/email/send',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'emailAddr': values.email})
    })
    .then(response => response.json())
    .then(response => console.log(response))
  }

  function checkEmail() {
    console.log("Email: ", values.email)
    console.log("Code: ", values.check)
    fetch('https://9093-59-6-221-140.ngrok-free.app/api/email/verify',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'emailAddr':values.email,'code': values.check})
    })
    .then(response => response.json())
    .then(response => {console.log(response);console.log(response.status); if(response.status=='success'){setVerify(true)}})
  }

  function checkform(){
  {/*if (values.nameF==""){
        if (typeof window !== "undefined") {
            window.alert("Please type the first name")
            }
        }
    else if (values.nameL==""){
        if (typeof window !== "undefined") {
            window.alert("Please type the last name")
            }
        }
    else if (values.email==""){
        if (typeof window !== "undefined") {
            window.alert("Please type the email")
            }
        }
    else if (verify==false){
        if (typeof window !== "undefined") {
            window.alert("Please verify email")
            }
        }
    else if (values.password==""){
        if (typeof window !== "undefined") {
            window.alert("Please type the password")
            }
        }
    else if (values.re_password==""){
        if (typeof window !== "undefined") {
            window.alert("Please type the password twice")
            }
        }
    else*/} {
        console.log("Email: ", values.email)
        console.log("Code: ", values.check)
        console.log("NameL: ", values.nameL)
        console.log("NameF: ", values.nameF)
        console.log("Password: ", values.password)
        fetch('https://9093-59-6-221-140.ngrok-free.app/api/members/signup',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({
          "country": "KR",
          "email": values.email,
          "firstName": values.nameF,
          "lastName": values.nameL,
          "password": values.password,
          "phoneNum": "+821012345678",
          "oauthProvider": 'self',
        })
        })
        .then(response => response.json())
        .then(response => console.log(response))
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
        <BazaarImage src="/assets/images/bazaar-black-sm.svg" sx={{
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

      {shop?
        (<div>
        {/*<Alert severity="error">This is an error alert — check it out!</Alert>
        <Alert variant="filled" severity="error">
          This is an error alert — check it out!
        </Alert>*/}

        <FormControlLabel name="agreement" className="agreement" control={<div />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">Upload business registration certificate (member registration will be approved after document review)</FlexBox>} />
          <div>
            <input type="file" name="file" onChange={null}/>
          </div>
          <FormControlLabel name="agreement" className="agreement" control={<div />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start"></FlexBox>} />
          <BazaarTextField mb={1.5} fullWidth name="name_c" size="small" label="Company Name" variant="outlined" onBlur={handleBlur} value={values.nameC} onChange={handleChange} placeholder="HJ Agency" error={!!touched.nameC && !!errors.nameC} helperText={touched.nameC && errors.nameC} />
        <BazaarTextField mb={1.5} fullWidth name="num_c" size="small" type="email" variant="outlined" onBlur={handleBlur} value={values.regist} onChange={handleChange} label="Company Registration Number" placeholder="123-45-67890" error={!!touched.regist && !!errors.regist} helperText={touched.regist && errors.regist} />
          <div />
          </div>)
          : <div />}
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <BazaarTextField mb={1.5} name="nameF" size="small" label="First Name" variant="outlined" onBlur={handleBlur} value={values.nameF} onChange={handleChange} placeholder="" error={!!touched.nameF && !!errors.nameF} helperText={touched.nameF && errors.nameF} />
            </Grid>
            <Grid item xs={6}>
            <BazaarTextField mb={1.5} name="nameL" size="small" label="Last Name" variant="outlined" onBlur={handleBlur} value={values.nameL} onChange={handleChange} placeholder="" error={!!touched.nameL && !!errors.nameL} helperText={touched.nameL && errors.nameL} />
            </Grid>
        </Grid>
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


        <FormControlLabel name="agreement" className="agreement" onChange={handleChange} control={<Checkbox size="small" color="secondary" checked={values.agreement || false} />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">
              Please agree to the following
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  terms and conditions
                </H6>
              </a>
              to sign up as a member
            </FlexBox>} />

        <Button fullWidth type="submit" color="primary" variant="contained" sx={{
        height: 44}} onClick={()=>signup()}>
          Sign up
        </Button>
      </form>

      <SocialButtons />
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
  agreement: false
};
const formSchema = yup.object().shape({
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