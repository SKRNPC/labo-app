import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import FormsContext from "../context/Form";
import Input from "./Input";
import { parseISO } from 'date-fns'; 

function RaporForm({ input, raporFormUpdate, onUpdate }) {
  const {
    laborants,
    succesMessageRapor,
    createRapor,
    apiProgressRapor,
    generalErrorRapor,
    errorsRapor,
    setErrorsRapor,
  } = useContext(FormsContext);

  const [dosyaNo, setDosyaNo] = useState(input ? input.dosyaNo : "");
  const [hastaIsim, setHastaIsim] = useState(input ? input.hastaIsim : "");
  const [hastaKimlik, setHastaKimlik] = useState(
    input ? input.hastaKimlik : ""
  );
  const [hastaTani, setHastaTani] = useState(input ? input.hastaTani : "");
  const [taniDetay, setTaniDetay] = useState(input ? input.taniDetay : "");
  const [selectedDate, setSelectedDate] = useState(
    input ? input.selectedDate : ""
  );
  const [selectedFile, setSelectedFile] = useState(
    input ? input.selectedFile : ""
  );
  const [selectedLaborant, setSelectedLaborant] = useState(
    input ? input.selectedLaborant : ""
  );
  const handleLaborantChange = (event) => {
    setSelectedLaborant(event.target.value);
  };
  useEffect(() => {
    setErrorsRapor(function (lastErrors) {
      return { ...lastErrors, hastaIsim: undefined };
    });
  }, [hastaIsim, setErrorsRapor]);

  const handleChange = (event) => {
    setDosyaNo(event.target.value);
  };
  const handleIsimChange = (event) => {
    setHastaIsim(event.target.value);
  };
  const handleHastaKimlikChange = (event) => {
    setHastaKimlik(event.target.value);
  };
  const handleTaniChange = (event) => {
    setHastaTani(event.target.value);
  };
  const handleTaniDetayChange = (event) => {
    setTaniDetay(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleFileChange = (event) => {
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const data = fileReader.result;
      setSelectedFile(data);
    };
    fileReader.readAsDataURL(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (raporFormUpdate) {
      onUpdate(
        input.id,
        selectedLaborant,
        dosyaNo,
        hastaIsim,
        hastaKimlik,
        hastaTani,
        taniDetay,
        selectedDate,
        selectedFile
      );
    } else {
      createRapor(
        selectedLaborant,
        dosyaNo,
        hastaIsim,
        hastaKimlik,
        hastaTani,
        taniDetay,
        selectedDate,
        selectedFile
      );
    }
    setSelectedLaborant("");
    setDosyaNo("");
    setHastaIsim("");
    setHastaKimlik("");
    setHastaTani("");
    setTaniDetay("");
    setSelectedDate("");
    setSelectedFile("");
  };

  return (
    <div>
      {raporFormUpdate ? (
        <div className="rapor-update">
          <h1 className="title-labo">Raporu Güncelle</h1>
          <form className="labForm">
            <label className="labo-label">Laborant Seç:</label>
            <select
              value={selectedLaborant}
              onChange={handleLaborantChange}
              className="labo-input"
            >
              <option value="" disabled>
                Laborant Seçiniz
              </option>
              {laborants.content.map((laborant) => (
                <option key={laborant.id} value={laborant.isim}>
                  {laborant.isim}
                </option>
              ))}
            </select>
            <Input
              ad={dosyaNo}
              label="Dosya Numarası"
              error={errorsRapor.dosyaNo}
              onChange={handleChange}
              turu="number"
            />
            <Input
              ad={hastaIsim}
              label="Ad Soyad"
              error={errorsRapor.hastaIsim}
              onChange={handleIsimChange}
              turu="text"
            />
            <Input
              ad={hastaKimlik}
              label="Hasta Kimlik No"
              error={errorsRapor.hastaKimlik}
              onChange={handleHastaKimlikChange}
              turu="number"
            />
            <Input
              ad={hastaTani}
              label="Koyulan Tanı Başlığı"
              error={errorsRapor.hastaTani}
              onChange={handleTaniChange}
              turu="text"
            />
            <label className="labo-label">Tanı Detayları</label>
            <textarea
              value={taniDetay}
              onChange={handleTaniDetayChange}
              cols="30"
              rows="5"
              className="labo-input"
            ></textarea>
            <label className="labo-label">Rapor Tarihi</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="labo-input"
            />
            <label className="labo-label">Rapor Fotoğrafı</label>
            <input
              onChange={handleFileChange}
              type="file"
              accept=".jpg, .jpeg, .png"
              className="labo-input"
            />
            {selectedFile && (
              <div>
                <img
                  src={selectedFile}
                  alt="Selected File"
                  className="input-file"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            )}
            <footer>
              <button
                className="labo-button update-button"
                onClick={handleSubmit}
              >
                Güncelle
              </button>
            </footer>
          </form>
        </div>
      ) : (
        <div className="laboCreate">
          <h1 className="title-labo">RAPOR EKLE</h1>
          <form className="labForm">
            <label className="labo-label">Laborant Seç:</label>
            <select
              value={selectedLaborant}
              onChange={handleLaborantChange}
              className="labo-input"
            >
              <option value="" disabled>
                Laborant Seçiniz
              </option>
              {laborants.content.map((laborant) => (
                <option key={laborant.id} value={laborant.isim}>
                  {laborant.isim}
                </option>
              ))}
            </select>
            <div className="hata-mesaj">{errorsRapor.selectedLaborant}</div>
            <Input
              ad={dosyaNo}
              label="Dosya Numarası"
              error={errorsRapor.dosyaNo}
              onChange={handleChange}
              turu="number"
            />
            <Input
              ad={hastaIsim}
              label="Ad Soyad"
              error={errorsRapor.hastaIsim}
              onChange={handleIsimChange}
              turu="text"
            />
            <Input
              ad={hastaKimlik}
              label="Hasta Kimlik No"
              error={errorsRapor.hastaKimlik}
              onChange={handleHastaKimlikChange}
              turu="number"
            />
            <Input
              ad={hastaTani}
              label="Koyulan Tanı Başlığı"
              error={errorsRapor.hastaTani}
              onChange={handleTaniChange}
              turu="text"
            />
            <label className="labo-label">Tanı Detayları</label>
            <textarea
              value={taniDetay}
              onChange={handleTaniDetayChange}
              cols="30"
              rows="5"
              className="labo-input"
            ></textarea>
            <label className="labo-label">Rapor Tarihi</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="labo-input"
            />
            <label className="labo-label">Rapor Fotoğrafı</label>
            <input
              onChange={handleFileChange}
              type="file"
              accept=".jpg, .jpeg, .png"
              className="labo-input"
            />
            {selectedFile && (
              <div>
                <img
                  src={selectedFile}
                  alt="Selected File"
                  className="input-file"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            )}
            <footer>
              {succesMessageRapor && (
                <div className="alert">
                  <strong>{succesMessageRapor}</strong>
                </div>
              )}{" "}
              {generalErrorRapor && (
                <div className="alert">
                  <strong>{generalErrorRapor}</strong>
                </div>
              )}
              <button
                disabled={apiProgressRapor}
                className="labo-button"
                onClick={handleSubmit}
              >
                {apiProgressRapor && <span className="spinner"></span>}
                Kaydet
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}

export default RaporForm;
