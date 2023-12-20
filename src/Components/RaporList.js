import RaporShow from "./RaporShow";
import { useContext, useEffect } from "react";
import FormsContext from "../context/Form";
import loadRapors from "./RaporListApi";
function RaporList() {
  const { raporlar, setRaporlar } = useContext(FormsContext);
  useEffect(() => {
    async function getRapors() {
      const response = await loadRapors();
      setRaporlar(response.data);
    }
    getRapors();
  }, []);
  return (
    <div className="rapor-list">
      {raporlar.map((input, index) => {
        return <RaporShow key={index} input={input} />;
      })}
    </div>
  );
}

export default RaporList;
