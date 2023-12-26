import axios from "axios";

function RaporEkle(body) {
    return axios.post('http://localhost:8080/api/v1/raporlar', body);
}

export default RaporEkle;
