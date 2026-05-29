import React from 'react';

function SearchBox({ aramaMetni, setAramaMetni }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control border-primary"
        placeholder="🔍 Notlarda veya kategorilerde arayın..."
        value={aramaMetni}
        onChange={(e) => setAramaMetni(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;