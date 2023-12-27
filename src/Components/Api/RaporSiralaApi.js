import axios from "axios";

export function RaporSirala(page = 0, sortByDate = false) {
  return axios.get("http://localhost:8080/api/v1/raporlar", {
    params: {
      page: page,
      size: 50,
      sortByDate: sortByDate // veya sortByDate: sortByDate.toString() ifadesini kullanabilirsiniz
    },
  });
}

export default RaporSirala;
