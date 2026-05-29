import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import { createNoteObject } from '../interfaces/noteInterface';

function Home() {
  const [notlar, setNotlar] = useState(() => {
    const kaydedilenNotlar = localStorage.getItem('tennu_notlari');
    return kaydedilenNotlar ? JSON.parse(kaydedilenNotlar) : [];
  });

  const [inputMetni, setInputMetni] = useState('');
  const [kategori, setKategori] = useState('Genel'); 
  const [aramaMetni, setAramaMetni] = useState(''); 
  const [guncellenenId, setGuncellenenId] = useState(null);

  useEffect(() => {
    localStorage.setItem('tennu_notlari', JSON.stringify(notlar));
  }, [notlar]);

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
      const yeniNot = createNoteObject(inputMetni, kategori);
      setNotlar([...notlar, yeniNot]);
    }
    setInputMetni('');
    setKategori('Genel');
  };

  const handleDuzenleModu = (not) => {
    setInputMetni(not.metin);
    setKategori(not.kategori);
    setGuncellenenId(not.id);
  };

  const handleSil = (id) => {
    setNotlar(notlar.filter(not => not.id !== id));
  };

  const handleTamamla = (id) => {
    setNotlar(notlar.map(not => not.id === id ? { ...not, tamamlandi: !not.tamamlandi } : not));
  };

  const filtrelenmisNotlar = notlar.filter(not => 
    not.metin.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    not.kategori.toLowerCase().includes(aramaMetni.toLowerCase())
  );

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h2 className="text-center mb-4 text-primary fw-bold">My Tennu App</h2>
      
      <SearchBox aramaMetni={aramaMetni} setAramaMetni={setAramaMetni} />

      <NoteForm 
        inputMetni={inputMetni} setInputMetni={setInputMetni}
        kategori={kategori} setKategori={setKategori}
        handleKaydet={handleKaydet} guncellenenId={guncellenenId}
      />

      <ul className="list-group shadow-sm">
        {filtrelenmisNotlar.length === 0 ? (
          <li className="list-group-item text-muted text-center py-3">Aranan kriterde bir şey bulunamadı.</li>
        ) : (
          filtrelenmisNotlar.map((not) => (
            <NoteItem 
              key={not.id}
              not={not}
              handleTamamla={handleTamamla}
              handleDuzenleModu={handleDuzenleModu}
              handleSil={handleSil}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;