import { useEffect, useState } from "react";
import { useContext } from "react";
import FormsContext from "../context/Form";
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
    setLabKimlik(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (laborantFormUpdate) {
      onUpdate(input.id, isim, labKimlik);
    } else {
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
