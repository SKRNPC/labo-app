import React, { useContext, useState } from "react";
import RaporArama from "./Api/RaporAramaApi";
import LaborantArama from "./Api/LaborantAramaApi";
import FormsContext from "../context/Form";

function SearchBar() {
  const [searchTermRapor, setSearchTermRapor] = useState("");
  const [searchTermLaborant, setSearchTermLaborant] = useState("");
  const {
    updateSearchedLaborants,
    setApiProgress,
    setApiProgressRapor,
    updateSearchedRapors,
  } = useContext(FormsContext);
  const [searchError, setSearchError] = useState(null);

  const raporSearch = async () => {
    setApiProgressRapor(true);
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

        if (searchResult.data.content.length > 0) {
          updateSearchedRapors(searchResult.data.content);
        } else {
          setSearchError("Rapor bulunamadı.");
        }
      } else {
        // searchTerm boşsa hiçbir şey listelenmez
        console.log("Arama Sonuçları: ", []);
        updateSearchedRapors([]);
      }
    } catch {
      setSearchError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setApiProgressRapor(false);
      setSearchTermRapor("");
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
        console.log("Laborant Arama Sonuçları: ", searchResult.data.content);

        if (searchResult.data.content.length > 0) {
          updateSearchedLaborants(searchResult.data.content);
        } else {
          setSearchError("Laborant bulunamadı.");
        }
      } else {
        // searchTerm boşsa hiçbir şey listelenmez
        console.log("Laborant Arama Sonuçları: ", []);
        updateSearchedLaborants([]);
      }
    } catch {
      setSearchError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setApiProgress(false);
      setSearchTermLaborant("");
    }
  };
  const handleInputChange = () => {
    setSearchError(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder=""
        value={searchTermLaborant}
        onChange={(e) => {
          setSearchTermLaborant(e.target.value);
          handleInputChange();
        }}
        className="search-input"
      />
      <button
        className="button-guncelle search-button-ara"
        onClick={laborantSearch}
      >
        Laborant Ara
      </button>
      <input
        type="text"
        placeholder=""
        value={searchTermRapor}
        onChange={(e) => {
          setSearchTermRapor(e.target.value);
          handleInputChange();
        }}
        className="search-input"
      />
      <button className="button-guncelle search-button-ara" onClick={raporSearch}>
        Rapor Ara
      </button>
      <div className="hata-mesaj-ara">
        {searchError && <p className="error-message">{searchError}</p>}
      </div>
    </div>
  );
}

export default SearchBar;
