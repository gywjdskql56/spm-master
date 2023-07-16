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
    {products.map(item => <ProductCard9 id={item.product_id} key={item.product_id} slug={item.product_id} title={item.product_name} price={item.sale_price} off={item.discount} rating={item.rating} imgUrl={"/assets/images/products/Package/"+item.img+".png"} />)}
    <FlexBetween flexWrap="wrap" mt={4}>
      <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
      <Pagination count={1} variant="outlined" color="primary" />
    </FlexBetween>
  </div>;
};
export default ProductCard9List;