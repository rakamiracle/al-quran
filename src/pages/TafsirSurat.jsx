import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TafsirSurat = () => {
  const { id } = useParams();
  const [tafsir, setTafsir] = useState([]);
  const [suratInfo, setSuratInfo] = useState(null);
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
      if (data.code === 200 && data.data) {
        setTafsir(data.data.tafsir || []);
        setSuratInfo(data.data.surat || null);
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

  if (loading) return <div className="text-white text-center my-5">Memuat...</div>;
  if (error) return <div className="alert alert-danger my-3">{error}</div>;
  if (!tafsir.length) return <div className="text-white text-center my-5">Tafsir tidak ditemukan.</div>;

  return (
    <div className="container-fluid py-3">
      {suratInfo && (
        <div className="text-center mb-4">
          <h2 className="text-white">{suratInfo.namaLatin}</h2>
          <p className="text-white-50 mb-4">
            {suratInfo.nama} • {suratInfo.tempatTurun} • {suratInfo.jumlahAyat} Ayat
          </p>
        </div>
      )}

      <div className="row g-3">
        {tafsir.map((item) => (
          <div key={item.ayat} className="col-12">
            <div className="card bg-dark text-white border-secondary mb-2">
              <div className="card-header bg-dark bg-opacity-75">
                <h5 className="mb-0">Ayat {item.ayat}</h5>
              </div>
              <div className="card-body">
                <div className="text-white-50">
                  {item.teks.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-3">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TafsirSurat;