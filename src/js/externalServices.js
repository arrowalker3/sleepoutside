const baseURL = "//157.201.228.93:2992/";

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
    // console.log("Oops");
    }
}

export default class ExternalServices {
  constructor() {}

  async findProductById(id) {
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
    return fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    // const thing1 = await fetch(baseURL + "checkout/", options);
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
