import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SEO from "components/SEO";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/index/Section1";
import Section7 from "pages-sections/index/Section7";
import Section12 from "pages-sections/index/Section12";
import { targetUrl } from "components/config";

const MarketShop = (props) => {
  return (
    <ShopLayout1>
      <SEO title="Market v1" />
      <Section7
        title="ALL"
        categories={props.categories.data}
        products={props.products.data}
        regions={props.regions.data}
        productList={props.mobileList}
      />
      <Section1 />
      <Section12 />
    </ShopLayout1>
  );
};
export const getStaticProps = async ({ locale }) => {
  const categoriesRes = await fetch(targetUrl + "/categories", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  const categories = await categoriesRes.json();
  const productRes = await fetch(targetUrl + `/open-products`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  const products = await productRes.json();
  const regionsRes = await fetch(targetUrl + `/regions`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
  const regions = await regionsRes.json();
  let locales = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
    props: {
      ...locales,
      categories,
      products,
      regions,
    },
  };
};
export default MarketShop;
