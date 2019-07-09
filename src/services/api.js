class API {
  constructor() {
    this.base_url = 'https://api.aliseeks.com/v1/';
    this.headers = {
      "X-API-CLIENT-ID": "TZLQDTZIGQGFESGM",
      "Content-Type": "application/json",
    };
  }
  postRequest(url, bodyParams) {
    const reqParams = {
      method: "post",
      headers: this.headers,
      body: JSON.stringify(bodyParams),
    };
    return fetch(`${this.base_url}${url}`, reqParams)
      .then(res => res.json())
      .catch(err => err);
  }
  getRequest(url, bodyParams) {
    const reqParams = {
      method: "get",
      headers: this.headers,
      body: JSON.stringify(bodyParams),
    };
    return fetch(`${this.base_url}${url}`, reqParams)
      .then(res => res.json())
      .catch(err => err.message);
  }
}
export default API;