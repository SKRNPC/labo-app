import { useEffect, useState } from "react";
import { useContext } from "react";
import FormsContext from "../context/Form";
import Input from "./Input";

function LaborantForm({
  input,
  laborantFormUpdate,
  onUpdate,
  onDelete,
  onClose,
}) {
  const {
    createLaborant,
    setErrors,
    errors,
    succesMessage,
    setGeneralError,
    generalError,
    apiProgress,
    errorsLaborantUpdate,
    succesMessageUpdate,
    setSuccesMessageUpdate,
    setErrorsLaborantUpdate,
    setLaborantUpdated
  } = useContext(FormsContext);

  const [isim, setIsim] = useState(input ? input.isim : "");
  const [labKimlik, setLabKimlik] = useState(input ? input.labKimlik : "");
  // console.log("aasd",input)
  useEffect(() => {
    setErrors(function (lastErrors) {
      return { ...lastErrors, isim: undefined };
    });
  }, [isim, setErrors]);
  useEffect(() => {
    setErrors(function (lastErrors) {
      return { ...lastErrors, labKimlik: undefined };
    });
  }, [labKimlik, setErrors]);

  const handleChange = (event) => {
    setIsim(event.target.value);
  };
  const handleKimlikChange = (event) => {
    const value = event.target.value;
    const field = "labKimlik";
    let maxChar = 7; // Hastane Kimlik No için maksimum karakter sayısı

    if (value.length > maxChar) {
      if (!laborantFormUpdate) {
        setErrors((lastErrors) => ({
          ...lastErrors,
          [field]: `${maxChar} karakter olmalıdır.`,
        }));
      }
    } else {
      setLabKimlik(value);

      if (!laborantFormUpdate) {
        setErrorsLaborantUpdate((lastErrors) => ({
          ...lastErrors,
          [field]: undefined,
        }));
      }
    }
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    onDelete(input.id);
    setLaborantUpdated(false)
  };

  const clearMessages = () => {
    // Bu fonksiyon succesMessage ve generalError state'lerini sıfırlar
    setSuccesMessageUpdate(""); // succesMessage'ı sıfırlayın
    setGeneralError("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (laborantFormUpdate) {
      console.log("input.id", input.id, input.isim);

      onUpdate(input.id, isim, labKimlik);
      setLaborantUpdated(false)
    } else {
      createLaborant(isim, labKimlik);
      setIsim("");
      setLabKimlik("");
    }
  };
  return (
    <div>
      {""}
      {laborantFormUpdate ? (
        <div className="labo-edit">
          <div className="labo-update">
            <h1 className="title-labo">Bilgileri Güncelle</h1>
            <span className="close-icon" onClick={clearMessages}>
              x
            </span>
            <form className="labForm">
              <Input
                ad={isim}
                label="Ad Soyad"
                // error={errorsLaborantUpdate.isim}
                onChange={handleChange}
                turu="text"
              />
              <Input
                ad={labKimlik}
                label="Hastane Kimlik No"
                error={errorsLaborantUpdate.labKimlik}
                onChange={handleKimlikChange}
                turu="number"
                disabled={true}
                maxLenght={7}
              />
              <footer>
                {succesMessageUpdate && (
                  <div className="alert">
                    <strong>{succesMessageUpdate}</strong>
                  </div>
                )}
                {generalError && (
                  <div className="alert">
                    <strong>{generalError}</strong>
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  className="labo-button update-button"
                >
                  Güncelle
                </button>
                <button className="button-sil" onClick={handleDeleteClick}>
                  Sil
                </button>
              </footer>
            </form>
          </div>
        </div>
      ) : (
        <div className="laboCreate">
          <h1 className="title-labo">LABORANT EKLE</h1>
          <form className="labForm">
            <Input
              ad={isim}
              label="Ad Soyad"
              error={errors.isim}
              onChange={handleChange}
              turu="text"
            />
            <Input
              ad={labKimlik}
              label="Hastane Kimlik No"
              error={errors.labKimlik}
              onChange={handleKimlikChange}
              turu="number"
            />
            <footer>
              {succesMessage && (
                <div className="alert">
                  <strong>{succesMessage}</strong>
                </div>
              )}
              {generalError && (
                <div className="alert">
                  <strong>{generalError}</strong>
                </div>
              )}
              <button
                disabled={apiProgress}
                onClick={handleSubmit}
                className="labo-button"
              >
                {apiProgress && <span className="spinner"></span>}
                Kaydet
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}

export default LaborantForm;
