import { useCallback, useState } from "react";
import { Button, Card, Box, styled, FormControlLabel, Checkbox, Grid } from "@mui/material";
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
const UserInfo = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [login, setLogin] = useState(false);
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
    sessionStorage.setItem('id',values.email)
    console.log('click')
    console.log(`http://localhost:5003/get_cust_by_id/${sessionStorage.setItem('id',values.email)}`)
    fetch(`http://localhost:5003/get_cust_by_id/${sessionStorage.setItem('id',values.email)}`)
    .then((response) =>
        response.json())
    .then((data) =>
        {ResultLogin(data['data']);}
    );}
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
  function Logout() {
   if (typeof window !== "undefined") {
    sessionStorage.removeItem('id')
    }
  }
  function ResultLogin(result) {
      console.log(result)
      if (result=='fail'){
        if (typeof window !== "undefined") {
            window.alert("아이디 또는 비밀번호를 다시 한번 확인해주세요.")
            sessionStorage.setItem('type', null)
            }
      } else if (result=='cust') {
        if (typeof window !== "undefined") {
            window.alert("고객 로그인에 성공했습니다.")
            window.location.reload()
            sessionStorage.setItem('type', 'cust')
            }
      } else if (result=='vendor') {
        if (typeof window !== "undefined") {
            window.alert("판매자 로그인에 성공했습니다.")
            window.location.href =  '/vendor/dashboard'
            sessionStorage.setItem('type', 'vendor')
            }
      } else if (result=='admin') {
        if (typeof window !== "undefined") {
            window.alert("관리자 로그인에 성공했습니다.")
            window.location.href =  '/admin/dashboard'
            sessionStorage.setItem('type', 'admin')
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
        m: "auto"
      }} />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Login as {sessionStorage.getItem('id')}
        </H1>


        <Button className="kakaoButton" ml={1} mb={1.5} fullWidth type="submit" color="info" variant="contained" sx={{height: 44}} >
          My Page
        </Button>
        <div />
        <Button className="googleButton" ml={1} mb={1.5} fullWidth onClick={() => Logout()} color="primary" variant="contained" sx={{height: 44}} >
          Logout
        </Button>
      </form>


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
export default UserInfo;