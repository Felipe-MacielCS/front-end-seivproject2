import axios from "axios";

var baseurl = "";
if (import.meta.env.DEV) {
  baseurl = "http://localhost:8080";
} else {
  baseurl = "/2025/project2/t7"
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
  transformRequest: (data, headers) => {

    return JSON.stringify(data);
  },
  transformResponse: function (data) {
    data = JSON.parse(data);
   
    return data;
  },
});

export default apiClient;