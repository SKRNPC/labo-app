import { createContext } from "react";
import { useState } from "react";

const FormsContext = createContext();

function Provider({ children }) {
  const [laborants, setLaborants] = useState([]);
  const createLaborant = (isim, labKimlik) => {
    const createdLaborants = [
      ...laborants,
      {
        id: Math.round(Math.random() * 999999),
        isim,
        labKimlik,
      },
    ];
    setLaborants(createdLaborants);
  };
  const deleteLaborantById = (id) => {
    const afterDeletingInputs = laborants.filter((input) => {
      return input.id !== id;
    });
    setLaborants(afterDeletingInputs);
  };
  const editInputById = (id, updatedIsim, updatedKimlik) => {
    const updatedInputs = laborants.map((input) => {
      if (input.id === id) {
        return {
          id,
          isim: updatedIsim,
          labKimlik: updatedKimlik,
        };
      }
      return input;
    });
    setLaborants(updatedInputs);
  };
  const [raporlar, setRaporlar] = useState([]);
  const createRapor = (
    selectedLaborant,
    dosyaNo,
    hastaIsim,
    hastaKimlik,
    hastaTani,
    taniDetay,
    selectedDate,
    selectedFile
  ) => {
    const createdRaporlar = [
      ...raporlar,
      {
        id: Math.round(Math.random() * 999999),
        selectedLaborant,
        dosyaNo,
        hastaIsim,
        hastaKimlik,
        hastaTani,
        taniDetay,
        selectedDate,
        selectedFile,
      },
    ];
    setRaporlar(createdRaporlar);
  };
  const deleteRaporById = (id) => {
    const afterDeletingInputs = raporlar.filter((input) => {
      return input.id !== id;
    });
    setRaporlar(afterDeletingInputs);
  };
  const editRaporById = (
    id,
    updatedSelectedLaborant,
    updatedDosyaNo,
    updatedHastaIsim,
    updatedHastaKimlik,
    updatedHastaTani,
    updatedTaniDetay,
    updatedSelectedDate,
    updatedSelectedFile
  ) => {
    const updatedInputs = raporlar.map((input) => {
      if (input.id === id) {
        return {
          id,
          selectedLaborant: updatedSelectedLaborant,
          dosyaNo: updatedDosyaNo,
          hastaIsim: updatedHastaIsim,
          hastaKimlik: updatedHastaKimlik,
          hastaTani: updatedHastaTani,
          taniDetay: updatedTaniDetay,
          selectedDate: updatedSelectedDate,
          selectedFile: updatedSelectedFile,
        };
      }
      return input;
    });
    setRaporlar(updatedInputs);
  };
  const sharedValueAndMethods = {
    laborants,
    createLaborant,
    deleteLaborantById,
    editInputById,
    raporlar,
    createRapor,
    deleteRaporById,
    editRaporById,
  };

  return (
    <FormsContext.Provider value={sharedValueAndMethods}>
      {children}
    </FormsContext.Provider>
  );
}

export { Provider };
export default FormsContext;
