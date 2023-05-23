import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Checkbox, Grid, TextField, Typography, Divider } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import countryList from "data/countryList";
import { FlexBetween, FlexBox } from "components/flex-box";
import { Span } from "components/Typography";

const CheckoutForm = () => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const handleFormSubmit = async values => {
    router.push("/payment");
  };
  const handleCheckboxChange = (values, setFieldValue) => (e, _) => {
    const checked = e.currentTarget.checked;
    setSameAsShipping(checked);
    setFieldValue("same_as_shipping", checked);
    setFieldValue("billing_name", checked ? values.shipping_name : "");
  };
  return <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={handleFormSubmit}>
      {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
    }) => <form onSubmit={handleSubmit}>
          <Card1 sx={{
        mb: 4
      }}>

            <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
            <FlexBox alignItems="center" columnGap={1} mb={2}>
              <Span fontWeight="600">Additional Comments</Span>

              <Span p="6px 10px" fontSize={12} lineHeight="1" borderRadius="3px" color="primary.main" bgcolor="primary.light">
                Note
              </Span>
            </FlexBox>

            <TextField variant="outlined" rows={6} value={comment} onChange={(event)=>{setComment(event.target.value); console.log(event.target.value)}} fullWidth multiline sx={{
            mb: 2
          }} />

            <Divider sx={{
            mb: 2
          }} />
            </Grid>
            </Grid>
          </Card1>

          <Card1 sx={{
        mb: 4
      }}>
       <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
            <FlexBox alignItems="center" columnGap={1} mb={2}>
              <Span fontWeight="600">Additional Comments</Span>
            </FlexBox>
            {/*<Typography fontWeight="600" mb={2}>
              Customer Information
            </Typography>*/}

            {/*<FormControlLabel label="Same as shipping address" control={<Checkbox size="small" color="secondary" />} onChange={handleCheckboxChange(values, setFieldValue)} sx={{
          zIndex: 1,
          position: "relative",
          mb: sameAsShipping ? "" : "1rem"
        }} />*/}

            {!sameAsShipping && <Grid container spacing={12}>
                <Grid item sm={6} xs={12}>
                  <TextField fullWidth sx={{
              mb: 2
            }} label="First Name" name="billing_nameF" onBlur={handleBlur} onChange={handleChange} value={values.billing_nameF} error={!!touched.billing_nameF && !!errors.billing_nameF} helperText={touched.billing_nameF && errors.billing_nameF} />
                 <TextField fullWidth sx={{
              mb: 2
            }} onBlur={handleBlur} label="Phone Number" name="billing_contact" onChange={handleChange} value={values.billing_contact} error={!!touched.billing_contact && !!errors.billing_contact} helperText={touched.billing_contact && errors.billing_contact} />
                  {/*<TextField fullWidth type="number" sx={{
              mb: 2
            }} label="Zip Code" name="billing_zip" onBlur={handleBlur} onChange={handleChange} value={values.billing_zip} error={!!touched.billing_zip && !!errors.billing_zip} helperText={touched.billing_zip && errors.billing_zip} />
                  <TextField fullWidth label="Address 1" onBlur={handleBlur} onChange={handleChange} name="billing_address1" value={values.billing_address1} error={!!touched.billing_address1 && !!errors.billing_address1} helperText={touched.billing_address1 && errors.billing_address1} />*/}
                <Autocomplete fullWidth sx={{
              mb: 2
            }} options={countryList} value={values.billing_country} getOptionLabel={option => option.label} onChange={(_, value) => setFieldValue("billing_country", value)} renderInput={params => <TextField label="Country" placeholder="Select Country" error={!!touched.billing_country && !!errors.billing_country} helperText={touched.billing_country && errors.billing_country} {...params} />} />
                </Grid>

                <Grid item sm={6} xs={12}>
                <TextField fullWidth sx={{
              mb: 2
            }} label="Last Name" name="billing_name" onBlur={handleBlur} onChange={handleChange} value={values.billing_name} error={!!touched.billing_name && !!errors.billing_name} helperText={touched.billing_name && errors.billing_name} />
                  <TextField fullWidth type="email" sx={{
              mb: 2
            }} onBlur={handleBlur} name="billing_email" label="Email Address" onChange={handleChange} value={values.billing_email} error={!!touched.billing_email && !!errors.billing_email} helperText={touched.billing_email && errors.billing_email} />
                  {/*<TextField fullWidth sx={{
              mb: 2
            }} label="Company" onBlur={handleBlur} name="billing_company" onChange={handleChange} value={values.billing_company} error={!!touched.billing_company && !!errors.billing_company} helperText={touched.billing_company && errors.billing_company} />
                 */}  {/*<TextField fullWidth label="Address 2" onBlur={handleBlur} name="billing_address2" onChange={handleChange} value={values.billing_address2} error={!!touched.billing_address2 && !!errors.billing_address2} helperText={touched.billing_address2 && errors.billing_address2} />*/}
                </Grid>
              </Grid>}
              </Grid>
              </Grid>

          </Card1>

          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart" passHref>
                <Button variant="outlined" color="primary" type="button" fullWidth>
                  Back to Cart
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </form>}
    </Formik>;
};
const initialValues = {
  shipping_zip: "",
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_address1: "",
  shipping_address2: "",
  shipping_country: countryList[229],
  billing_zip: "",
  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_address1: "",
  billing_address2: "",
  billing_country: countryList[229]
};

// uncomment these fields below for from validation
const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.object().required("required"),
  // billing_address1: yup.string().required("required"),
});
export default CheckoutForm;