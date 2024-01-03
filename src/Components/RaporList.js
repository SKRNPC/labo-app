import RaporShow from "./RaporShow";
import { useContext, useEffect } from "react";
import FormsContext from "../context/Form";
import loadRapors from "../Components/Api/RaporListApi";
function RaporList() {
  const { raporlar, setRaporlar, searchedRapors, raporUpdated } =
    useContext(FormsContext);

  useEffect(() => {
    async function getRapors() {
      try {
        const response = await loadRapors();
        console.log(raporUpdated);
        setRaporlar(response.data);
      } catch (error) {
        console.error("Rapor loading failed:", error);
      }
    }
    getRapors();
  }, [raporUpdated]);
  return (
    <div className="rapor-list">
      {searchedRapors.length > 0
        ? searchedRapors.map((input, index) => (
            <RaporShow key={index} input={input} />
          ))
        : raporlar.content.map((input, index) => (
            <RaporShow key={index} input={input} />
          ))}
    </div>
  );
}

export default RaporList;
