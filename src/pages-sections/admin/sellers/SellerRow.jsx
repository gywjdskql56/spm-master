import { useState, useEffect } from "react";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box, Button } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../StyledComponents";
import { currency } from "lib";
import { targetUrl } from "components/config";
// ========================================================================

// ========================================================================
 {/*
           {
  businessRegistrationNumber: "+12343458910", //phone
  balance: 12_350.45, //balance
  companyName: "모두투어", //shopName
  companyType: "유치업자", //name
  phoneNum: "010-1234-5678", //package
  email: "hana@gmail.com", //published
  approvedDate: "2023-06-11T11:30:30"
}
        */}
const SellerRow = ({
  seller
}) => {
  console.log("seller")
  console.log(seller)
  const {
    vendorId,
    businessRegistrationNumber,
    companyName,
    companyType,
    phoneNum,
    email,
    approvedDate,
  } = seller;

  const [id, setID] = useState(null);
  const [info, setInfo] = useState(null);
  function download1(){
  console.log('info')
  console.log(info)
    const url = targetUrl + '/members/vendor-prooffile/'+info[0].proofFileInfos[0].vendorProofDocumentId
   const download = document.createElement("a")
   download.href = url
   download.setAttribute('type','application/json')
   download.setAttribute('ngrok-skip-browser-warning', true)
   download.click()
  }
    function download2(){
    const url = targetUrl + '/members/vendor-prooffile/'+info[0].proofFileInfos[1].vendorProofDocumentId
   const download = document.createElement("a")
   download.href = url
   download.setAttribute('type','application/json')
   download.setAttribute('ngrok-skip-browser-warning', true)
   download.click()
  }
  function approve(){
    console.log(targetUrl + '/members/vendor-approve/'+vendorId.toString())
    fetch(targetUrl + '/members/vendor-approve/'+vendorId.toString(),{
      method: "PATCH",
      credentials : 'include',
      headers: {
        "Content-Type": "application/json",
    }
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.response);
    if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("승인되었습니다.")
            window.location.reload()
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("회원가입 승인에 실패하였습니다. 다시 시도해주세요.")
            }
    }})
  }

  useEffect(()=>{
   if (approvedDate==null){
//   const url = targetUrl + '/members/vendor-prooffile/'+vendorId.toString()
//   const download = document.createElement("a")
//   download.href = url

   fetch(targetUrl + '/members/vendor-signup-request',{
      method: "GET",
      credentials : 'include',
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
    }
    })
    .then(response => response.json())
    .then(response => {console.log(response); console.log(response.data);setInfo(response.data)})
    }
  },[])
//  const [shopPulish, setShopPublish] = useState(published);
  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {/*<Avatar src={image} alt={name} />*/}
          <Box>
            <Paragraph>{businessRegistrationNumber}</Paragraph>
            {/*<Small color="grey.600">{phone}</Small>*/}
          </Box>
        </FlexBox>
      </StyledTableCell>

      {/*<StyledTableCell align="left">{balance}</StyledTableCell>*/}

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {companyName}
      </StyledTableCell>

      <StyledTableCell align="left" sx={{
      fontWeight: 400
    }}>
        {companyType}
      </StyledTableCell>

      <StyledTableCell align="left">
        {/*<BazaarSwitch color="info" checked={shopPulish} onChange={() => setShopPublish(state => !state)} />*/}
        {phoneNum}
      </StyledTableCell>

      <StyledTableCell align="left">
        {/*<BazaarSwitch color="info" checked={shopPulish} onChange={() => setShopPublish(state => !state)} />*/}
        {email}
      </StyledTableCell>

      <StyledTableCell align="left">
        {/*<BazaarSwitch color="info" checked={shopPulish} onChange={() => setShopPublish(state => !state)} />*/}
        {approvedDate!=null?
        approvedDate
        :
        <Button fullWidth type="submit" color="success" variant="contained" sx={{height: 30}} onClick={() => approve()} >
          회원가입 승인하기
        </Button>
        }
      </StyledTableCell>
<StyledTableCell align="center">
        <Button fullWidth type="submit" color="warning" variant="contained" sx={{height: 30}} onClick={() => download1()} >
          서류1
        </Button>
         <Button fullWidth type="submit" color="warning" variant="contained" sx={{height: 30}} onClick={() => download2()} >
          서류2
        </Button>
</StyledTableCell>
      {/*<StyledTableCell align="center">
        <StyledIconButton>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>*/}
    </StyledTableRow>;
};
export default SellerRow;