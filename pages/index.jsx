import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SEO from "components/SEO";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/index/Section1";
import Section7 from "pages-sections/index/Section7";
import Section12 from "pages-sections/index/Section12";
import { targetUrl } from "components/config";
import { ConstructionOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";

const MarketShop = (props) => {
  const [categories, setCategories] = useState({data: null});
  const [products, setProducts] = useState({data: null});
  const [regions, setRegions] = useState({data: null});
  const [open, setOpen] = useState(false);

const getData = async () => {
    const categoriesRes = await fetch(targetUrl + "/categories", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  const categoriesRes_json = await categoriesRes.json();
  setCategories(categoriesRes_json)
  console.log(categoriesRes_json)
  const productRes = await fetch(targetUrl + "/open-products", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  const productRes_json = await productRes.json();
  setProducts(productRes_json)
  console.log(productRes_json)
  const regionsRes = await fetch(targetUrl + `/regions`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  const regionsRes_json = await regionsRes.json();
  setRegions(regionsRes_json)
  console.log(regionsRes_json)
  setOpen(true)
  }
    useEffect(() => {
    getData()
  },[])


  return (
    <ShopLayout1>
      <SEO title="Market v1" />
      {open!=0?
      <div>
      <Section7
        title="ALL"
        categories={categories.data}
        products={products.data}
        regions={regions.data}
        productList={props.mobileList}
      />
      <Section1 />
      <Section12 />
      </div>
      :
      <div />}
    </ShopLayout1>
  );
};
export const getStaticProps = async ({ locale }) => {

  let locales = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
    props: {
      ...locales,
    },
  };
};
export default MarketShop;
