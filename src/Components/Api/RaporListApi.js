import axios from "axios";

export function loadRapors(page=0) {
  return axios.get("http://localhost:8080/api/v1/raporlar", {params:{page:0 ,size:50}});
}

export default loadRapors;
