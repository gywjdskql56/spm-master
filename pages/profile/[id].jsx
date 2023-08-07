import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as yup from "yup";
import { CameraEnhance, Person } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/users";
import { useState, useEffect } from "react";
import { targetUrl, getAuth, } from "components/config";
import countryList from "data/countryList";
import Autocomplete from "@mui/material/Autocomplete";

// ===========================================================

const ProfileEditor = ({
  user
}) => {
  const router = useRouter();
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    birth_date: yup.string().required("required"),
  });
  const handleFormSubmit = async values => {
    console.log(values);
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = <Link href="/profile" passHref>
      <Button color="primary" sx={{
      px: 4,
      bgcolor: "primary.light"
    }}>
        프로필로 돌아가기
      </Button>
    </Link>;
  console.log(user)
  {/*const INITIAL_VALUES_bf = {
    email: user.email || "",
    contact: user.phone || "",
    last_name: user.name.lastName || "",
    first_name: user.name.firstName || "",
    birth_date: user.dateOfBirth || ""
  };*/}

  const [users, setUsers] = useState(null);
  const [init, setInit] = useState(null);
  const [fieldvalue, setFieldValue] = useState(null);

//  const [init, setInit] = useState(INITIAL_VALUES_bf);
  const [open, setOpen] = useState(false);
  const getUser = async (a) => {
  console.log(a)

  const res = await fetch(targetUrl+"/members/myinfo",{
          method: 'GET',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  setUsers(data.data)
  console.log(data);
  if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 관리자로 로그인해주세요. ")
    window.location.href =  "/"
    }
  }
  console.log(data.data);
  setUsers(data.data)

  const INITIAL_VALUES = {
    email: data.data.email || "",
    contact: data.data.phoneNum || "",
    last_name: data.data.lastName || "",
    first_name: data.data.firstName || "",
    birth_date: data.data.country || ""
  };
  console.log(INITIAL_VALUES)
  setFieldValue(data.data.country)
  setInit(INITIAL_VALUES)
  setOpen(true)
  return data.data;
  }

  useEffect(() => {
   const setData = async () => {
    const auth_await = await getAuth();
    console.log(auth_await)
    console.log(auth_await[0])
    console.log(auth_await[1][0].authority)
  };
  setData()
  const result = getUser("1")


  },[])


  // Show a loading state when the fallback is rendered
  if (!open) {
    return <h1>Loading...</h1>;
  }
  else{
  return <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader icon={Person} title="프로필 수정" button={HEADER_LINK} navigation={<CustomerDashboardNavigation />} />

      {/* PROFILE EDITOR FORM */}
      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          <Avatar src="/assets/images/faces/ralph.png" sx={{
          height: 64,
          width: 64
        }} />

          <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button component="span" color="secondary" sx={{
              p: "8px",
              height: "auto",
              bgcolor: "grey.300",
              borderRadius: "50%"
            }}>
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>

          <Box display="none">
            <input onChange={e => console.log(e.target.files)} id="profile-image" accept="image/*" type="file" />
          </Box>
        </FlexBox>

        <Formik onSubmit={handleFormSubmit} initialValues={init} validationSchema={checkoutSchema}>
          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField fullWidth name="first_name" label="이름" onBlur={handleBlur} onChange={handleChange} value={values.first_name} error={!!touched.first_name && !!errors.first_name} helperText={touched.first_name && errors.first_name} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField fullWidth name="last_name" label="성" onBlur={handleBlur} onChange={handleChange} value={values.last_name} error={!!touched.last_name && !!errors.last_name} helperText={touched.last_name && errors.last_name} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField fullWidth name="email" type="email" label="이메일" onBlur={handleBlur} value={values.email} onChange={handleChange} error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField fullWidth label="휴대폰 번호" name="contact" onBlur={handleBlur} value={values.contact} onChange={handleChange} error={!!touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Autocomplete fullWidth sx={{
                          mb: 2}} options={countryList} value={values.birth_date} getOptionLabel={option => {option.label}} onChange={(_, value) => {values.birth_date=value.value;setFieldValue(value.value); console.log(values.birth_date);console.log(value);console.log(value.label); console.log(value.value); }} renderInput={params => <TextField label="Country" placeholder="Select Country" error={!!touched.birth_date && !!errors.birth_date} helperText={touched.birth_date && errors.birth_date} {...params} />} />
                    {/*<LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker label="생년월일" maxDate={new Date()} value={values.birth_date} inputFormat="yyyy-MM-dd" renderInput={props => <TextField fullWidth size="small" helperText={touched.birth_date && errors.birth_date} error={!!touched.birth_date && !!errors.birth_date || props.error} {...props} />} onChange={newValue => setFieldValue("birth_date", newValue)} />
                    </LocalizationProvider>*/}
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>;
    }
};
export const getStaticPaths = async () => {
  const paths = await api.getUserIds();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async () => {
  const user = await api.getUser();
  return {
    props: {
      user
    }
  };
};
export default ProfileEditor;