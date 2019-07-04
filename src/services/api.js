class API {
  constructor() {
    this.base_url = 'https://api.aliseeks.com/v1/';
    this.headers = {
      "X-API-CLIENT-ID": "TZLQDTZIGQGFESGM",
      "Content-Type": "application/json",
    };
  }
  async postRequest(url, bodyParams) {
    return await fetch(`${this.base_url}${url}`, {
      method: "post",
      headers: this.headers,
      body: JSON.stringify(bodyParams),
    })
      .then(res => res.json())
      .catch(err => err.message);
  }
  async getRequest(url, bodyParams) {
    return await fetch(`${this.base_url}${url}`, {
      method: "get",
      headers: this.headers,
      body: JSON.stringify(bodyParams),
    })
      .then(res => res.json())
      .catch(err => err.message);
  }
}
export default API;