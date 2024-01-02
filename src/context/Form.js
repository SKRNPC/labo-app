import { createContext } from "react";
import { useState } from "react";
import LaborantEkle from "../Components/Api/LaborantEkleApi.js";
import LaborantGuncelle from "../Components/Api/LaborantGuncelleApi.js";
import LaborantSil from "../Components/Api/LaborantSilApi.js";
import RaporEkle from "../Components/Api/RaporEkleApi.js";
import RaporGuncelle from "../Components/Api/RaporGuncelleApi.js";
import RaporSil from "../Components/Api/RaporSilApi.js";
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
  const [succesMessageUpdate, setSuccesMessageUpdate] = useState();
  const [succesMessageRapor, setSuccesMessageRapor] = useState();
  const [succesMessageRaporUpdate, setSuccesMessageRaporUpdate] = useState();
  const [errors, setErrors] = useState({});
  const [errorsLaborantUpdate, setErrorsLaborantUpdate] = useState({});
  const [errorsRapor, setErrorsRapor] = useState({});
  const [errorsRaporUpdate, setErrorsRaporUpdate] = useState({});
  const [generalError, setGeneralError] = useState();
  const [generalErrorRapor, setGeneralErrorRapor] = useState();
  const [apiProgressRapor, setApiProgressRapor] = useState(false);
  const [searchedLaborants, setSearchedLaborants] = useState([]);
  const [searchedRapors, setSearchedRapors] = useState([]);
  const [laborantUpdated, setLaborantUpdated] = useState(false);
  const [raporUpdated, setRaporUpdated] = useState(false);
  

  const updateSearchedLaborants = (searchResults) => {
    setSearchedLaborants(searchResults);
  };
  const updateSearchedRapors = (searchResults) => {
    setSearchedRapors(searchResults);
  };

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
        id: response.data.id,
        // Backend'den dönen ID'yi kullanın
        isim,
        labKimlik,
      };
      console.log("API Response id:", response.data.id);

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
      //Arama sonucunda bulunan laborantın silie işlemi
      setSearchedLaborants((prevSearchedLaborants) => {
        const updatedSearchedLaborants = prevSearchedLaborants.filter(
          (input) => input.id !== id
        );
        return updatedSearchedLaborants;
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
    setErrorsLaborantUpdate({});
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
      //arama sonucu bulunan laborantların güncelleme işlemi
      setSearchedLaborants((prevSearchedLaborants) => {
        const updatedSearchedLaborants = prevSearchedLaborants.map((input) => {
          if (input.id === id) {
            return {
              ...input, // Spread the existing properties
              isim: updatedIsim,
              labKimlik: updatedKimlik,
            };
          }
          return input;
        });
        return updatedSearchedLaborants;
      });

      setSuccesMessageUpdate("Laborant güncelleme başarılı");
    } catch (axiosError) {
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrorsLaborantUpdate(axiosError.response.data.validationErrors);
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
  const deleteRaporById = async (id) => {
    setApiProgressRapor(true);
    try {
      // Make the API call to delete the laborant on the backend
      await RaporSil(id);

      // If the backend delete is successful, update the local state
      setRaporlar((prevRaporlar) => {
        const afterDeletingInputs = prevRaporlar.content.filter(
          (input) => input.id !== id
        );

        return {
          ...prevRaporlar,
          content: afterDeletingInputs,
        };
      });

      //Update the state for searched reports if you have a separate state for it
      setSearchedRapors((prevSearchedRapors) => {
        const updatedSearchedRapors = prevSearchedRapors.filter(
          (input) => input.id !== id
        );
        return updatedSearchedRapors;
      });

      setSuccesMessageRapor("Rapor silme başarılı");
    } catch (axiosError) {
      setGeneralErrorRapor(
        "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin!"
      );
    } finally {
      setApiProgressRapor(false);
    }
  };
  const editRaporById = async (
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
    setSuccesMessageRapor();
    setGeneralErrorRapor();
    setApiProgressRapor(true);
    try {
      await RaporGuncelle(id, {
        selectedLaborant: updatedSelectedLaborant,
        dosyaNo: updatedDosyaNo,
        hastaIsim: updatedHastaIsim,
        hastaKimlik: updatedHastaKimlik,
        hastaTani: updatedHastaTani,
        taniDetay: updatedTaniDetay,
        selectedDate: updatedSelectedDate.toISOString(),
        selectedFile: updatedSelectedFile,
      });
      // If the backend update is successful, update the local state
      setRaporlar((prevRaporlar) => {
        const updatedInputs = prevRaporlar.content.map((input) => {
          if (input.id === id) {
            return {
              id,
              selectedLaborant: updatedSelectedLaborant,
              dosyaNo: updatedDosyaNo,
              hastaIsim: updatedHastaIsim,
              hastaKimlik: updatedHastaKimlik,
              hastaTani: updatedHastaTani,
              taniDetay: updatedTaniDetay,
              selectedDate: updatedSelectedDate.toISOString(),
              selectedFile: updatedSelectedFile,
            };
          }
          return input;
        });
        return {
          ...prevRaporlar,
          content: updatedInputs,
        };
      });

      // Update the state for searched reports if you have a separate state for it
      setSearchedRapors((prevSearchedRapors) => {
        const updatedSearchedRapors = prevSearchedRapors.map((input) => {
          if (input.id === id) {
            return {
              ...input, // Spread the existing properties
              selectedLaborant: updatedSelectedLaborant,
              dosyaNo: updatedDosyaNo,
              hastaIsim: updatedHastaIsim,
              hastaKimlik: updatedHastaKimlik,
              hastaTani: updatedHastaTani,
              taniDetay: updatedTaniDetay,
              selectedDate: updatedSelectedDate.toISOString(),
              selectedFile: updatedSelectedFile, // Spread the updated fields
            };
          }
          return input;
        });
        return updatedSearchedRapors;
      });
      setSuccesMessageRaporUpdate("Rapor güncelleme başarılı");
    } catch (axiosError) {
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrorsRaporUpdate(axiosError.response.data.validationErrors);
      } else {
        setGeneralErrorRapor(
          "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin!"
        );
      }
    } finally {
      setApiProgressRapor(false);
    }
  };
  const sharedValueAndMethods = {
    laborants,
    setLaborants,
    createLaborant,
    deleteLaborantById,
    editInputById,
    raporlar,
    setRaporlar,
    createRapor,
    deleteRaporById,
    editRaporById,
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
    errorsRaporUpdate,
    setErrorsRaporUpdate,
    searchedLaborants,
    setSearchedLaborants,
    updateSearchedLaborants,
    searchedRapors,
    setSearchedRapors,
    updateSearchedRapors,
    errorsLaborantUpdate,
    setErrorsLaborantUpdate,
    laborantUpdated,
    setLaborantUpdated,
    raporUpdated,
    setRaporUpdated,
    succesMessageUpdate,
    setSuccesMessageUpdate,
    succesMessageRaporUpdate,
    setSuccesMessageRaporUpdate,
  };

  return (
    <FormsContext.Provider value={sharedValueAndMethods}>
      {children}
    </FormsContext.Provider>
  );
}

export { Provider };
export default FormsContext;
