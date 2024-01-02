import React, { useContext} from "react";
import RaporSirala from "./Api/RaporSiralaApi";
import FormsContext from "../context/Form";


function RaporSiralama() {
  const { setApiProgressRapor, updateSearchedRapors } = useContext(FormsContext);

  const tariheGoreSirala = async () => {
    setApiProgressRapor(true);
    try {
      const response = await RaporSirala(0, true);
      console.log("Sıralı raporlar: ", response.data.content);

      // Elde edilen sıralı raporları context'te güncelle
      updateSearchedRapors(response.data.content);
    } catch (error) {
      console.error("Sıralama hatası: ", error);
    } finally {
      setApiProgressRapor(false);
    }
  };

  return (
    <div className="rapor-sirala">
      <button className="button-sirala" onClick={tariheGoreSirala}>
        Tarihe Göre Sırala
      </button>
    </div>
  );
}

export default RaporSiralama;