import Link from "next/link";
import { useState, useEffect } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
//import productVariants from "data/product-variants";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Modal from '@mui/material/Modal';
import { targetUrl } from "components/config";
// ================================================================

// ================================================================

const ProductIntro = ({
  product
}) => {
//  console.log(product)
  const {
    productId,
    price,
    title,
    images,
    slug,
    thumbnailImage
  } = product;

  console.log("ProductIntro")
  console.log(product)
//  const {
//    state,
//    dispatch
//  } = useAppContext();
//  console.log(product.servicePeriodList)
const [state, setState] = useState({'cart':[]});
const getData = async () => {
const res = await fetch(targetUrl+"/cart",{
              credentials : 'include',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": true,
            }})
console.log(res)
const data = await res.json();
console.log("RENEW!!!!!!!!!!!!!!!!")
console.log(data)
if(data.status=="success"){
    console.log(data.status)
   console.log(data);
   var cartval = data.data
   for (var j=0; j<cartval.length; j++){
       var total_option_fee = 0
       cartval[j]["optionFee"] = 0
       for (var i=0; i<cartval[j].optionFeeInfoList.length; i++){
            total_option_fee += cartval[j].optionFeeInfoList[i].price
   }
   cartval[j]["optionFee"] = total_option_fee
   console.log(j+'-----'+total_option_fee)
   }
   console.log(cartval)

   cartval = cartval.map((item)=> ({
   'option': item.optionFeeInfoList,
   'qty': item.count,
   'name': item.productName,
   'id':item.cartId,
   'price': item.price+item.optionFee
   }))
   setState({"cart": cartval})
};

}
useEffect(() => {
    getData()
},[])

  const [value, setValue] = useState()
  const [dates, setDates] = useState([])
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectVariants, setSelectVariants] = useState({
    option: "option 1",
    type: "type 1"
  });
  const [open, setOpen] = useState(false);
  const [amt, setAmt] = useState(1);
  const [totalprice, setTotalPrice] = useState(price);
  const [perprice, setPerPrice] = useState(price);
  const [option, setOption] = useState([])
  const [optionID, setOptionID] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOption = (e, id, name, price) =>{

//    console.log("handleClickOption")
//    console.log(e)
//    console.log(val)
    if (e.target.style.color!='red'){
//    console.log("Color Change!!!"+e.target.style.color)
    e.target.style.color = 'red'
//    setOption((prev)=>[...prev, e.target.value])
    setOption((prev)=>[...prev, name])
    setOptionID((prev)=>[...prev, id])
    setTotalPrice((prev)=>(prev + parseFloat(price)*amt))
    setPerPrice((prev)=>(prev + parseFloat(price)))
    }
    else{
//    console.log("Color Not Change!!!"+e.target.style.color)
    e.target.style.color = 'white'
    setOption(prev => {
      return prev.filter(item => item !== name)
    })
    setOptionID(prev => {
      return prev.filter(item => item !== id)
    })
    setTotalPrice((prev)=>(prev - price*amt))
    setPerPrice((prev)=>(prev - price))
    }

  }
   function handleDates(value){
      //your modification on passed value ....
//      console.log(value)
      setValue(value)
     const date_list = []
     for (let i=0; i<value.length; i++) {
//        console.log(value[i])
//        console.log(value[i].format("YYYY-MM-DD"))
        date_list.push({startDate: value[i].format("YYYY-MM-DD"), endDate: value[i].format("YYYY-MM-DD")} )
     }
     setDates(date_list)

//   console.log(date_list)
   }
  // HANDLE CHAMGE TYPE AND OPTIONS
  const handleChangeVariant = (variantName, value) => () => {
    setSelectVariants(state => ({
      ...state,
      [variantName.toLowerCase()]: value
    }));
  };

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem = state.cart.find(item => item.productId === productId);

  // HANDLE SELECT IMAGE
  const handleImageClick = ind => () => setSelectedImage(ind);

  // HANDLE CHANGE CART
  const handleCartAmountChange = async () => {
    console.log({
        price: perprice,
        qty: amt,
        name: product.productName,
        imgUrl: thumbnailImage.imageBase64String,
        id: productId,
        slug : productId
      })
      console.log("value: ", value)
  
   const res = await fetch(targetUrl+"/cart",{
          method: 'POST',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": true,
          },
      body: JSON.stringify({
        productId: productId,
        optionFeeIdList: optionID,
        serviceDateInfoList: dates,
        count : amt,
      })
    })
  const data = await res.json();
  if (data.status=="success"){
  window.alert("장바구니에 담겼습니다.")
  getData()

//      fetch(targetUrl+"/cart",{
//      credentials : 'include',
//      method: 'GET',
//      headers: {
//        'Content-Type': 'application/json',
//        "ngrok-skip-browser-warning": true,
//    }})
//    .then((response) =>
//        response.json())
//    .then((data) =>
//        {if(data.status=="success"){
//            setCart(data); console.log(data); window.sessionStorage.setItem('cart', JSON.stringify(data))}});
//    sessionStorage.setItem('id',values.email)
//    sessionStorage.setItem('type',result.data[0]['authority'])

//      dispatch({
//      type: "CHANGE_CART_AMOUNT",
//      payload: {
//        price: perprice,
//        qty: amt,
//        name: product.productName,
//        imgUrl: thumbnailImage.imageBase64String,
//        id: productId,
//        code: productId+option.sort().map(item => item).join(', '), //+value.sort().map(item => item).join(', '),
//        slug : productId,
//        option : option
//      }
//    });
  }else {
  window.alert("회원만 장바구니 기능을 사용하실 수 있습니다. 로그인 후 다시 시도해주세요.")
  }



  };

  const handleAmountChange = type => () => {
    if (type=="sub"){
        var amt_c = (amt>1? (amt-1): 1)
        setAmt((amt)=>(amt>1? (amt-1): 1))
        setTotalPrice((tot)=>(perprice*(amt_c)))
    }else {
       var amt_c = amt+1
       setAmt((amt)=>(amt+1))
       setTotalPrice((tot)=>(perprice*(amt_c)))
    }
  };
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};
  const { allowedMaxDays, allowedDays, allowedRange, beforeToday, afterToday, combine } = DateRangePicker;
  return <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6} onClick={handleOpen}>
            <LazyImage alt={title} width={300} height={300} loading="eager" objectFit="contain" src={`data:image/png;base64,${product.productDetails.imageList[selectedImage].imageBase64String}`} />
          </FlexBox>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
           {/*<LazyImage alt={title} width={1000} height={1000} loading="eager" objectFit="contain" src={`data:image/png;base64,${product.thumbnailImage.imageBase64String}`} />*/}
           <LazyImage alt={title} width={1000} height={1000} loading="eager" objectFit="contain" src={`data:image/png;base64,${product.productDetails.imageList[selectedImage].imageBase64String}`} />
          </Box>
          </Modal>

          <FlexBox overflow="auto">
            {product.productDetails.imageList.map((url, ind) => <FlexRowCenter key={ind} width={64} height={64} minWidth={64} bgcolor="white" border="1px solid" borderRadius="10px" ml={ind === 0 ? "auto" : 0} style={{
            cursor: "pointer"
          }} onClick={handleImageClick(ind)} mr={ind === product.productDetails.imageList.length - 1 ? "auto" : "10px"} borderColor={selectedImage === ind ? "primary.main" : "grey.400"}>
                <Avatar src={`data:image/png;base64,${url.imageBase64String}`} variant="square" sx={{
              height: 40
            }} />
              </FlexRowCenter>)}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>{product.productName}</H1>

          <FlexBox alignItems="center" mb={1}>
            <Box>Vendor:</Box>
            <H6>{product.vendorInfo.companyName}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Review:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating color="warn" fontSize="1.25rem" value={0} readOnly />
            </Box>
            <H6 lineHeight="1">({product.reviewList.length})</H6>
          </FlexBox>

          {(product.optionFeeList).map(variant =>
        <Button key={variant.id} color="success" variant="contained" onClick={(e)=>handleClickOption(e, variant.id, variant.name, variant.price)} sx={{
          mb: 4.5,
          px: "1.75rem",
          height: 40,
          margin: 2
        }}>
              <H6 mb={1} style={{color:'white'}}>{variant.name+"("+variant.price+")"}</H6>

              {/* {variant.values.map(({
            id,
            value
          }) => <Chip key={id} label={value} onClick={handleChangeVariant(variant.title, value)} sx={{
            borderRadius: "4px",
            mr: 1,
            cursor: "pointer"
          }} color={selectVariants[variant.title.toLowerCase()] === value ? "primary" : "default"} />)} */}
            </Button>
            )}

          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {"US"+(price)}
            </H2>
          </Box>
          <Box mb={2}>
          <H6 mb={1}>Select reservation date (Multiple selection possible)</H6>
          </Box>
        <Calendar
          multiple
          mapDays={({ date }) => {
              let isInclude = false;
              var todayDate = new Date().toISOString().slice(0, 10);
//              console.log(todayDate)
              if (date.format("YYYY-MM-DD")>todayDate){
                  for (let i =0; i <product.servicePeriodList.length; i++){
                    if (!isInclude){
                    isInclude = date.format("YYYY-MM-DD")>=product.servicePeriodList[i].startDate && date.format("YYYY-MM-DD")<=product.servicePeriodList[i].endDate
                    }
              }}
                if (!isInclude)
                return {
                  disabled: true,
                  style: { color: "#ccc" },
                  onClick: () => alert("The date selected is disabled")
                }
          }}
          plugins={[
           <DatePanel />
          ]}
          value={value}
          onChange={handleDates}
        />
        {/*<Box mb={2}>
          <H6 mb={1}>예약날짜 선택</H6>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
        </LocalizationProvider>*/}

          {/*!cartItem?.qty ?
          <Button color="primary" variant="contained" onClick={handleCartAmountChange(1)} sx={{
          mb: 4.5,
          px: "1.75rem",
          height: 40,
          margin: 2
        }}>
              장바구니에 추가하기
            </Button>
            :*/}
            <FlexBox alignItems="center" mb={4.5}>
            <FlexBox alignItems="center">
             <H2 color="primary.main" mb={0.5} lineHeight="1">
              {"Total Price :  "+currency(totalprice)+"      "}
            </H2>
              <Button size="small" mb={4} mt={2} sx={{
            marginLeft: '20px',
            p: 1
          }} color="primary" variant="outlined" onClick={handleAmountChange("sub")}>
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {amt}
              </H3>

              <Button size="small" sx={{
            p: 1
          }} color="primary" variant="outlined" onClick={handleAmountChange("add")}>
                <Add fontSize="small" />
              </Button>
              <FlexBox alignItems="center">
              <Button color="primary" variant="contained" onClick={()=>handleCartAmountChange()} sx={{
                  mb: 0,
                  px: "1.75rem",
                  height: 40,
                  margin: 2
              }}>
              Add to cart
            </Button>
            </FlexBox>
            </FlexBox>
            </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box>Vendor Contacts:</Box>
              <a>
                <H6 ml={1}>hana@gmail.com</H6>
              </a>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>;
};
export default ProductIntro;