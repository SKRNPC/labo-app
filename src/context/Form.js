import { createContext } from "react";
import { useState } from "react";
import LaborantEkle from "../Components/LaborantEkleApi.js";

const FormsContext = createContext();

function Provider({ children }) {
  const [laborants, setLaborants] = useState([]);
  const [apiProgress, setApiProgress] = useState(false);
  const [succesMessage, setSuccesMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const createLaborant = async (isim, labKimlik) => {
    setSuccesMessage();
    setGeneralError();
    setApiProgress(true);
  
    try {
      const response = await LaborantEkle({
        isim,
        labKimlik,
      });
      setSuccesMessage(response.data.message);
  
      // Sadece backend doğrulaması başarılıysa yeni laborantı listeye ekle
      const createdLaborants = [
        ...laborants,
        {
          id: response.data.id, // Backend'den dönen ID'yi kullanın
          isim,
          labKimlik,
        },
      ];
      setLaborants(createdLaborants);
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
    setLaborants,
    createLaborant,
    deleteLaborantById,
    editInputById,
    raporlar,
    createRapor,
    deleteRaporById,
    editRaporById,
    succesMessage,
    setSuccesMessage,
    apiProgress,
    setApiProgress,
    generalError,
    setGeneralError,
    errors,
    setErrors
  };

  return (
    <FormsContext.Provider value={sharedValueAndMethods}>
      {children}
    </FormsContext.Provider>
  );
}

export { Provider };
export default FormsContext;
