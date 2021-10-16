import axios from "axios";

const api = axios.create({
  baseURL: "/nest/api/v1",
  timeout: 16000,
});

// 请求拦截
api.interceptors.request.use((req) => {
  return req;
});

// 返回拦截
api.interceptors.response.use((res) => {
  const { status } = res;
  if (status !== 200 && status !== 201) {
    return alert("请求失败");
  }
  return res;
});

export default api;
