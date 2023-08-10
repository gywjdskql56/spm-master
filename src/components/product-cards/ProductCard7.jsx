import Link from "next/link";
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled, Grid, Divider } from "@mui/material";
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { H1, H2, H3, H6 } from "components/Typography";
import { targetUrl, getAuth } from "components/config";

// styled components
const Wrapper = styled(Card)(({
  theme
}) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%"
    }
  }
}));

// =========================================================

// =========================================================

const ProductCard7 = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  slug,
  option,
  dates
}) => {
   console.log("imgUrl")
   console.log(imgUrl)
  const {
    dispatch
  } = useAppContext();
  // handle change cart
  const handleCartAmountChange = amount => () => {
    fetch(targetUrl+'/cart/'+id,{
      method: 'DELETE',
      credentials : 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(response => {console.log(response)
        if(response.status=='success'){
        if (typeof window !== "undefined") {
            window.alert("성공적으로 장바구니에서 삭제되었습니다.")
            window.location.reload()
        }
    }else{
        if (typeof window !== "undefined") {
            window.alert("장바구니에서 삭제 실패하였습니다. 다시 시도해주세요.")
        }}
    })

  };
  return <Wrapper>
      {/* <Image alt={name} width={140} height={140} display="block" src={imgUrl || "/assets/images/products/iphone-xi.png"} /> */}

      <IconButton size="small" onClick={handleCartAmountChange(0)} sx={{
      position: "absolute",
      right: 15,
      top: 15
    }}>
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/product/${slug}`}>
          <a>
            <Span ellipsis fontWeight="600" fontSize={18}>
              {name}
            </Span>
          </a>
        </Link>

        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
        <Grid container spacing={3}>
        {(dates).map(variant =>
        <Grid item lg={2.5} md={3} xs={3} alignItems="center">
        <Button key={dates.startDate} color="error" variant="contained" sx={{
          mb: 0.5,
          px: "1.rem",
          height: 40,
          margin: 0.5
        }}>
              <H6 mb={1} style={{color:'white'}}>{variant.startDate}</H6>
        </Button>
        </Grid>
        )}
        {/*</Grid></FlexBox>

        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
        <Grid container spacing={3}>*/}
        {(option).map(variant =>
        <Grid item lg={2} md={3} xs={3} alignItems="center">
        <Button key={variant.name} color="success" variant="contained" sx={{
          mb: 0.5,
          px: "1.rem",
          height: 40,
          margin: 0.5
        }}>
              <H6 mb={1} style={{color:'white'}}>{variant.name+"("+variant.price+")"}</H6>
        </Button>
        </Grid>
        )}</Grid></FlexBox>


<FlexBox gap={1} flexWrap="wrap" alignItems="center">
<Span color="grey.600">
            {currency(price)}
  </Span>
</FlexBox>

{option.map(opt => (<FlexBox gap={1} flexWrap="wrap" alignItems="center">
  <Span color="grey.600">
            {"+ " + currency(opt.price)+" ("+opt.name+")"}
  </Span></FlexBox>))}
  <Divider sx={{
            mb: 1
          }} />

<FlexBox gap={1} flexWrap="wrap" alignItems="center">
<Span color="grey.600">
            {""+currency(price)}
  </Span>
</FlexBox>
<FlexBox gap={1} flexWrap="wrap" alignItems="center">
<Span color="grey.600">
            {"x "+qty}
  </Span>
</FlexBox>
<Divider sx={{
            mb: 1
          }} />
<FlexBox gap={1} flexWrap="wrap" alignItems="center">
<Span fontWeight={600} color="primary.main">
            {currency(price * qty)}
  </Span>
</FlexBox>

        {/* <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            {currency(price)} x {qty}
          </Span>

          <Span fontWeight={600} color="primary.main">
            {currency(price * qty)}
          </Span>
        </FlexBox> */}

        {/* <FlexBox alignItems="center">
          <Button color="primary" sx={{
          p: "5px"
        }} variant="outlined" disabled={qty === 1} onClick={handleCartAmountChange(qty - 1)}>
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {qty}
          </Span>
          <Button color="primary" sx={{
          p: "5px"
        }} variant="outlined" onClick={handleCartAmountChange(qty + 1)}>
            <Add fontSize="small" />
          </Button>
        </FlexBox> */}
      </FlexBox>
    </Wrapper>;
};
export default ProductCard7;