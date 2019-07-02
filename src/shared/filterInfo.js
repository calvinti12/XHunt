export default class FilterInfo {
  constructor() {
    this.products = [];
    this.categories = [
      {
        id:0, 
        label: "Name", 
        method: (sort) => () => sort === "ASC" ? this.products.sort((a,b) => a.title - b.title) : sort === "DESC" ? this.products.sort((a,b) => b.title - a.title) : this.products
      },
      {
        id:1,
        label:"Rating",
        method: (sort) => () => sort === "ASC" ? this.products.sort((a,b) => a.ratings - b.ratings) : sort === "DESC" ? this.products.sort((a,b) => b.ratings - a.ratings) : this.products
      },
      {
        id:2,
        label:"Price",
        method: (sort) => () => sort === "ASC" ? this.products.sort((a,b) => a.price.value - b.price.value) : sort === "DESC" ? this.products.sort((a,b) => b.price.value - a.price.value) : this.products
      },
      {
        id:3,
        label: "# of Orders", 
        method: (sort) => () => sort === "ASC" ? this.products.sort((a,b) => a.orders - b.orders) : sort === "DESC" ? this.products.sort((a,b) => b.orders - a.orders) : this.products
      },
    ];
  }
  sortProducts = (category, sort) => {
    this.categories[category].method(sort)();
    return this.products;
  }
}