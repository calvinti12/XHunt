export default class FilterInfo {
  constructor() {
    this.products = [];
    this.categories = [
      // {id: 200000567, label: "Girl's Baby Clothing"},
      // {id: 200000528, label: "Boy's Baby Clothing"},
      // {id: 100003199, label: "Girl's Clothing"},
      // {id: 100003186, label: "Boy's Clothing"},
      // {id: 200002101, label: "Baby Shoes"},
      // {id: 32212, label: "Children's Shoes"},
      // {id: 100001118, label: "Baby Care"},
      // {id: 200003594, label: "Activity Gear"},
      // {id: 200003592, label: "Safety Equipment"},
      // {id: 100002964, label: "Baby Bedding"},
      // {id: 200217581, label: "Pregnancy & Maternity"},
      // {id: 200217573, label: "Baby Furniture"},
      {id: 44, label: "Consumer Electronics"},
      {id: 15010508, label: "Baby Monitors"},
      {id: 100002965, label: "Baby Cribs"},
      {id: 66, label: "Beauty & Health"},
      {id: 26, label: "Toys & Hobbies"},
      {id: 1501, label: "Mother & Kids"},
      {id: 100003109, label:"Women Apparel"},
      {id: 13, label: "Home Improvement"},
      {id: 7, label: "Computer & Office"},
      {id: 509, label: "Phones & Communication"},
      {id: 100003070, label:"Men Apparel"},
      {id: 200214370, label:"Sports Accessories"},
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