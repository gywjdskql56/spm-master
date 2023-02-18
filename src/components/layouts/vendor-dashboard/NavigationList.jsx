import duotone from "components/icons/duotone";
export const navigations = [{
  type: "label",
  label: "관리자"
}, {
  name: "현황표",
  icon: duotone.Dashboard,
  path: "/vendor/dashboard"
}, {
  name: "상품",
  icon: duotone.Products,
  children: [{
    name: "상품 리스트",
    path: "/admin/products"
  }, {
    name: "상품 만들기",
    path: "/admin/products/create"
  }, {
    name: "리뷰",
    path: "/admin/product-reviews"
  }]
}, {
  name: "카테고리",
  icon: duotone.Accounts,
  children: [{
    name: "카테고리 리스트",
    path: "/admin/categories"
  }, {
    name: "카테고리 추가하기",
    path: "/admin/categories/create"
  }]
},
//{
//  name: "브랜드",
//  icon: duotone.Apps,
//  children: [{
//    name: "브랜드 리스트",
//    path: "/admin/brands"
//  }, {
//    name: "브랜드 추가하기",
//    path: "/admin/brands/create"
//  }]
//},
{
  name: "주문",
  icon: duotone.Order,
  children: [{
    name: "주문 리스트",
    path: "/admin/orders"
  }, {
    name: "주문 상세",
    path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
  }]
}, {
  name: "고객",
  icon: duotone.Customers,
  path: "/admin/customers"
}, {
  name: "환불",
  icon: duotone.Refund,
  children: [{
    name: "환불 요청",
    path: "/admin/refund-request"
  }, {
    name: "환불 규정",
    path: "/admin/refund-setting"
  }]
}, {
  name: "판매자",
  icon: duotone.Seller,
  children: [{
    name: "판매자 리스트",
    path: "/admin/sellers"
  }, {
    name: "판매자 패키지",
    path: "/admin/seller-package"
  }, {
    name: "판매자 결제",
    path: "/admin/package-payment"
  }, {
    name: "수익 히스토리",
    path: "/admin/earning-history"
  }, {
    name: "대금결제",
    path: "/admin/payouts"
  }, {
    name: "대금결제 요청",
    path: "/admin/payout-request"
  }]
}, {
  type: "label",
  label: "Vendor"
}, {
  name: "매출",
  icon: duotone.ProjectChart,
  children: [{
    name: "매출 내역",
    path: "/vendor/earning-history"
  }, {
    name: "대금결제",
    path: "/vendor/payouts"
  }, {
    name: "대금결제 요청",
    path: "/vendor/payout-requests"
  }, {
    name: "대금결제 설정",
    path: "/vendor/payout-settings"
  }]
}, {
  name: "환불 요청",
  icon: duotone.Refund,
  path: "/vendor/refund-request"
}, {
  name: "리뷰",
  icon: duotone.Review,
  path: "/vendor/reviews"
}, {
  name: "판매사 세팅",
  icon: duotone.SiteSetting,
  path: "/vendor/shop-settings"
}, {
  name: "고객센터 관리",
  icon: duotone.ElementHub,
  path: "/vendor/support-tickets"
}, {
  name: "계정 관리",
  icon: duotone.AccountSetting,
  path: "/vendor/account-setting"
}, {
  name: "사이트 관리",
  icon: duotone.SiteSetting,
  path: "/vendor/site-settings"
}, {
  name: "로그아웃",
  icon: duotone.Session,
  path: "/"
}];