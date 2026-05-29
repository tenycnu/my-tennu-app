export const createNoteObject = (metin, kategori) => {
  return {
    id: Date.now(),
    metin: metin,
    kategori: kategori,
    tamamlandi: false
  };
};

export const DEFAULT_CATEGORIES = ["Genel", "İş / Okul", "Kişisel", "Alişveriş"];