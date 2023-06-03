import { useCallback, useState } from "react";
import { Button, Card, Box, styled, FormControlLabel, Checkbox } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import { FlexBox, FlexRowCenter } from "components/flex-box";
const fbStyle = {
  background: "#3B5998",
  color: "white"
};
const kkStyle = {
  background: "#FEE500",
  color: "#000000"
};
const googleStyle = {
  background: "#4285F4",
  color: "white"
};
export const Wrapper = styled(({
  children,
  passwordVisibility,
  ...rest
}) => <Card {...rest}>{children}</Card>)(({
  theme,
  passwordVisibility
}) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  },
  ".passwordEye": {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400]
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle
  },
    ".kakaoButton": {
    marginBottom: 10,
    ...kkStyle,
    "&:hover": kkStyle
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24
  }
}));
const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [login, setLogin] = useState(false);
  const [cart, setCart] = useState({'data':[]});
    const [state, setState] = useState({
    cust: true,
    shop: false,
  });
  const { cust, shop } = state;
  const error = [cust, shop].filter((v) => v).length !== 1;
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
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(visible => !visible);
  }, []);
  const handleFormSubmit = async values => {
    if (typeof window !== 'undefined') {
    sessionStorage.setItem('id',values.email)}
    console.log('click')
    console.log(`http://localhost:5003/do_login/${values.email}_${values.password}`)
    fetch(`http://localhost:5003/do_login/${values.email}_${values.password}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {ResultLogin(data['result']);}
    );
    console.log('complete')
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
  function ResultLogin(result) {
      console.log(result)
      if (result=='fail'){
        if (typeof window !== "undefined") {
            window.alert("아이디 또는 비밀번호를 다시 한번 확인해주세요.")
            sessionStorage.setItem('type', null)
            window.sessionStorage.setItem('cart', JSON.stringify(cart))
            }
      } else if (result=='cust') {
        if (typeof window !== "undefined") {
            window.alert("고객 로그인에 성공했습니다.")
            window.location.href =  'http://localhost:3000'
            sessionStorage.setItem('type', 'cust')
            fetch("http://localhost:5003/get_cart_by_id/"+window.sessionStorage.getItem('id'))
            .then((response) =>
                response.json())
            .then((data) =>
                {setCart(data); console.log(data); window.sessionStorage.setItem('cart', JSON.stringify(data))});

            }
      } else if (result=='vendor') {
        if (typeof window !== "undefined") {
            window.alert("판매자 로그인에 성공했습니다.")
            window.location.href =  'http://localhost:3000/vendor/dashboard'
            sessionStorage.setItem('type', 'vendor')
            window.sessionStorage.setItem('cart', JSON.stringify(cart))
            }
      } else if (result=='admin') {
        if (typeof window !== "undefined") {
            window.alert("관리자 로그인에 성공했습니다.")
            window.location.href =  'http://localhost:3000/admin/dashboard'
            sessionStorage.setItem('type', 'admin')
            window.sessionStorage.setItem('cart', JSON.stringify(cart))
            }
      }

  }

  {/*function SelfLogin() {
    console.log('click')
    console.log(`http://localhost:5003/do_login/${values.email}_${values.password}`)
    fetch(`http://localhost:5003/do_login/${values.email}_${values.password}`)
    .then((response) =>
        response.json())
    .then((data) =>
        ResultLogin(data['result'])
    );
    console.log('complete')
  }*/}
  return <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <BazaarImage src="/assets/images/logo_new.png" sx={{
        m: "auto", maxHeight: 100,
      }} />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Welcome to K-MEDI
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
      {cust==true?
        <BazaarTextField mb={1.5} fullWidth name="email" size="small" type="email" variant="outlined" onBlur={handleBlur} value={values.email} onChange={handleChange} label="Email" placeholder="exmple@mail.com" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
        :
        <BazaarTextField mb={1.5} fullWidth name="email" size="small" variant="outlined" onBlur={handleBlur} value={values.email} onChange={handleChange} label="Email or Registration Number" placeholder="exmple@mail.com / ***-**-*****" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
        }
        <BazaarTextField mb={2} fullWidth size="small" name="password" label="Password" autoComplete="on" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder="*********" type={passwordVisibility ? "text" : "password"} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} InputProps={{
        endAdornment: <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
      }} />

        <Button fullWidth type="submit" color="primary" variant="contained" sx={{height: 44}} >
          Log in
        </Button>
      </form>
      {cust==true?
      <SocialButtons />:
      <div />}

      <FlexRowCenter mt="1.25rem">
        <Box>Don't have an account yet?</Box>
        <Link href="/signup" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Sign up
            </H6>
          </a>
        </Link>
      </FlexRowCenter>

      <FlexBox justifyContent="center" bgcolor="grey.200" borderRadius="4px" py={2.5} mt="1.25rem">
        Forgot your password?
        <Link href="/reset-password" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Reset password
            </H6>
          </a>
        </Link>
      </FlexBox>
    </Wrapper>;
};
const initialValues = {
  email: "",
  password: ""
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required")
});
export default Login;