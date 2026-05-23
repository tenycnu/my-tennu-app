import { useState, useEffect } from 'react';

function App() {
  // --- LOCALSTORAGE (HAFIZA) AYARI ---
  const [notlar, setNotlar] = useState(() => {
    const kaydedilenNotlar = localStorage.getItem('tennu_notlari');
    return kaydedilenNotlar ? JSON.parse(kaydedilenNotlar) : [];
  });

  // State Tanımlamaları
  const [inputMetni, setInputMetni] = useState('');
  const [kategori, setKategori] = useState('Genel'); 
  const [aramaMetni, setAramaMetni] = useState(''); 
  const [guncellenenId, setGuncellenenId] = useState(null);

  // Hafızaya Kaydetme
  useEffect(() => {
    localStorage.setItem('tennu_notlari', JSON.stringify(notlar));
  }, [notlar]);

  // --- EKLEME VE GÜNCELLEME İŞLEMİ ---
  const handleKaydet = (e) => {
    e.preventDefault();
    if (!inputMetni.trim()) return;

    if (guncellenenId !== null) {
      const yeniListe = notlar.map(not => {
        if (not.id === guncellenenId) {
          return { ...not, metin: inputMetni, kategori: kategori };
        }
        return not;
      });
      setNotlar(yeniListe);
      setGuncellenenId(null);
    } else {
      const yeniNot = {
        id: Date.now(),
        metin: inputMetni,
        kategori: kategori,
        tamamlandi: false 
      };
      setNotlar([...notlar, yeniNot]);
    }
    setInputMetni('');
    setKategori('Genel');
  };

  // --- DÜZENLEME MODU ---
  const handleDuzenleModu = (not) => {
    setInputMetni(not.metin);
    setKategori(not.kategori);
    setGuncellenenId(not.id);
  };

  // --- SİLME İŞLEMİ ---
  const handleSil = (id) => {
    const kalanNotlar = notlar.filter(not => not.id !== id);
    setNotlar(kalanNotlar);
  };

  // --- TAMAMLANDI İŞARETLEME İŞLEMİ ---
  const handleTamamla = (id) => {
    const guncelListe = notlar.map(not => {
      if (not.id === id) {
        return { ...not, tamamlandi: !not.tamamlandi };
      }
      return not;
    });
    setNotlar(guncelListe);
  };

  // --- FİLTRELEME VE ARAMA MANTIĞI ---
  const filtrelenmisNotlar = notlar.filter(not => 
    not.metin.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    not.kategori.toLowerCase().includes(aramaMetni.toLowerCase())
  );

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h2 className="text-center mb-4 text-primary fw-bold">My Tennu App</h2>
      
      {/* ARAMA ÇUBUĞU */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control border-primary"
          placeholder="🔍 Notlarda veya kategorilerde arayın..."
          value={aramaMetni}
          onChange={(e) => setAramaMetni(e.target.value)}
        />
      </div>

      {/* FORM: EKLEME ALANI */}
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
              <option value="Genel">Genel</option>
              <option value="İş / Okul">İş / Okul</option>
              <option value="Kişisel">Kişisel</option>
              <option value="Alışveriş">Alışveriş</option>
            </select>
          </div>
          <div className="col-md-2 d-grid">
            <button className={`btn ${guncellenenId !== null ? 'btn-warning' : 'btn-success'}`} type="submit">
              {guncellenenId !== null ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </div>
      </form>

      {/* LİSTELEME ALANI */}
      <ul className="list-group shadow-sm">
        {filtrelenmisNotlar.length === 0 ? (
          <li className="list-group-item text-muted text-center py-3">Aranan kriterde bir şey bulunamadı.</li>
        ) : (
          filtrelenmisNotlar.map((not) => (
            <li 
              key={not.id} 
              className={`list-group-item d-flex justify-content-between align-items-center ${not.tamamlandi ? 'bg-light text-decoration-line-through text-muted' : ''}`}
            >
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
          ))
        )}
      </ul>
    </div>
  );
}

export default App;