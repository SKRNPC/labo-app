import axios from "axios";

export function LaborantArama(searchResult) {
  return axios.get("http://localhost:8080/api/v1/laborants/search", {
    params: searchResult,
  });
}

export default LaborantArama;
