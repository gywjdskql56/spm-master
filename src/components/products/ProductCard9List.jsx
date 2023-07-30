import { Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard9 from "components/product-cards/ProductCard9";
import { Span } from "../Typography";
// ==========================================================

const ProductCard9List = ({
  products
}) => {
  return
  <div>
    {products.map(item =>
    <ProductCard9 hoverEffect id={item.productId} slug={item.productId} title={item.productName} price={item.price} rating={4.9}  imgUrl={`data:image/png;base64,${item.thumbnailImageBase64String}`} discount={5} item={item} />)}
    <FlexBetween flexWrap="wrap" mt={4}>
      <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
      <Pagination count={1} variant="outlined" color="primary" />
    </FlexBetween>
  </div>;
};
export default ProductCard9List;