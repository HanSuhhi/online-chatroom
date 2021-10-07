import api from "../api";

export const getHello = () =>
  api({
    method: "GET",
    url: "/hello",
  });
