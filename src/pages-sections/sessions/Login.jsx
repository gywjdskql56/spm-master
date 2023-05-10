import { useCallback, useState } from "react";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
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
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility(visible => !visible);
  }, []);
  const handleFormSubmit = async values => {
    console.log('click')
    console.log(`http://localhost:5003/do_login/${values.email}_${values.password}`)
    fetch(`http://localhost:5003/do_login/${values.email}_${values.password}`)
    .then((response) =>
        response.json())
    .then((data) =>
        ResultLogin(data['result'])
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
            }
      } else if (result=='cust') {
        if (typeof window !== "undefined") {
            window.alert("고객 로그인에 성공했습니다.")
            window.location.href =  'http://localhost:3000'
            }
      } else if (result=='vendor') {
        if (typeof window !== "undefined") {
            window.alert("판매자 로그인에 성공했습니다.")
            window.location.href =  'http://localhost:3000/vendor/dashboard'
            }
      } else if (result=='admin') {
        if (typeof window !== "undefined") {
            window.alert("관리자 로그인에 성공했습니다.")
            window.location.href =  'http://localhost:3000/admin/dashboard'
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
        <BazaarImage src="/assets/images/bazaar-black-sm.svg" sx={{
        m: "auto"
      }} />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Welcome to K-MEDI
        </H1>

        <BazaarTextField mb={1.5} fullWidth name="email" size="small" type="email" variant="outlined" onBlur={handleBlur} value={values.email} onChange={handleChange} label="Email" placeholder="exmple@mail.com" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />

        <BazaarTextField mb={2} fullWidth size="small" name="password" label="Password" autoComplete="on" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder="*********" type={passwordVisibility ? "text" : "password"} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} InputProps={{
        endAdornment: <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
      }} />

        <Button fullWidth type="submit" color="primary" variant="contained" sx={{height: 44}} >
          Log in
        </Button>
      </form>

      <SocialButtons />

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