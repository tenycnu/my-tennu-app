import React from 'react';
import { DEFAULT_CATEGORIES } from '../interfaces/noteInterface';

function NoteForm({ inputMetni, setInputMetni, kategori, setKategori, handleKaydet, guncellenenId }) {
  return (
    <form onSubmit={handleKaydet} className="card p-3 shadow-sm mb-4 bg-light">
      <div className="row g-2">
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            placeholder="Yeni bir görev veya envanter maddesi..."
            value={inputMetni}
            onChange={(e) => setInputMetni(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select 
            className="form-select" 
            value={kategori} 
            onChange={(e) => setKategori(e.target.value)}
          >
            {DEFAULT_CATEGORIES.map((kat) => (
              <option key={kat} value={kat}>{kat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 d-grid">
          <button className={`btn ${guncellenenId !== null ? 'btn-warning' : 'btn-success'}`} type="submit">
            {guncellenenId !== null ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default NoteForm;