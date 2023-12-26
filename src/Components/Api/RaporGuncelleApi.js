import axios from "axios";

function RaporGuncelle(id, body) {
    return axios.put(`http://localhost:8080/api/v1/raporlar/${id}`, body);
}

export default RaporGuncelle;
