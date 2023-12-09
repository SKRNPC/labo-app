import { useEffect, useState } from "react";
import { useContext } from "react";
import FormsContext from "../context/Form";
import LaborantEkle from "./LaborantEkleApi";
import Input from "./Input";

function LaborantForm({ input, laborantFormUpdate, onUpdate }) {
  const {
    createLaborant,
    setErrors,
    errors,
    succesMessage,
    generalError,
    apiProgress,
  } = useContext(FormsContext);

  const [isim, setIsim] = useState(input ? input.isim : "");
  const [labKimlik, setLabKimlik] = useState(input ? input.labKimlik : "");

  useEffect(() => {
    setErrors(function (lastErrors) {
      return { ...lastErrors, isim: undefined };
    });
  }, [isim]);
  useEffect(() => {
    setErrors(function (lastErrors) {
      return { ...lastErrors, labKimlik: undefined };
    });
  }, [labKimlik]);

  const handleChange = (event) => {
    setIsim(event.target.value);
  };
  const handleKimlikChange = (event) => {
    setLabKimlik(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //  setSuccesMessage();
    //  setGeneralError();
    // setApiProgress(true);

    // try {
    //   const response = await LaborantEkle({
    //     isim,
    //     labKimlik,
    //   });
    //   setSuccesMessage(response.data.message);
    // } catch (axiosError) {
    //   if (
    //     axiosError.response?.data &&
    //     axiosError.response.data.status === 400
    //   ) {
    //     setErrors(axiosError.response.data.validationErrors);
    //   } else {
    //     setGeneralError("Unexpected error occured. Please Try Again!");
    //   }
    // } finally {
    //   setApiProgress(false);
    // }
    // .then((response) => {
    //   setSuccesMessage(response.data.message);
    // })
    // .finally(() => setApiProgress(false));

    if (laborantFormUpdate) {
      onUpdate(input.id, isim, labKimlik);
      // editInputById(input.id, isim, labKimlik)
    } else {
      // onCreate(isim, labKimlik);
      createLaborant(isim, labKimlik);
    }
    setIsim("");
    setLabKimlik("");
  };
  return (
    <div>
      {""}
      {laborantFormUpdate ? (
        <div className="labo-edit">
          <div className="labo-update">
            <h1 className="title-labo">Bilgileri Güncelle</h1>
            <form className="labForm">
              <label className="labo-label">Ad Soyad</label>
              <input
                value={isim}
                onChange={handleChange}
                type="text"
                className="labo-input"
              />
              <label className="labo-label">Hastane Kimlik No</label>
              <input
                value={labKimlik}
                onChange={handleKimlikChange}
                type="number"
                className="labo-input"
              />
              <footer>
                <button
                  onClick={handleSubmit}
                  className="labo-button update-button"
                >
                  Güncelle
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
