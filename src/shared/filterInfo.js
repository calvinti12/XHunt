export default class FilterInfo {
  constructor() {
    this.products = [];
    this.categories = [
      {id:44, label: "Consumer Electronics"},
      {id:13, label: "Home Improvement"},
      {id:100003070, label:"Men Apparel"},
      {id:100003109, label:"Women Apparel"},
      {id:200214370, label:"Sports Accessories"},
      {id:200000528, label:"Boys' Baby Clothing"},
      {id:200000567, label:"Girls' Baby Clothing"},
      {id:100001622, label:"Baby Toys"}
    ];
    this.sortOptions = [
      {
        id:0,
        label:"Price",
        method: (sort) => sort === "ASC" ? this.products.sort((a,b) => a.price.value - b.price.value) : sort === "DESC" ? this.products.sort((a,b) => b.price.value - a.price.value) : this.products
      },
      {
        id:1,
        label:"Rating",
        method: (sort) => sort === "ASC" ? this.products.sort((a,b) => a.ratings - b.ratings) : sort === "DESC" ? this.products.sort((a,b) => b.ratings - a.ratings) : this.products
      },
      {
        id:2,
        label: "Orders",
        method: (sort) => sort === "ASC" ? this.products.sort((a,b) => a.orders - b.orders) : sort === "DESC" ? this.products.sort((a,b) => b.orders - a.orders) : this.products
      },
    ];
  }
  sortProducts = (category, sort) => {
    this.sortOptions[category].method(sort);
    return this.products;
  }
}