import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import FormsContext from "../context/Form";
import Input from "./Input";
import Modal from "./ImageModal";

function RaporForm({ input, raporFormUpdate, onUpdate, onDelete, onClose }) {
  const {
    laborants,
    succesMessageRapor,
    createRapor,
    apiProgressRapor,
    generalErrorRapor,
    errorsRapor,
    setErrorsRapor,
    errorsRaporUpdate,
    setErrorsRaporUpdate,
    succesMessageRaporUpdate,
    setSuccesMessageRaporUpdate,
    setRaporUpdated
  } = useContext(FormsContext);

  const [dosyaNo, setDosyaNo] = useState(input ? input.dosyaNo : "");
  const [hastaIsim, setHastaIsim] = useState(input ? input.hastaIsim : "");
  const [hastaKimlik, setHastaKimlik] = useState(
    input ? input.hastaKimlik : ""
  );
  const [hastaTani, setHastaTani] = useState(input ? input.hastaTani : "");
  const [taniDetay, setTaniDetay] = useState(input ? input.taniDetay : "");
  const [selectedDate, setSelectedDate] = useState(
    input ? new Date(input.selectedDate) : null
  );
  const [selectedFile, setSelectedFile] = useState(
    input ? input.selectedFile : ""
  );
  const [selectedLaborant, setSelectedLaborant] = useState(
    input ? input.selectedLaborant : ""
  );


  const handleInputChange = (field, value) => {
    let maxChar;

    // Determine the maximum character limit for the current field
    if (field === "dosyaNo") {
      maxChar = 5;
    } else if (field === "hastaKimlik") {
      maxChar = 11;
    }

    // Check for specific input validations
    if (value.length > maxChar) {
      // Handle error for exceeding length
      if (raporFormUpdate) {
        setErrorsRaporUpdate((lastErrors) => ({
          ...lastErrors,
          [field]: `${maxChar} karakter olmalıdır.`,
        }));
      } else {
        setErrorsRapor((lastErrors) => ({
          ...lastErrors,
          [field]: `${maxChar} karakter olmalıdır.`,
        }));
      }
      return; // Prevent further processing
    }

    // Clear related error on input change
    if (raporFormUpdate) {
      setErrorsRaporUpdate((lastErrors) => ({ ...lastErrors, [field]: undefined }));
    } else {
      setErrorsRapor((lastErrors) => ({ ...lastErrors, [field]: undefined }));
    }

    // Update the state for the specific field
    switch (field) {
      case "dosyaNo":
        setDosyaNo(value);
        break;
      case "hastaIsim":
        setHastaIsim(value);
        break;
      case "hastaKimlik":
        setHastaKimlik(value);
        break;
      case "hastaTani":
        setHastaTani(value);
        break;
      case "taniDetay":
        setTaniDetay(value);
        break;
      default:
        break;
    }
  };

  const handleLaborantChange = (event) => {
    const value = event.target.value;
    setSelectedLaborant(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date || new Date());
  };

  const handleFileChange = (event) => {
    if (event.target.files.length < 1) return;

    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setSelectedFile(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    onDelete(input.id);
    setRaporUpdated(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (raporFormUpdate) {
      setRaporUpdated(false)
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
  
      // Reset form fields after submission
      setDosyaNo("");
      setHastaIsim("");
      setHastaKimlik("");
      setHastaTani("");
      setTaniDetay("");
      setSelectedDate(null);
      setSelectedFile("");
      setSelectedLaborant("");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState("");

  const openModal = (image) => {
    setLargeImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const clearMessages = () => {
    setSuccesMessageRaporUpdate("");
    onClose();
  };

  return (
    <div>
      {raporFormUpdate ? (
        <div className="rapor-update">
          <h1 className="title-labo">Raporu Güncelle</h1>
          <span className="close-icon-rapor" onClick={clearMessages}>
            x
          </span>
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
              {laborants.content.map((laborant, index) => (
                <option key={index} value={laborant.isim}>
                  {laborant.isim}
                </option>
              ))}
            </select>
            <Input
              ad={dosyaNo}
              label="Dosya Numarası"
              error={errorsRaporUpdate.dosyaNo}
              onChange={(e) => handleInputChange("dosyaNo", e.target.value)}
              turu="number"
            />
            <Input
              ad={hastaIsim}
              label="Ad Soyad"
              error={errorsRaporUpdate.hastaIsim}
              onChange={(e) => handleInputChange("hastaIsim", e.target.value)}
              turu="text"
            />
            <Input
              ad={hastaKimlik}
              label="Hasta Kimlik No"
              error={errorsRaporUpdate.hastaKimlik}
              onChange={(e) => handleInputChange("hastaKimlik", e.target.value)}
              turu="number"
              disabled={true}
            />
            <Input
              ad={hastaTani}
              label="Koyulan Tanı Başlığı"
              error={errorsRaporUpdate.hastaTani}
              onChange={(e) => handleInputChange("hastaTani", e.target.value)}
              turu="text"
            />
            <label className="labo-label">Tanı Detayları</label>
            <textarea
              value={taniDetay}
              onChange={(e) => handleInputChange("taniDetay", e.target.value)}
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
            <div className="hata-mesaj">{errorsRapor.DatePicker}</div>
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
              {succesMessageRaporUpdate && (
                <div className="alert">
                  <strong>{succesMessageRaporUpdate}</strong>
                </div>
              )}{" "}
              {generalErrorRapor && (
                <div className="alert">
                  <strong>{generalErrorRapor}</strong>
                </div>
              )}
              <button className="labo-button update-button" onClick={handleSubmit}>
                Güncelle
              </button>
              <button className="button-sil" onClick={handleDeleteClick}>
                Sil
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
              {laborants.content.map((laborant, index) => (
                <option key={index} value={laborant.isim}>
                  {laborant.isim}
                </option>
              ))}
            </select>
            <div className="hata-mesaj">{errorsRapor.selectedLaborant}</div>
            <Input
              ad={dosyaNo}
              label="Dosya Numarası"
              error={errorsRapor.dosyaNo}
              onChange={(e) => handleInputChange("dosyaNo", e.target.value)}
              turu="number"
            />
            <Input
              ad={hastaIsim}
              label="Ad Soyad"
              error={errorsRapor.hastaIsim}
              onChange={(e) => handleInputChange("hastaIsim", e.target.value)}
              turu="text"
            />
            <Input
              ad={hastaKimlik}
              label="Hasta Kimlik No"
              error={errorsRapor.hastaKimlik}
              onChange={(e) => handleInputChange("hastaKimlik", e.target.value)}
              turu="number"
            />
            <Input
              ad={hastaTani}
              label="Koyulan Tanı Başlığı"
              error={errorsRapor.hastaTani}
              onChange={(e) => handleInputChange("hastaTani", e.target.value)}
              turu="text"
            />
            <label className="labo-label">Tanı Detayları</label>
            <textarea
              value={taniDetay}
              onChange={(e) => handleInputChange("taniDetay", e.target.value)}
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
            <div className="hata-mesaj">{errorsRapor.selectedDate}</div>
            <label className="labo-label">Rapor Fotoğrafı</label>
            <input
              onChange={handleFileChange}
              type="file"
              accept=".jpg, .jpeg, .png"
              className="labo-input"
            />

            {isModalOpen && (
              <Modal image={largeImage} closeModal={closeModal} />
            )}
            {selectedFile && (
              <div onClick={() => openModal(selectedFile)}>
                <img
                  src={selectedFile}
                  alt="Selected File"
                  className="input-file"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            )}
            <div className="hata-mesaj">{errorsRapor.selectedFile}</div>
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
