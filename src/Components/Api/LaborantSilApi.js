import axios from "axios";

export function LaborantSil(id) {
  return axios.delete(`http://localhost:8080/api/v1/laborants/${id}`);
}

export default LaborantSil;
