import axios from "axios";

function LaborantGuncelle(id, body) {
    return axios.put(`http://localhost:8080/api/v1/laborants/${id}`, body);
}

export default LaborantGuncelle;
