import baseUrl from "src/app/services/helper";

export const environment = {
  production: true,

  productCategoryStoresUrl: baseUrl + '/productCategory/stores',
  productCategoryProductsUrl: baseUrl + '/productCategory/products',
  productUrl: baseUrl + '/product',
  productImageUrl: baseUrl + '/product/image/',
  recommedationImageIds: baseUrl + '/recommend/showRecommend',
  recommedationImage: baseUrl + '/recommend/bar/',
  storeImageUrl: baseUrl + '/admin/shop/image/',


  webSocketUrl:  baseUrl + '/notification',
  webSocketReceivedUrl: '/topic/received',
  webSocketSendUrl: '/app/notification'
};
