import { useState, useEffect } from "react";
import { Button, Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import { UploadImageBox, StyledClear } from "../StyledComponents";
import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import DateObject from "react-date-object";
import { BiXCircle } from "react-icons/bi";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// ================================================================

// ================================================================

const ProductForm = props => {
  const {
    initialValues,
    validationSchema,
    handleFormSubmit
  } = props;
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [option, setOption] = useState([]);
  const [dates, setDates] = useState([
  [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
  [new DateObject().set({ day: 28 }), new DateObject().set({ day: 28 })],
  [new DateObject().set({ day: 23 }), new DateObject().set({ day: 27 })]
])
    function handleDates(value){
      //your modification on passed value ....
      setDates(value)
      values.dates = value
      console.log(value)
      console.log(value[0][0])
      console.log(value[0][0].format())
      console.log(new DateObject("2023-05-23"))
      console.log(new DateObject("2023-05-23").format())
      console.log(new DateObject("2023/05/23"))
      console.log(new DateObject("2023/05/23").format())
      console.log(new DateObject("2023","05","23"))
      console.log(new DateObject("2023","05","23").format())
      console.log(new DateObject().set({ day: 23 }))
      console.log(new DateObject().set({ day: 23 }).format())
      console.log(new DateObject().set({ day: 23 })===new DateObject("2023-05-23")?true:false)
      console.log(new DateObject().set({ day: 23 })===new DateObject("2023/05/23")?true:false)
      console.log(new DateObject().set({ day: 23 })===new DateObject("2023","05","23")?true:false)
    }

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  };
    useEffect(() => {
    fetch("http://localhost:5003/get_category")
    .then((response) =>
        response.json())
    .then((data) =>
        {setCategory(data['data']); console.log(data['data'])});

     fetch("http://localhost:5003/get_region")
    .then((response) =>
        response.json())
    .then((data) =>
        {setRegion(data['data']); console.log(data['data'])});
   }, []);
  // HANDLE DELETE UPLOAD IMAGE
  const handleFileDelete = file => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  };
  function handleAdd() {
    console.log('ADD')
    setOption(option => [...option, values.option_sale_name+"("+values.option_sale_price+")"])
    console.log(option)
    values.option = [...values.option, values.option_sale_name+"("+values.option_sale_price+")"]
    console.log(values.option)
    values.option_sale_name = ""
    values.option_sale_price = ""
  }
  function handleOption(optionItem){
    console.log('delete')
    setOption(option.filter(item => item !== optionItem))
    values.option = values.option.filter(item => item !== optionItem)
    console.log(values.option)
  }
  function submit(){
  console.log(values.name)
  console.log(values.description)
  console.log(values.sale_price)
  console.log(values.category1)
  console.log(values.category2)
  console.log(values.show)
  console.log(dates)
  console.log(dates[0])
  console.log(dates.length)
  const date_list = []
  for (let i=0; i<dates.length; i++) {
    console.log(i)
    if (dates[i].length>1){
        date_list.push([dates[i][0].format("YYYY-MM-DD"),dates[i][1].format("YYYY-MM-DD")])
    } else if (dates[i].length==1){
        date_list.push([dates[i][0].format("YYYY-MM-DD")])
    }
  }
  console.log(date_list)
  console.log(option.join('|'));
  fetch('http://localhost:5003/insert_product',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({'product_name': values.name,'company_code': '123-45-12345','public': true,'detail': values.description,
      'price': values.price,"sale_price": values.sale_price,'category_name': values.category1,'region_name': values.category2,
      'option': option.join('|'), 'public':values.show,'tags':values.tags, 'date_list':date_list})
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
  }

    const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    handleFormSubmit,
    validationSchema
  });
  return <Card sx={{
    p: 6
  }}>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {/*{({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => */}
      <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="name" label="상품명" color="info" size="medium" placeholder="상품명" value={values.name} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
              </Grid>
              <Grid item sm={3} xs={6}>
                <TextField select fullWidth color="info" size="medium" name="category1" onBlur={handleBlur} placeholder="카테고리" onChange={handleChange} value={values.category1} label="카테고리를 선택해주세요." SelectProps={{
              multiple: false
            }} error={!!touched.category1 && !!errors.category1} helperText={touched.category1 && errors.category1}>
                  {category.map((c,i) => <MenuItem value={c}>{c}</MenuItem>)}
                  {/*<MenuItem value="fashion">Fashion</MenuItem>*/}
                </TextField>
              </Grid>
              <Grid item sm={3} xs={6}>
                <TextField select fullWidth color="info" size="medium" name="category2" onBlur={handleBlur} placeholder="카테고리" onChange={handleChange} value={values.category2} label="지역을 선택해주세요." SelectProps={{
              multiple: false
            }} error={!!touched.category2 && !!errors.category2} helperText={touched.category2 && errors.category2}>
                  {region.map((r,i) => <MenuItem value={r}>{r}</MenuItem>)}
                  {/*<MenuItem value="fashion">Fashion</MenuItem>*/}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <DropZone onChange={files => handleChangeDropZone(files)} />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                return <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file)} />
                      </UploadImageBox>;
              })}
                </FlexBox>
              </Grid>

              <Grid item xs={8}>
                <TextField rows={12} multiline fullWidth color="info" size="medium" name="description" label="상품 상세 설명" onBlur={handleBlur} onChange={handleChange} placeholder="Description" value={values.description} error={!!touched.description && !!errors.description} helperText={touched.description && errors.description} />
              </Grid>
              <Grid item xs={4}>
              <Calendar
                  value={values.dates}
//                  onChange={setDates}
                  onChange={handleDates}
                  minDate={new Date()}
                  multiple
                  range
                  rangeHover
                  plugins={[
                   <DatePanel />
                  ]}
              />
              </Grid>
              {/*<Grid item sm={6} xs={12}>
                <TextField fullWidth name="stock" color="info" size="medium" label="수량" placeholder="수량" onBlur={handleBlur} value={values.stock} onChange={handleChange} error={!!touched.stock && !!errors.stock} helperText={touched.stock && errors.stock} />
              </Grid>*/}
              <Grid item sm={12} xs={12}>
                <TextField fullWidth name="tags" label="태그" color="info" size="medium" placeholder="태그" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="price" color="info" size="medium" type="number" onBlur={handleBlur} value={values.price} label="정가" onChange={handleChange} placeholder="Regular Price" error={!!touched.price && !!errors.price} helperText={touched.price && errors.price} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="판매 가격" onBlur={handleBlur} onChange={handleChange} placeholder="Sale Price" value={values.sale_price} error={!!touched.sale_price && !!errors.sale_price} helperText={touched.sale_price && errors.sale_price} />
              </Grid>
              <Grid item sm={5} xs={5}>
              <Typography fontSize="14px" color="grey.600" align="center">
                  추가 옵션명
                </Typography>
              </Grid>
              <Grid item sm={5} xs={5}>
              <Typography fontSize="14px" color="grey.600" align="center">
                  옵션 가격
                </Typography>
              </Grid>
              <Grid item sm={2} xs={2} />
              <Grid item sm={5} xs={5}>
                <TextField fullWidth color="info" size="medium" name="option_sale_name" label="판매명" onBlur={handleBlur} onChange={handleChange} placeholder="Sale Price" value={values.option_sale_name} error={!!touched.option_sale_name && !!errors.option_sale_name} helperText={touched.option_sale_name && errors.option_sale_name} />
              </Grid>
              <Grid item sm={5} xs={5}>
                <TextField fullWidth color="info" size="medium" type="number" name="option_sale_price" label="옵션 판매 가격" onBlur={handleBlur} onChange={handleChange} placeholder="Sale Price" value={values.option_sale_price} error={!!touched.option_sale_price && !!errors.option_sale_price} helperText={touched.option_sale_price && errors.option_sale_price} />
              </Grid>
              <Grid item sm={2} xs={2}>
                <Button variant="contained" type="submit" style={{ backgroundColor: "#BFE4FF" }} onClick={()=>handleAdd()}>
                  ADD
                </Button>
              </Grid>
              {values.option.map(o =>
              <Grid item sm={2} xs={12}>
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#FFA07A" }} >
                  {o}{" "}&nbsp;
                    <BiXCircle size={25} onClick={() => handleOption(o)} />
                </Button>
              </Grid>)}
              <Grid item sm={6} xs={6}>
                <FormControlLabel control={<Switch defaultChecked value={values.show} onChange={handleChange} />} label="판매상품 공개하기" />
              </Grid>
              <Grid item sm={6} xs={6}>
                <Button variant="contained" color="info" type="submit" onClick={()=>submit()}>
                  저장하기
                </Button>
              </Grid>
            </Grid>
          </form>
      </Formik>
    </Card>;
};
export default ProductForm;