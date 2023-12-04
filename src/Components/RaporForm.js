import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RaporForm({ onCreateHasta }) {
  const [dosyaNo, setDosyaNo] = useState("");
  const [hastaIsim, setHastaIsim] = useState("");
  const [hastaKimlik, setHastaKimlik] = useState("");
  const [hastaTani, setHastaTani] = useState("");
  const [TaniDetay, setTaniDetay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

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
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateHasta(
      dosyaNo,
      hastaIsim,
      hastaKimlik,
      hastaTani,
      TaniDetay,
      selectedDate,
      selectedFile
    );
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
      <div className="laboCreate">
        <h1 className="title-labo">RAPOR EKLE</h1>
        <form className="labForm">
          <label className="labo-label">Dosya Numarası</label>
          <input
            value={dosyaNo}
            onChange={handleChange}
            type="number"
            className="labo-input"
          />
          <label className="labo-label">Ad Soyad</label>
          <input
            value={hastaIsim}
            onChange={handleIsimChange}
            type="text"
            className="labo-input"
          />
          <label className="labo-label">Hasta Kimlik No</label>
          <input
            value={hastaKimlik}
            onChange={handleHastaKimlikChange}
            type="number"
            className="labo-input"
          />
          <label className="labo-label">Koyulan Tanı Başlığı</label>
          <input
            value={hastaTani}
            onChange={handleTaniChange}
            type="text"
            className="labo-input"
          />
          <label className="labo-label">Tanı Detayları</label>
          <textarea
            value={TaniDetay}
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
                src={URL.createObjectURL(selectedFile)}
                alt="Selected File"
                className="input-file"
              />
            </div>
          )}
          <footer>
            <button className="labo-button" onClick={handleSubmit}>
              Kaydet
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default RaporForm;
