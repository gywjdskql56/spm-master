import { useState, useEffect } from "react";
import { Button, Card, Grid, MenuItem, TextField, Typography, Checkbox } from "@mui/material";
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
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { targetUrl } from "components/config";
// ================================================================

// ================================================================

const ProductForm = props => {
  const {
    initialValues,
    validationSchema,
    handleFormSubmit
  } = props;
  console.log("initialValues")
  console.log(initialValues)
  const [files, setFiles] = useState({'상품':[],'병원':[],'숙소':[],1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[]});
  const [main, setMain] = useState([]);
  const [thumb, setThumb] = useState([]);
  const [desc, setDesc] = useState(["","","","","","","","","","","","","",]);
  const [show, setShow] = useState(true);
  const [category, setCategory] = useState([]);
  const [categoryID, setCategoryID] = useState(null);
  const [region, setRegion] = useState([]);
  const [regionID, setRegionID] = useState(null);
  const [optionI, setOptionI] = useState([]);
  const [optionN, setOptionN] = useState([]);
  const [option, setOption] = useState([]);
  const [optionNew, setOptionNew] = useState([]);
  const [optionT, setOptionT] = useState([]);
  const [cateid, setCateid] = useState(1);
  const [product, setProduct] = useState(null);
  const [day, setDay] = useState(0);
  const [state, setState] = useState({
    cust: true,
    shop: false,
  });
  const [list, setList] = useState(['상품','병원','숙소']);
  const [listn, setListn] = useState(['상품','병원','숙소']);
  const { cust, shop } = state;
    const handleChange_check = (event) => {
      if (event.target.name=='cust'){
      setState({
        cust: true,
        shop: false,});
        setCateid(1)
        setList(['상품','병원','숙소'])
      } else {
      setState({
        cust: false,
        shop: true,});
        setCateid(2)
        setList(['상품','병원'])
      }
  };

  const handleChange_day = (event) => {
    setDay(event.target.value);
//    console.log(event.target.value)
//    console.log(day)
//    console.log(typeof(event.target.value))
//    console.log(parseInt(event.target.value, 10))
//    console.log(typeof(parseInt(event.target.value, 10)))

//    console.log([...Array(parseInt(event.target.value))])
//    setListn([...Array(parseInt(event.target.value))])
   console.log(Array.from({length: event.target.value}, (_, i) => i + 1))
   setListn(Array.from({length: event.target.value}, (_, i) => i + 1))
  };

{/*  const [dates, setDates] = useState([
  [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
  [new DateObject().set({ day: 28 }), new DateObject().set({ day: 28 })],
  [new DateObject().set({ day: 23 }), new DateObject().set({ day: 27 })]
])*/}
const [dates, setDates] = useState([
])
    function handleDates(value){
      //your modification on passed value ....
      setDates(value)
      values.dates = value
      {/*console.log(value)
      console.log(value[0][0])
      console.log(value[0][0].format())
      console.log(value[0][0].format("YYYY-MM-DD"))
      var date_arr = []
      for (let i = 0; i < value.length; i += 1) {
         var stDate = value[i][0].format("YYYY-MM-DD")
         if (value[i].length >1){
            var edDate = value[i][1].format("YYYY-MM-DD")
            var date_pair = [stDate, edDate]
         }else{
         var date_pair = [stDate, ""]
         }
         date_arr.push(date_pair)
      }
      setDates(date_arr)*/}
      {/*console.log(new Date(value[0][0].format("YYYY-MM-DD")))
      console.log(new DateObject(value[0][0].format("YYYY-MM-DD")))
      console.log(new DateObject(value[0][0].format("YYYY-MM-DD"))===value[0][0]?true:false)
      console.log(new DateObject(value[0][0].format("YYYY/MM/DD"))===value[0][0]?true:false)
      console.log(new DateObject("2023-05-23").format())
      console.log(new DateObject("2023/05/23"))
      console.log(new DateObject("2023/05/23").format())
      console.log(new DateObject("2023","05","23"))
      console.log(new DateObject("2023","05","23").format())
      console.log(new DateObject().set({ day: 23 }))
      console.log(new DateObject().set({ day: 23 }).format())
      console.log(new DateObject().set({ day: 23 })==new DateObject("2023-07-23")?true:false)
      console.log(new DateObject().set({ day: 23 })==new DateObject("2023/07/23")?true:false)
      console.log(new DateObject().set({ day: 23 })==new DateObject("2023","07","23")?true:false)*/}
    }
    function handleChange_text(index, event){
    console.log(values.description)
    console.log(index)
    console.log(event)
    values.description[index] = event.target.value
    setDesc(desc => desc.map((desc, i) => i === index ? event.target.value : desc));
    }

    const handleChangeDropZoneMain = (files_list) => {
    console.log(files_list)
    console.log(files_list[0])
    console.log(files_list[0].preview)
    console.log(files_list[0].path)
    files_list.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setMain([files_list[0]])
    }

    const handleChangeDropZoneMain2 = (event) => {
    console.log(event)
    console.log(event.target.files)
    setThumb(event.target.files)
//    console.log(files_list[0])
//    files_list.forEach(file => Object.assign(file, {
//      preview: URL.createObjectURL(file)
//    }));
//    setMain([files_list[0]])
    }

  // HANDLE UPDATE NEW IMAGE VIA DROP ZONE
  const handleChangeDropZone = (files_list, index) => {
    console.log(index)
    console.log(files_list)
    console.log(files_list[0])
    console.log(files_list[0].preview)
    files_list.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    if (index=='상품'){
    setFiles(prev=>({...prev, "상품":files_list}));
    }else if(index=='병원'){
    setFiles(prev=>({...prev, "병원":files_list}));
    }else if(index=='숙소'){
    setFiles(prev=>({...prev, "숙소":files_list}));
    }else if(index==1){
    setFiles(prev=>({...prev, 1:files_list}));
    }else if(index==2){
    setFiles(prev=>({...prev, 2:files_list}));
    }else if(index==3){
    setFiles(prev=>({...prev, 3:files_list}));
    }else if(index==4){
    setFiles(prev=>({...prev, 4:files_list}));
    }else if(index==5){
    setFiles(prev=>({...prev, 5:files_list}));
    }else if(index==6){
    setFiles(prev=>({...prev, 6:files_list}));
    }else if(index==7){
    setFiles(prev=>({...prev, 7:files_list}));
    }else if(index==8){
    setFiles(prev=>({...prev, 8:files_list}));
    }else if(index==9){
    setFiles(prev=>({...prev, 9:files_list}));
    }else if(index==10){
    setFiles(prev=>({...prev, 10:files_list}));
    }
    console.log(files_list)
    console.log(files)
  };


  const getCategory = async () => {
  const res = await fetch(targetUrl+"/categories",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  setCategory(data.data)
  console.log(data);
  if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 관리자로 로그인해주세요. ")
    window.location.href =  "/"
    }
  }
  console.log(data.data);
  setCategory((data.data))
  return data;
  }

  const getRegion = async () => {
  const res = await fetch(targetUrl+"/regions",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
        }})
  const data = await res.json();
  setRegion(data.data)
  console.log(data);
  {/*if (data.status =="error"){
    if (typeof window !== "undefined") {
    window.alert("권한이 없습니다. 관리자로 로그인해주세요. ")
    window.location.href =  "/"
    }
  }*/}
  return data;
  }

   useEffect(() => {
        getCategory()
        getRegion()

   }, []);
  // HANDLE DELETE UPLOAD IMAGE
    const handleFileDeleteMain = (file) => () => {
        setMain([])
    }
  const handleFileDelete = (file,index) => () => {
    console.log(file)
    console.log(index)
    console.log(files)
    if (index=='상품'){
    setFiles(prev=>({...prev, "상품":files[index].filter(item => item.name !== file.name)}));
    }else if(index=='병원'){
    setFiles(prev=>({...prev, "병원":files[index].filter(item => item.name !== file.name)}));
    }else if(index=='숙소'){
    setFiles(prev=>({...prev, "숙소":files[index].filter(item => item.name !== file.name)}));
    }else if(index==1){
    setFiles(prev=>({...prev, 1:files[index].filter(item => item.name !== file.name)}));
    }else if(index==2){
    setFiles(prev=>({...prev, 2:files[index].filter(item => item.name !== file.name)}));
    }else if(index==3){
    setFiles(prev=>({...prev, 3:files[index].filter(item => item.name !== file.name)}));
    }else if(index==4){
    setFiles(prev=>({...prev, 4:files[index].filter(item => item.name !== file.name)}));
    }else if(index==5){
    setFiles(prev=>({...prev, 5:files[index].filter(item => item.name !== file.name)}));
    }else if(index==6){
    setFiles(prev=>({...prev, 6:files[index].filter(item => item.name !== file.name)}));
    }else if(index==7){
    setFiles(prev=>({...prev, 7:files[index].filter(item => item.name !== file.name)}));
    }else if(index==8){
    setFiles(prev=>({...prev, 8:files[index].filter(item => item.name !== file.name)}));
    }else if(index==9){
    setFiles(prev=>({...prev, 9:files[index].filter(item => item.name !== file.name)}));
    }else if(index==10){
    setFiles(prev=>({...prev, 10:files[index].filter(item => item.name !== file.name)}));
    }
//    setFiles(files => files_list.filter(item => item.name !== file.name));
  };
  function handleAdd() {
    console.log('ADD')
    if (values.option_sale_price !=null && values.option_sale_price!='' && typeof(values.option_sale_price)=="number"){
    setOption(option => [...option, values.option_sale_name+"("+values.option_sale_price+")"])
    setOptionNew(optionNew => [...optionNew, {"name" : values.option_sale_name, "price" : values.option_sale_price}])
    console.log(option)
    values.option = [...values.option, values.option_sale_name+"("+values.option_sale_price+")"]
    values.optionNew = [...values.optionNew, {"name" : values.option_sale_name, "price" : values.option_sale_price}]
    values.option_sale_name = ""
    values.option_sale_price = ""
}
    else{
        if (typeof window !== "undefined") {
            window.alert("옵션 가격에는 숫자만 입력하세요.")
        }
    }
    console.log(values.option)

  }
  function handleAdd_included() {
    console.log('ADD')
    setOptionI(optionI => [...optionI, values.included])
    console.log(optionI)
    values.included = [...optionI, values.included]
    console.log(values.included)
    values.included = ""
  }
  function handleAdd_not_included() {
    console.log('ADD')
    setOptionN(optionN => [...optionN, values.not_included])
    console.log(optionN)
    values.not_included = [...optionN, values.not_included]
    console.log(values.not_included)
    values.not_included = ""
  }
  function handleAdd_tags() {
    console.log('ADD')
    setOptionT(optionT => [...optionT, values.tags])
    console.log(optionT)
    values.tags = [...optionT, values.tags]
    console.log(values.tags)
    values.tags = ""
  }
  function handleOption(optionItem){
    console.log('delete')
    setOption(option.filter(item => item !== optionItem))
    setOptionNew(optionNew.filter(item => item !== optionItem))
    values.option = values.option.filter(item => item !== optionItem)
    values.optionNew = values.optionNew.filter(item => item !== optionItem)
    console.log(values.option)
  }
  function handleOption_included(optionItem){
    console.log('delete')
    setOptionI(optionI.filter(item => item !== optionItem))
    console.log(values.included)
  }
    function handleOption_not_included(optionItem){
    console.log('delete')
    setOptionN(optionN.filter(item => item !== optionItem))
    console.log(values.not_included)
  }
  function handleOption_tags(optionItem){
    console.log('delete')
    setOptionT(optionT.filter(item => item !== optionItem))
    console.log(values.tags)
  }
  function handleChangeCate(val){
    setCategoryID(val)
  }
  function handleChangeRegion(val){
    setRegionID(val)
  }
  function submit(){

  if(typeof(values.price)!="number" || typeof(values.sale_price)!="number"){
     if (typeof window !== "undefined") {
            window.alert("가격은 숫자만 입력해주세요.")
        }
    } else {

  console.log(dates[0])
  console.log(dates.length)
  const date_list = []
  for (let i=0; i<dates.length; i++) {
    console.log(i)
    if (dates[i].length>1){
        date_list.push({"startDate":dates[i][0].format("YYYY-MM-DD"), "endDate":dates[i][1].format("YYYY-MM-DD")})
    } else if (dates[i].length==1){
        date_list.push({"startDate":dates[i][0].format("YYYY-MM-DD")})
    }
  }
  console.log(date_list)
  console.log(option.join('|'));
  console.log(values.optionNew);
  var day_list = [];
  var day_item_list = [];
    for (var i = 0; i < day; i++) {
        day_list.push(i);
        if((files[i])==undefined ||(files[i]).length==0){
            day_item_list.push({"day" : i, "description" : desc[i+3], "imageCount" : 0})
        }else {
            day_item_list.push({"day" : i, "description" : desc[i+3], "imageCount" : (files[i]).length})
        }

    }
  var fd = new FormData();
  Object.values(main).forEach((file) => fd.append("thumbnailImage", file));
  console.log(main)
  Object.values(files["상품"]).forEach((file) => fd.append("productDetailsImages", file));
  Object.values(files["병원"]).forEach((file) => fd.append("hospitalDetailsImages", file));
  Object.values(files["숙소"]).forEach((file) => fd.append("accommodationDetailsImages", file));

//  fd.append("courseDetailsImages", main)
  day_list.forEach((day) => {if (files[day]!=undefined){files[day].forEach((img) => fd.append("courseDetailsImages", img))}});
  const body_data = {
    "productName" : values.name,
    "categoryId" : categoryID,
    "regionId" : regionID,
    "servicePeriodList" : date_list,
    "includedPartList" : optionI,
    "nonIncludedPartList" : optionN,
    "type" : cateid,
    "productDetails" : desc[0],
    "hospitalDetails" : desc[1],
    "tourDescriptionList" : day_item_list,
    "tagList" : optionT,
    "price" : values.price,
    "salePrice" : values.sale_price,
    "optionFeeList" : values.optionNew,
    "open" : show
  }
  if (cust){
   body_data['accommodationDetails'] = desc[2]
  }
  console.log(body_data)
//  ['상품','병원','숙소']
  fd.append("productAddRequestDto", new Blob([JSON.stringify(body_data)], { type: 'application/json' }))

   for (var pair of fd.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
//  productAddRequestDto
  fetch(targetUrl+'/products',{
      credentials : 'include',
      method: 'POST',
      body: fd
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.status);
    if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 등록되었습니다.")
            window.location.href =  "/vendor/products"
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("상품등록에 실패하였습니다. 다시 시도해주세요.")
            }
    }})
    }
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
                  {category.map((c,i) => <MenuItem onClick={(e)=>handleChangeCate(c.categoryId)} value={c.categoryId}>{c.name}</MenuItem>)}
                  {/*<MenuItem value="fashion">Fashion</MenuItem>*/}
                </TextField>
              </Grid>
              <Grid item sm={3} xs={6}>
                <TextField select fullWidth color="info" size="medium" name="category2" onBlur={handleBlur} placeholder="지역" onChange={handleChange} value={values.category2} label="지역을 선택해주세요." SelectProps={{
              multiple: false
            }} error={!!touched.category2 && !!errors.category2} helperText={touched.category2 && errors.category2}>
                  {region.map((r,i) => <MenuItem onClick={(e)=>handleChangeRegion(r.regionId)} value={r.regionId}>{r.name}</MenuItem>)}
                  {/*<MenuItem value="fashion">Fashion</MenuItem>*/}
                </TextField>
              </Grid>

            <Grid item xs={12}>
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
              <Grid item xs={7}>
              <Grid item xs={7}>
                <Typography fontSize="14px" color="grey.600" align="center">
                    해당 상품에 포함되는 부분
                </Typography>
              </Grid>
              <Grid container spacing={3}>
              <Grid item xs={10}>
                <TextField fullWidth color="info" size="medium" name="included" label="included" onBlur={handleBlur} onChange={handleChange} placeholder="included" value={values.included} />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" type="submit" style={{ backgroundColor: "#BFE4FF" }} onClick={()=>handleAdd_included()}>
                  ADD
                </Button>
              </Grid>
              {optionI.map(o =>
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#4F83E1",padding: 4, margin: 2 }} >
                  {o}
                    <BiXCircle size={20} onClick={() => handleOption_included(o)} />
                </Button> )}
              </Grid>
              <br />

              <Grid item xs={7}>
              <Typography fontSize="14px" color="grey.600" align="center">
                  해당 상품에 포함되지 않는 부분
              </Typography>
              </Grid>
              <Grid container spacing={3}>
              <Grid item xs={10}>
                <TextField fullWidth color="info" size="medium" name="not_included" label="not_included" onBlur={handleBlur} onChange={handleChange} placeholder="not_included" value={values.not_included} />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" type="submit" style={{ backgroundColor: "#BFE4FF" }} onClick={()=>handleAdd_not_included()}>
                  ADD
                </Button>
              </Grid>
              {optionN.map(o =>
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#E49689",padding: 4, margin: 2 }} >
                  {o}
                    <BiXCircle size={20} onClick={() => handleOption_not_included(o)} />
                </Button>)
              }
              </Grid>

              </Grid>
             <Grid item xs={1} />
             <Grid item xs={4}>
             <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">상품 유형을 선택하세요.</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={cust} onChange={handleChange_check} name="cust" />
                    }
                    label="의료관광 패키지"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={shop} onChange={handleChange_check} name="shop" />
                    }
                    label="의료 상품"
                  />
                </FormGroup>
              </FormControl>
                  <Box sx={{ minWidth: 20 }}>
                  <FormControl sx={{ m: 3 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">관광일수</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={day}
                      label="관광일수"
                      onChange={handleChange_day}
                    >
                      <MenuItem value={0}>없음</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <br />

            <Grid container spacing={3}>
             <Grid item xs={6}>
              <Typography fontSize="14px" color="grey.600" align="center">
              {"썸네일 (대표 이미지) ** 업로드는 한개만 가능합니다."}
              </Typography>
             {/* <input type="file" id="file" onChange={e => handleChangeDropZoneMain2(e)}></input>*/}
                <DropZone onChange={e => handleChangeDropZoneMain(e)} />
                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {main.map((file, index) => {
                return <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDeleteMain(file)} />
                      </UploadImageBox>;
              })}
                </FlexBox>
              </Grid>
              <Grid item xs={6}>
             {/*main.map((file, index) => {
                return <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDeleteMain(file)} />
                      </UploadImageBox>;
              })*/}
              </Grid>
              </Grid>



           {list.map((n, index) => {
          return ( <Grid container spacing={3}>
          <Grid item xs={6}>
              <Typography fontSize="14px" color="grey.600" align="center">
                  {(n)+" 상세 설명"}
              </Typography>
                <TextField rows={8} multiline fullWidth color="info" size="medium" name="description" label={(n)+" 상세 설명"} onBlur={handleBlur} onChange={()=>handleChange_text(index, event)} placeholder="Description" value={desc[index]} error={!!touched.description && !!errors.description} helperText={touched.description && errors.description} />
              </Grid>
              <Grid item xs={6}>
              <Typography fontSize="14px" color="grey.600" align="center">
              {(n)+" 상세 이미지"}
              </Typography>
                <DropZone onChange={files => handleChangeDropZone(files,n)} />
                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files[n].map((file, index) => {
                return <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file, n)} />
                      </UploadImageBox>;
              })}
                </FlexBox>
              </Grid>
              </Grid> )})}


              {listn.slice(3,).map((n, index) => {
          return ( <Grid container spacing={3}>
          <Grid item xs={6}>
          <Typography fontSize="14px" color="grey.600" align="center">
                  {(index+1)+"일차 설명"}
              </Typography>
                <TextField rows={8} multiline fullWidth color="info" size="medium" name="description" label={(index+1)+"일차"} onBlur={handleBlur} onChange={()=>handleChange_text(index+3, event)} placeholder="Description" value={desc[index+3]} error={!!touched.description && !!errors.description} helperText={touched.description && errors.description} />
              </Grid>
              <Grid item xs={6}>
              <Typography fontSize="14px" color="grey.600" align="center">
                  {(index+1)+"일차 이미지"}
              </Typography>
                <DropZone onChange={files => handleChangeDropZone(files, n)} />
                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files[n].map((file, index) => {
                return <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDelete(file, n)} />
                      </UploadImageBox>;
              })}
                </FlexBox>
              </Grid>
              </Grid> )})}
              {/*<Grid item sm={6} xs={12}>
                <TextField fullWidth name="stock" color="info" size="medium" label="수량" placeholder="수량" onBlur={handleBlur} value={values.stock} onChange={handleChange} error={!!touched.stock && !!errors.stock} helperText={touched.stock && errors.stock} />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField fullWidth name="tags" label="태그" color="info" size="medium" placeholder="태그" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
              </Grid>*/}

              <Grid item sm={12} xs={12}>
                <Typography fontSize="14px" color="grey.600" align="center">
                    태그
                </Typography>

              <Grid container spacing={3}>
              <Grid item xs={10}>
                <TextField fullWidth color="info" size="medium" name="tags" label="tags" onBlur={handleBlur} onChange={handleChange} placeholder="tags" value={values.tags} />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" type="submit" style={{ backgroundColor: "#BFE4FF" }} onClick={()=>handleAdd_tags()}>
                  ADD
                </Button>
              </Grid>
              {optionT.map(o =>
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#4F83E1",padding: 4, margin: 2 }} >
                  {o}
                    <BiXCircle size={20} onClick={() => handleOption_tags(o)} />
                </Button>
              )}
              </Grid>
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
              {/*values.option.map(o =>
              <Grid item sm={2} xs={12}>
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#FFA07A" }} >
                  {o}{" "}&nbsp;
                    <BiXCircle size={25} onClick={() => handleOption(o)} />
                </Button>
              </Grid>)*/}

              {values.optionNew.map(o =>
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#FFA07A", padding: 4, margin: 2 }} >
                  {o.name+"("+o.price+")"}{" "}&nbsp;
                    <BiXCircle size={25} onClick={() => handleOption(o)} />
                </Button>
             )}
              <Grid container spacing={3}>
              <Grid item sm={6} xs={6}>
                <FormControlLabel control={<Switch defaultChecked value={show} onChange={()=>{setShow((show)=>(!show))}} />} label="판매상품 공개하기" />
              </Grid>
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