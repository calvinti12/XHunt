export default class FilterInfo {
  constructor() {
    this.products = [];
    this.categories = [
      // {id: 100001622, label: "Baby Toys"},
      // {id: 100002964, label: "Baby Bedding"},
      // {id: 100001118, label: "Baby Care"},
      // {id: 200218586, label: "Baby Food"},
      // {id: 200217573, label: "Baby Furniture"},
      // {id: 200002101, label: "Baby Shoes"},
      // {id: 200217580, label: "Baby Boys Clothing"},
      // {id: 200000567, label: "Baby Girls Clothing"},
      {id: 15010508, label: "Baby Monitors"},
      {id: 100002965, label: "Baby Cribs"},
      {id:44, label: "Consumer Electronics"},
      {id:13, label: "Home Improvement"},
      {id:100003070, label:"Men Apparel"},
      {id:100003109, label:"Women Apparel"},
      {id:200214370, label:"Sports Accessories"},
      // {id:200000528, label:"Boys' Baby Clothing"},
      // {id:200000567, label:"Girls' Baby Clothing"},
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