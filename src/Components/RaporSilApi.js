import axios from "axios";

export function RaporSil(id) {
  return axios.delete(`http://localhost:8080/api/v1/raporlar/${id}`);
}

export default RaporSil;
