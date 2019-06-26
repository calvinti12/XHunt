// Body params
// 1- category: 'all','fashion','sports','health_beauty','home_garden','kids_baby','automotive','men','women'
// 2- range: 'top','weekly'
import API from './api';
class Products extends API {
  //https://docs.aliseeks.com/api/#search-best-selling-products-realtime
  getBestSellingProducts(range,category,locale,currency) {
    const bodyParams = {
      range: range || "top",
      locale: locale || "en_US",
      currency: currency || "USD",
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