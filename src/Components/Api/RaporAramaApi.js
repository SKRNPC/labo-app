import axios from "axios";

export function RaporArama(searchParams) {
  return axios.get("http://localhost:8080/api/v1/raporlar/search", {
    params: searchParams,
  });
}

export default RaporArama;
