import React, { useState } from "react";
import RaporArama from "./Api/RaporAramaApi";
import LaborantArama from "./Api/LaborantAramaApi";

function SearchBar() {
  const [searchTermRapor, setSearchTermRapor] = useState("");
  const [searchTermLaborant, setSearchTermLaborant] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState([]);

  const raporSearch = async () => {
    setApiProgress(true);
    try {
      let searchParam;
      // Eğer girdi bir sayı ise hastaKimlik, değilse hastaIsim olarak kabul et
      if (searchTermRapor !== "") {
        searchParam = isNaN(searchTermRapor)
          ? { hastaIsim: searchTermRapor }
          : { hastaKimlik: searchTermRapor };

        console.log(searchParam);
        const searchResult = await RaporArama(searchParam);
        // Arama başarılıysa, sonuçları kullanıcıya göster veya başka işlemler yap
        console.log("Arama Sonuçları: ", searchResult);
        // Burada gelen veriyi kullanabilir veya başka işlemler yapabilirsiniz
      } else {
        // searchTerm boşsa hiçbir şey listelenmez
        console.log("Arama Sonuçları: ", []);
      }
    } catch (axiosError) {
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrors(axiosError.response.data.validationErrors);
      } else {
        setGeneralError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin!");
      }
    } finally {
      setApiProgress(false);
    }
  };
  const laborantSearch = async () => {
    setApiProgress(true);

    try {
      let searchResult;
      // Eğer girdi boş değilse isme göre arama yap
      if (searchTermLaborant !== "") {
        searchResult = await LaborantArama({ isim: searchTermLaborant });

        // Arama başarılıysa, sonuçları kullanıcıya göster veya başka işlemler yap
        console.log("Laborant Arama Sonuçları: ", searchResult);
        // Burada gelen veriyi kullanabilir veya başka işlemler yapabilirsiniz
      } else {
        // searchTerm boşsa hiçbir şey listelenmez
        console.log("Laborant Arama Sonuçları: ", []);
      }
    } catch (axiosError) {
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrors(axiosError.response.data.validationErrors);
      } else {
        setGeneralError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin!");
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder=""
        value={searchTermLaborant}
        onChange={(e) => setSearchTermLaborant(e.target.value)}
        className="search-input"
      />
      <button
        className="button-guncelle search-button"
        onClick={laborantSearch}
      >
        Laborant Ara
      </button>
      <input
        type="text"
        placeholder=""
        value={searchTermRapor}
        onChange={(e) => setSearchTermRapor(e.target.value)}
        className="search-input"
      />
      <button className="button-guncelle search-button" onClick={raporSearch}>
        Rapor Ara
      </button>
    </div>
  );
}

export default SearchBar;
