import {useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import FormsContext from "../context/Form";
import Input from "./Input";
import Modal from "./ImageModal";

function RaporForm({ input, raporFormUpdate, onUpdate, onDelete }) {
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
  } = useContext(FormsContext);

  const [formState, setFormState] = useState({
    dosyaNo: input ? input.dosyaNo : "",
    hastaIsim: input ? input.hastaIsim : "",
    hastaKimlik: input ? input.hastaKimlik : "",
    hastaTani: input ? input.hastaTani : "",
    taniDetay: input ? input.taniDetay : "",
    selectedDate: input ? new Date(input.selectedDate) : null,
    selectedFile: input ? input.selectedFile : "",
    selectedLaborant: input ? input.selectedLaborant : "",
  });

  const handleInputChange = (field, value) => {
    let maxChar ;
  
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
  
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  
    // Clear related error on input change
    if (raporFormUpdate) {
      setErrorsRaporUpdate((lastErrors) => ({ ...lastErrors, [field]: undefined }));
    } else {
      setErrorsRapor((lastErrors) => ({ ...lastErrors, [field]: undefined }));
    }
  };
  

  const handleLaborantChange = (event) => {
    handleInputChange("selectedLaborant", event.target.value);
  };

  const handleDateChange = (date) => {
    handleInputChange("selectedDate", date || new Date());
  };

  const handleFileChange = (event) => {
    if (event.target.files.length < 1) return;

    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      handleInputChange("selectedFile", fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };
  const handleDeleteClick =  async (event)=> {
    event.preventDefault();
      onDelete(input.id)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      selectedLaborant,
      dosyaNo,
      hastaIsim,
      hastaKimlik,
      hastaTani,
      taniDetay,
      selectedDate,
      selectedFile,
    } = formState;

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

    // Clear form inputs after submission
    setFormState({
      dosyaNo: "",
      hastaIsim: "",
      hastaKimlik: "",
      hastaTani: "",
      taniDetay: "",
      selectedDate: null,
      selectedFile: "",
      selectedLaborant: "",
    });
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

  return (
    <div>
      {raporFormUpdate ? (
        <div className="rapor-update">
          <h1 className="title-labo">Raporu Güncelle</h1>
          <form className="labForm">
            <label className="labo-label">Laborant Seç:</label>
            <select
              value={formState.selectedLaborant}
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
              ad={formState.dosyaNo}
              label="Dosya Numarası"
              error={errorsRaporUpdate.dosyaNo}
              onChange={(e) => handleInputChange("dosyaNo", e.target.value)}
              turu="number"
            />
            <Input
              ad={formState.hastaIsim}
              label="Ad Soyad"
              error={errorsRaporUpdate.hastaIsim}
              onChange={(e) => handleInputChange("hastaIsim", e.target.value)}
              turu="text"
            />
            <Input
              ad={formState.hastaKimlik}
              label="Hasta Kimlik No"
              error={errorsRaporUpdate.hastaKimlik}
              onChange={(e) => handleInputChange("hastaKimlik", e.target.value)}
              turu="number"
            />
            <Input
              ad={formState.hastaTani}
              label="Koyulan Tanı Başlığı"
              error={errorsRaporUpdate.hastaTani}
              onChange={(e) => handleInputChange("hastaTani", e.target.value)}
              turu="text"
            />
            <label className="labo-label">Tanı Detayları</label>
            <textarea
              value={formState.taniDetay}
              onChange={(e) => handleInputChange("taniDetay", e.target.value)}
              cols="30"
              rows="5"
              className="labo-input"
            ></textarea>
            <label className="labo-label">Rapor Tarihi</label>
            <DatePicker
              selected={formState.selectedDate}
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
            {formState.selectedFile && (
              <div>
                <img
                  src={formState.selectedFile}
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
              value={formState.selectedLaborant}
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
              ad={formState.dosyaNo}
              label="Dosya Numarası"
              error={errorsRapor.dosyaNo}
              onChange={(e) => handleInputChange("dosyaNo", e.target.value)}
              turu="number"
            />
            <Input
              ad={formState.hastaIsim}
              label="Ad Soyad"
              error={errorsRapor.hastaIsim}
              onChange={(e) => handleInputChange("hastaIsim", e.target.value)}
              turu="text"
            />
            <Input
              ad={formState.hastaKimlik}
              label="Hasta Kimlik No"
              error={errorsRapor.hastaKimlik}
              onChange={(e) => handleInputChange("hastaKimlik", e.target.value)}
              turu="number"
            />
            <Input
              ad={formState.hastaTani}
              label="Koyulan Tanı Başlığı"
              error={errorsRapor.hastaTani}
              onChange={(e) => handleInputChange("hastaTani", e.target.value)}
              turu="text"
            />
            <label className="labo-label">Tanı Detayları</label>
            <textarea
              value={formState.taniDetay}
              onChange={(e) => handleInputChange("taniDetay", e.target.value)}
              cols="30"
              rows="5"
              className="labo-input"
            ></textarea>
            <label className="labo-label">Rapor Tarihi</label>
            <DatePicker
              selected={formState.selectedDate}
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
            {formState.selectedFile && (
              <div onClick={() => openModal(formState.selectedFile)}>
                <img
                  src={formState.selectedFile}
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
