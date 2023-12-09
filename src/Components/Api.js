import axios from "axios";

function LaborantEkle(body) {
    return axios.post('http://localhost:8080/api/v1/laborants', body);
}

export default LaborantEkle;