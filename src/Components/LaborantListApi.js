import axios from "axios";

export function loadLaborants() {
    return axios.get('http://localhost:8080/api/v1/laborants');
}

export default loadLaborants;
