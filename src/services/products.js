// Body params
// 1- category: 'all','fashion','sports','health_beauty','home_garden','kids_baby','automotive','men','women'
// 2- range: 'top','weekly'
import API from './api';
class Products extends API {
  //https://docs.aliseeks.com/api/#search-best-selling-products-realtime
  getBestSellingProducts(params) {
    const bodyParams = {
      range: (params && params.range) || "top",
      // category: (params && params.category) || "all",
      locale: (params && params.locale) || "en_US",
      currency: (params && params.currency) || "USD",
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
    const bodyParams = {
      text: params.searchText,
      category: params.category,
      sortDirection: "ASC",
      ratingsRange: params.ratingsRange || {},
      priceRange: params.priceRange || {},
    };
    return fetch(`${this.base_url}search/`, {
      method: "post",
      headers: this.headers,
      body: JSON.stringify(bodyParams),
    })
      .then(res => res.json())
      .catch(err => err.message);
  }
}
export default Products;