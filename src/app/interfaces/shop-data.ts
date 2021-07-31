export interface ShopData {
  shopId: 0,
  shopName: "",
  shopLocation: null,
  shopDescription: null,
  shopImage: null,
  shopProducts: [
    {
      productId: 0,
      productName: "",
      productPrice: 0,
      brandName: "",
      categoryType: "",
      productType: null,
      productDescription: null,
      productImage: null,
      productDiscounts: [
        {
          discountId: 0,
          discountName: "not given",
          discountPercentage: 10,
          startDate: null,
          endDate: null
        }],
      users: []
    }]
}
