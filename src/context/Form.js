import { createContext } from "react";
import { useState } from "react";
import LaborantEkle from "../Components/LaborantEkleApi.js";
import LaborantGuncelle from "../Components/LaborantGuncelleApi.js";
import LaborantSil from "../Components/LaborantSilApi.js";
import RaporEkle from "../Components/RaporEkleApi.js";

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
  const [succesMessageRapor, setSuccesMessageRapor] = useState();
  const [errors, setErrors] = useState({});
  const [errorsRapor, setErrorsRapor] = useState({});
  const [generalError, setGeneralError] = useState();
  const [generalErrorRapor, setGeneralErrorRapor] = useState();
  const [apiProgressRapor, setApiProgressRapor] = useState(false);

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
  const [raporlar, setRaporlar] = useState({
    content: [],
    last: false,
    first: false,
    number: 0,
  });
  const createRapor = async (
    selectedLaborant,
    dosyaNo,
    hastaIsim,
    hastaKimlik,
    hastaTani,
    taniDetay,
    selectedDate,
    selectedFile
  ) => {
    setSuccesMessageRapor();
    setGeneralErrorRapor();
    setApiProgressRapor(true);

    try {
      const response = await RaporEkle({
        selectedLaborant,
        dosyaNo,
        hastaIsim,
        hastaKimlik,
        hastaTani,
        taniDetay,
        selectedDate,
        selectedFile,
      });
      setSuccesMessageRapor(response.data.message);
      // Sadece backend doğrulaması başarılıysa yeni laborantı listeye ekle
      const createdRaporlar = {
        id: response.data.id, // Backend'den dönen ID'yi kullanın
        selectedLaborant,
        dosyaNo,
        hastaIsim,
        hastaKimlik,
        hastaTani,
        taniDetay,
        selectedDate,
        selectedFile,
      };
      setRaporlar((prevRaporlar) => {
        return {
          ...prevRaporlar,
          content: [...prevRaporlar.content, createdRaporlar],
        };
      });
    } catch (axiosError) {
      if (
        
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrorsRapor(axiosError.response.data.validationErrors);
      } else {
        setGeneralErrorRapor(
          "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin!"
        );
      }
    } finally {
      setApiProgressRapor(false);
    }
  };
  // const deleteRaporById = (id) => {
  //   const afterDeletingInputs = raporlar.filter((input) => {
  //     return input.id !== id;
  //   });
  //   setRaporlar(afterDeletingInputs);
  // };
  // const editRaporById = (
  //   id,
  //   updatedSelectedLaborant,
  //   updatedDosyaNo,
  //   updatedHastaIsim,
  //   updatedHastaKimlik,
  //   updatedHastaTani,
  //   updatedTaniDetay,
  //   updatedSelectedDate,
  //   updatedSelectedFile
  // ) => {
  //   const updatedInputs = raporlar.map((input) => {
  //     if (input.id === id) {
  //       return {
  //         id,
  //         selectedLaborant: updatedSelectedLaborant,
  //         dosyaNo: updatedDosyaNo,
  //         hastaIsim: updatedHastaIsim,
  //         hastaKimlik: updatedHastaKimlik,
  //         hastaTani: updatedHastaTani,
  //         taniDetay: updatedTaniDetay,
  //         selectedDate: updatedSelectedDate,
  //         selectedFile: updatedSelectedFile,
  //       };
  //     }
  //     return input;
  //   });
  //   setRaporlar(updatedInputs);
  // };
  const sharedValueAndMethods = {
    laborants,
    setLaborants,
    createLaborant,
    deleteLaborantById,
    editInputById,
    raporlar,
    setRaporlar,
    createRapor,
    // deleteRaporById,
    // editRaporById,
    succesMessage,
    setSuccesMessage,
    apiProgress,
    setApiProgress,
    generalError,
    setGeneralError,
    generalErrorRapor,
    errors,
    errorsRapor,
    setErrorsRapor,
    setErrors,
    apiProgressRapor,
    setApiProgressRapor,
    succesMessageRapor,
    setSuccesMessageRapor,
  };

  return (
    <FormsContext.Provider value={sharedValueAndMethods}>
      {children}
    </FormsContext.Provider>
  );
}

export { Provider };
export default FormsContext;
