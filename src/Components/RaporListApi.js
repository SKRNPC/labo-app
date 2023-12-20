import axios from "axios";

export function loadRapors() {
  return axios.get("http://localhost:8080/api/v1/raporlar");
}

export default loadRapors;
