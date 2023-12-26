import axios from "axios";

export function loadLaborants(page=0) {
    return axios.get('http://localhost:8080/api/v1/laborants', { params: {page, size:50}});
}

export default loadLaborants;
