import API from './api';
export default class Products extends API {
  constructor() {
    super();
    this.results = null;
  }
  searchProducts(params) {
    return this.postRequest("search", params);
  }
}