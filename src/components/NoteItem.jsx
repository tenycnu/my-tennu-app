import React from 'react';

function NoteItem({ not, handleTamamla, handleDuzenleModu, handleSil }) {
  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${not.tamamlandi ? 'bg-light text-decoration-line-through text-muted' : ''}`}>
      <div className="d-flex align-items-center text-break me-3">
        <input 
          type="checkbox" 
          className="form-check-input me-3" 
          checked={not.tamamlandi}
          onChange={() => handleTamamla(not.id)}
        />
        <div>
          <div>{not.metin}</div>
          <span className="badge rounded-pill bg-secondary" style={{ fontSize: '10px' }}>{not.kategori}</span>
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <button 
          onClick={() => handleDuzenleModu(not)} 
          className="btn btn-sm btn-outline-warning me-2"
          disabled={not.tamamlandi}
        >
          Düzenle
        </button>
        <button 
          onClick={() => handleSil(not.id)} 
          className="btn btn-sm btn-outline-danger"
        >
          Sil
        </button>
      </div>
    </li>
  );
}

export default NoteItem;