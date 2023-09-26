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
  console.log(initialValues.data.productDetails.imageList)
  var arrayP = initialValues.data.productDetails.imageList
  arrayP = arrayP.map((item) =>({ preview : `data:image/png;base64,${item.imageBase64String}`}));
  var arrayH = initialValues.data.hospitalDetails.imageList
  arrayH = arrayH.map((item) =>({ preview : `data:image/png;base64,${item.imageBase64String}`}));
  var arrayA = initialValues.data.accommodationDetails.imageList
  arrayA = arrayA.map((item) =>({ preview : `data:image/png;base64,${item.imageBase64String}`}));
//  var array = initialValues.data.courseDetailsList.imageList
//courseDetailsList
  //imageBase64String
  var arrayTotal = {}
  for (var i =0; i<initialValues.data.courseDetailsList.length; i++){
    console.log(i)
    console.log(initialValues.data)
    console.log(initialValues.data.courseDetailsList.length)
    console.log(initialValues.data.courseDetailsList)
    var array = initialValues.data.courseDetailsList[i].imageList
    console.log("array")
    console.log(array)
    array = array.map((item) =>({ preview : `data:image/png;base64,${item.imageBase64String}`}));
    console.log(array)
//    setFiles(files =>({...files, i : array}))
    arrayTotal[i] = array
  }
  arrayTotal["상품"] = arrayP
  arrayTotal["병원"] = arrayH
  arrayTotal["숙소"] = arrayA
//  const [files, setFiles] = useState({'상품':arrayP,'병원':arrayH,'숙소':arrayA,0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[]});
  const [files, setFiles] = useState(arrayTotal)

  const [main, setMain] = useState([{
      preview: `data:image/png;base64,${initialValues.img.imageBase64String}`
    }]);
  const [mainch, setMainch] = useState(false);
  const [thumb, setThumb] = useState([]);
  const [thumbChange, setThumbChange] = useState(false);
  const [proChange, setProChange] = useState(false);
  const [accChange, setAccChange] = useState(false);
  const [hosChange, setHosChange] = useState(false);
  const arr1 = [initialValues.data.productDetails.description,
                        initialValues.data.hospitalDetails.description,
                        initialValues.data.accommodationDetails.description]
  const [desc, setDesc] = useState(arr1.concat(initialValues.desc_list));
  const [show, setShow] = useState(initialValues.show);
  const [category, setCategory] = useState([]);
  const [categoryID, setCategoryID] = useState(initialValues.data.category.categoryId);
  const [region, setRegion] = useState([]);
  const [regionID, setRegionID] = useState(initialValues.data.region.regionId);
  const [optionI, setOptionI] = useState(initialValues.included);
  const [optionN, setOptionN] = useState(initialValues.not_included);
  const [option, setOption] = useState(initialValues.option);
  const [optionNew, setOptionNew] = useState(initialValues.optionNew);
  const [optionT, setOptionT] = useState(initialValues.tags);
  const [cateid, setCateid] = useState(initialValues.data.type);
  const [product, setProduct] = useState(null);
  var [state, setState] = useState(null);
  if (initialValues.type==1){
   [state, setState] = useState({
    cust: true,
    shop: false,
  });}
  else{
   [state, setState] = useState({
    cust: false,
    shop: true,
  });}
  var dayn = []
  for (var i=0; i< initialValues.data.courseDetailsList.length; i++){
    dayn.push(i)
  }
  console.log("dayn")
  console.log(dayn)
  console.log(typeof(dayn))
  console.log([1,2,3])
  console.log(typeof([1,2,3]))
  const [list, setList] = useState(['상품','병원','숙소']);
  const [listn, setListn] = useState(dayn);
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
  const [day, setDay] = useState(initialValues.description.length);
  const handleChange_day = (event) => {
    setDay(event.target.value);
    console.log(event.target.value)
    console.log(day)
    console.log(typeof(event.target.value))
    console.log(parseInt(event.target.value, 10))
    console.log(typeof(parseInt(event.target.value, 10)))

    console.log([...Array(parseInt(event.target.value))])
    setListn([...Array(parseInt(event.target.value))])
   console.log(Array.from({length: event.target.value}, (_, i) => i + 1))
   setListn(Array.from({length: event.target.value}, (_, i) => i + 1))
  };

{/*  const [dates, setDates] = useState([
  [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
  [new DateObject().set({ day: 28 }), new DateObject().set({ day: 28 })],
  [new DateObject().set({ day: 23 }), new DateObject().set({ day: 27 })]
])*/}
const [dates, setDates] = useState(initialValues.servicePeriodList)
    function handleDates(value){
      //your modification on passed value ....
      setDates(value)
      values.dates = value
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
    setMainch(true)
    }

    const handleChangeDropZoneMain2 = (event) => {
    console.log(event)
    console.log(event.target.files)
    setThumb(event.target.files)
    setThumbChange(true)


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
    setProChange(true)
    }else if(index=='병원'){
    setFiles(prev=>({...prev, "병원":files_list}));
    setHosChange(true)
    }else if(index=='숙소'){
    setFiles(prev=>({...prev, "숙소":files_list}));
    setAccChange(true)
    }else if(index==0){
    setFiles(prev=>({...prev, 0:files_list}));
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
   for (var i =0; i<initialValues.data.courseDetailsList.length; i++){
    console.log(i)
  }
        if (cateid==1){
        setList(['상품','병원','숙소'])
      } else {
        setList(['상품','병원'])
      }
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
    }else if(index==0){
    setFiles(prev=>({...prev, index:files[index].filter(item => item.name !== file.name)}));
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
    setOption(option => [...option, values.option_sale_name+"("+values.option_sale_price+")"])
    setOptionNew(optionNew => [...optionNew, {"description" : values.option_sale_name, "price" : values.option_sale_price}])
    console.log(option)
    values.option = [...values.option, values.option_sale_name+"("+values.option_sale_price+")"]
    values.optionNew = [...values.optionNew, {"description" : values.option_sale_name, "price" : values.option_sale_price}]
    console.log(values.option)
    values.option_sale_name = ""
    values.option_sale_price = ""
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

  const date_list = []
  for (let i=0; i<dates.length; i++) {
    console.log(i)
    if (dates[i].length>1){
        date_list.push({"startDate":dates[i][0].format("YYYY-MM-DD"), "endDate":dates[i][1].format("YYYY-MM-DD")})
    } else if (dates[i].length==1){
        date_list.push({"startDate":dates[i][0].format("YYYY-MM-DD")})
    }
  }

  console.log(option.join('|'));
  console.log(values.optionNew);
  console.log(desc);
  var day_list = [];
  var day_item_list = [];
    for (var i = 0; i < day; i++) {
        day_list.push(i);
        if (files[i]==undefined){
        day_item_list.push({"day" : i, "description" : desc[i+3], "imageCount" : 0})
        }
        else{
        day_item_list.push({"day" : i, "description" : desc[i+3], "imageCount" : (files[i]).length})
        }
    }
  var fd = new FormData();
//  fd.append("thumbnailImage", main)
if (thumbChange){
    Object.values(main).forEach((file) => fd.append("thumbnailImage", file))
}



    var day_list = [];
  var day_item_list = [];
  var courseSaveDtoList_list = [];
    for (var i = 1; i <= day; i++) {
        day_list.push(i);
        if((files[i])==undefined){
            day_item_list.push({"day" : i, "description" : desc[i+3], "imageCount" : 0})
        }else {
            day_item_list.push({"day" : i, "description" : desc[i+3], "imageCount" : (files[i]).length})
        }
        if (i-1<initialValues.data.courseDetailsList.length && initialValues.data.courseDetailsList[i-1].imageList!=files[i]){
            courseSaveDtoList_list.push({ "courseId" : initialValues.data.courseDetailsList[i-1].courseId, "day" : i, "description" : desc[i+3], "removedImageIdList" : initialValues.data.courseDetailsList[i-1].imageList.map((item) => item.id),"newImageCount" : files[i-1].length})
            files[i-1].forEach((file) => fd.append("courseDetailsImages", file));
        }
        else if(i-1<initialValues.data.courseDetailsList.length){
            courseSaveDtoList_list.push({ "courseId" : initialValues.data.courseDetailsList[i-1].courseId, "day" : i, "description" : desc[i+3], "removedImageIdList" : [],"newImageCount" : 0})
        }else if (files[i-1] != null && files[i-1]!=[] && files[i-1]!=undefined && files[i-1].length!=0){
           courseSaveDtoList_list.push({ "courseId" : null, "day" : i, "description" : desc[i+3], "newImageCount" : files[i-1].length })
           files[i-1].forEach((file) => fd.append("courseDetailsImages", file));
        }else {
           courseSaveDtoList_list.push({ "courseId" : null, "day" : i, "description" : desc[i+3], "newImageCount" : 0 })

        }

    }
    day_list.forEach((day) => {if (files[day]!=undefined) {files[day].forEach((img) => fd.append("courseDetailsImages", img))}});



//  fd.append("courseDetailsImages", main)
console.log("files[day]")
console.log(optionNew)
console.log(initialValues.data.productDetails.imageList.map((item) => item.id))
  day_list.forEach((day) => {if (files[day]!=undefined) {files[day].forEach((img) => fd.append("courseDetailsImages", img))}});
  const body_data = {
  "productId":initialValues.data.productId,
    "productName" : values.name,
    "categoryId" : categoryID,
    "regionId" : regionID,
    "servicePeriodList" : date_list,
//    "servicePeriodList" : initialValues.data.servicePeriodList,
    "includedPartList" : optionI,
    "nonIncludedPartList" : optionN,
    "type" : cateid,
    "productDetailsNRemovedImage" : {"description" : desc[0], "removedProductImageIdList" : [] },
    "hospitalDetailsNRemovedImage" : {"description" : desc[1], "removedProductImageIdList" : [] },
    "accommodationDetailsNRemovedImage" : {"description" : desc[2], "removedProductImageIdList" :[] },
    "courseSaveDtoList" : courseSaveDtoList_list,

    "tagList" : optionT,

    "price" : values.price,
    "salePrice" : values.sale_price,

    "optionFeeSaveInfo" : {
    "deleteIdList" : initialValues.data.optionFeeList.map((item)=> item.id),
    "updateInfoList" : [],
    "createInfoList" : [{"description" : "test", "price" : 12}]
},

"open" : show,
 "thumbnailChanged":thumbChange,

  }
//    Object.values(files["상품"]).forEach((file) => fd.append("productDetailsImages", file));
//  Object.values(files["병원"]).forEach((file) => fd.append("hospitalDetailsImages", file));
//  Object.values(files["숙소"]).forEach((file) => fd.append("accommodationDetailsImages", file));
  if (setProChange){
  body_data['productDetailsNRemovedImage'] = {"description" : desc[0], "removedProductImageIdList" : initialValues.data.productDetails.imageList.map((item) => item.id)}
  Object.values(files["상품"]).forEach((file) => fd.append("productDetailsImages", file));}
  else if (setHoschange) {
    body_data['hospitalDetailsNRemovedImage'] = {"description" : desc[1], "removedProductImageIdList" : initialValues.data.hospitalDetails.imageList.map((item) => item.id)}
  Object.values(files["병원"]).forEach((file) => fd.append("hospitalDetailsImages", file));
  } else{
  body_data['accommodationDetailsNRemovedImage'] = {"description" : desc[2], "removedProductImageIdList" : initialValues.data.accommodationDetails.imageList.map((item) => item.id)}
    Object.values(files["숙소"]).forEach((file) => fd.append("accommodationDetailsImages", file));
  }
  console.log("body_data")
  console.log(body_data)
//  ['상품','병원','숙소']
  fd.append("productSaveRequestDto", new Blob([JSON.stringify(body_data)], { type: 'application/json' }))

   for (var pair of fd.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }

//  productAddRequestDto
// ***********************************
  fetch(targetUrl+'/products',{
      credentials : 'include',
      method: 'PUT',
      body: fd
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.status);
    if(response.status=='success'){
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
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#4F83E1",padding: 4, margin: 2  }} >
                  {o}
                    <BiXCircle size={20} onClick={() => handleOption_included(o)} />
                </Button>
              )}
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
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#E49689",padding: 4, margin: 2  }} >
                  {o}
                    <BiXCircle size={20} onClick={() => handleOption_not_included(o)} />
                </Button>
              )}
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
                  {/*mainch? (main.map((file, index) => {
                return <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDeleteMain(file)} />
                      </UploadImageBox>
              }))
                  :
                  <UploadImageBox key={"7"}>
                        <img src={`data:image/png;base64,${initialValues.img.imageBase64String}`} width="100%"/>
                        <BazaarImage src={`data:image/png;base64,${initialValues.img.imageBase64String}`} width="100%" />
                        <StyledClear onClick={handleFileDeleteMain()} />
                      </UploadImageBox>*/}
                  {/*main.map((file, index) => {
                return <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDeleteMain(file)} />
                      </UploadImageBox>
              })*/}
{/*              <img src={`data:image/png;base64,${initialValues.img.imageBase64String}`}/> */}
                </FlexBox>
              </Grid>
              <Grid item lg={1} xs={1} />
              <Grid item lg={4} xs={4}>
              <img src={main[0].preview} style={{ width: 200, height: 200 }} />
             {/*main.map((file, index) => {
                return <UploadImageBox key={index}>
                        <BazaarImage src={file.preview} width="100%" />
                        <StyledClear onClick={handleFileDeleteMain(file)} />
                      </UploadImageBox>
              })*/}
              </Grid>
              </Grid>



           {list.map((n, index) => {
          return ( <Grid container spacing={3}>
          <Grid item xs={6}>
              <Typography fontSize="14px" color="grey.600" align="center">
                  {(n)+" 상세 설명"}
              </Typography>
                <TextField rows={8} multiline fullWidth color="info" size="medium" name="description" label={(n)+" 상세 설명"} onBlur={handleBlur} onChange={()=>handleChange_text(index, event)} placeholder="Description" value={desc[index]} />
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
                      </UploadImageBox>
              })}
                </FlexBox>
              </Grid>
              </Grid> )})}


              {listn.map((n, index) => {
          return ( <Grid container spacing={3}>
          <Grid item xs={6}>
          <Typography fontSize="14px" color="grey.600" align="center">
                  {(index+1)+"일차 설명"}
              </Typography>
                <TextField rows={8} multiline fullWidth color="info" size="medium" name="description" label={(index+1)+"일차"} onBlur={handleBlur} onChange={()=>handleChange_text(index, event)} placeholder="Description" value={desc[index+3]} />
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
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#4F83E1",padding: 4, margin: 2  }} >
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
              {values.option.map(o =>
                <Button key={o} variant="contained" type="submit" style={{ backgroundColor: "#FFA07A",padding: 4, margin: 2  }} >
                  {o}{" "}&nbsp;
                    <BiXCircle size={25} onClick={() => handleOption(o)} />
                </Button>
              )}

              <Grid container spacing={3}>
              <Grid item sm={6} xs={6}>
                <FormControlLabel control={<Switch defaultChecked value={values.show} onChange={handleChange} />} label="판매상품 공개하기" />
              </Grid>
              </Grid>
              <Grid item sm={6} xs={6}>
                <Button variant="contained" color="info" type="submit" onClick={()=>submit()}>
                  수정하기
                </Button>
              </Grid>
            </Grid>
          </form>
      </Formik>
    </Card>;
};
export default ProductForm;