import API from './api';
class Products extends API {
  constructor() {
    super();
    this.results = null;
  }
  getBestSellingProducts(params) {
    const bodyParams = {
      category: params.category || 44,
      sortDirection: "ASC",
      ratingsRange: params.ratingsRange || {from: 4, to: 5},
      priceRange: params.priceRange || {},
      skip: params.skip || 0,
      limit: 25
    };
    return fetch(`${this.base_url}search/`, {
      method: "post",
      headers: this.headers,
      body: JSON.stringify(bodyParams),
    })
      .then(res => res.json())
      .catch(err => err.message);
  }
  searchProducts(params) {
    
    return this.postRequest("search", params);
    // return fetch(`${this.base_url}search/`, {
    //   method: "post",
    //   headers: this.headers,
    //   body: JSON.stringify(bodyParams),
    // })
    //   .then(res => res.json())
    //   .catch(err => err.message);
  }
}
export default Products;