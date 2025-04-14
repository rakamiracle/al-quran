import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TafsirSurat = () => {
  const { id } = useParams();
  const [tafsir, setTafsir] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTafsir = async (idSurat) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://equran.id/api/v2/tafsir/${idSurat}`);
      if (!response.ok) {
        throw new Error(`Gagal mengambil data tafsir: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Data tafsir dari API:", data);
      if (data.code === 200 && data.data && data.data.tafsir) {
        setTafsir(data.data.tafsir);
      } else {
        throw new Error("Data tafsir tidak ditemukan");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tafsir:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getTafsir(id);
    } else {
      setError("ID surat tidak ditemukan");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="text-white">Memuat...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;
  if (!tafsir.length) return <p className="text-white">Tafsir tidak ditemukan.</p>;

  return (
    <div className="h-100 overflow-auto">
      <h2 className="text-white mb-4">Tafsir Surat</h2>
      <div className="row g-3">
        {tafsir.map((item, index) => (
          <div key={index} className="col-12">
            <div className="card bg-dark text-white border-secondary">
              <div className="card-body">
                <h5 className="card-title text-white">Ayat {item.ayat}</h5>
                <p className="card-text">{item.teks}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TafsirSurat;