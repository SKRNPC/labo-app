import { createContext } from "react";
import { useState } from "react";
import LaborantEkle from "../Components/LaborantEkleApi.js";
import LaborantGuncelle from "../Components/LaborantGuncelleApi.js";
import LaborantSil from "../Components/LaborantSilApi.js";

const FormsContext = createContext();

function Provider({ children }) {
  const [laborants, setLaborants] = useState({
    content: [],
    last: "false",
    first: "false",
    number: 0,
  });

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
      const createdLaborant = {
        id: response.data.id, // Backend'den dönen ID'yi kullanın
        isim,
        labKimlik,
      };

      setLaborants((prevLaborants) => {
        return {
          ...prevLaborants,
          content: [...prevLaborants.content, createdLaborant],
        };
      });
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

  const deleteLaborantById = async (id) => {
    setApiProgress(true);
    try {
      // Make the API call to delete the laborant on the backend
      await LaborantSil(id);

      // If the backend delete is successful, update the local state
      setLaborants((prevLaborants) => {
        const afterDeletingInputs = prevLaborants.content.filter(
          (input) => input.id !== id
        );

        return {
          ...prevLaborants,
          content: afterDeletingInputs,
        };
      });

      setSuccesMessage("Laborant silme başarılı");
    } catch (axiosError) {
      setGeneralError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin!");
    } finally {
      setApiProgress(false);
    }
  };

  const editInputById = async (id, updatedIsim, updatedKimlik) => {
    setApiProgress(true);
    setErrors({});
    setGeneralError();

    try {
      // Make the API call to update the laborant on the backend
      await LaborantGuncelle(id, {
        isim: updatedIsim,
        labKimlik: updatedKimlik,
      });

      // If the backend update is successful, update the local state
      setLaborants((prevLaborants) => {
        const updatedInputs = prevLaborants.content.map((input) => {
          if (input.id === id) {
            return {
              id,
              isim: updatedIsim,
              labKimlik: updatedKimlik,
            };
          }
          return input;
        });

        return {
          ...prevLaborants,
          content: updatedInputs,
        };
      });

      setSuccesMessage("Laborant güncelleme başarılı");
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
    setErrors,
  };

  return (
    <FormsContext.Provider value={sharedValueAndMethods}>
      {children}
    </FormsContext.Provider>
  );
}

export { Provider };
export default FormsContext;
