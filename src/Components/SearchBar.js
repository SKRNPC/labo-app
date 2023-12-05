import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Arama işlemlerini gerçekleştirin ve onSearch fonksiyonunu çağırın
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="labo-button search-button" onClick={handleSearch}>Ara</button>
    </div>
  );
}

export default SearchBar;
