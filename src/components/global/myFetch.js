require("babel-polyfill");
require("es6-promise").polyfill();
import "whatwg-fetch";

//let host = "http://14.116.179.241:3000";
let host = "";

if (process.env.NODE_ENV === "production") {
  host = "";
}

const defaultHeaders = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
});

const MyFetch = {};
MyFetch.host = host;

const doFetch = (url, init) => new Promise((resolve, reject) => {
  fetch(url, init)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        reject({ status: response.status });
      }
    })
    .then((response) => {
      if (response.code !== 0) {
        reject({ msg: response.msg });
      } else {
        resolve(response.data);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

MyFetch.get = (api, params = "", headers = defaultHeaders) => {
  let url = api.indexOf("http://") > -1 ? api : `${MyFetch.host}${api}`;
  if (params) {
    const paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join("&")}`;
    } else {
      url += `&${paramsArray.join("&")}`;
    }
  }

  return doFetch(url, { method: "GET", headers });
};

MyFetch.post = (api, body = {}, headers = defaultHeaders) => {
  const url = api.indexOf("http://") > -1 ? api : `${MyFetch.host}${api}`;
  body = JSON.stringify(body);
  let option = { method: "POST", body, headers };
  if (body === "{}") {
    option = { method: "POST", headers };
  }
  return doFetch(url, option);
};

export default MyFetch;
