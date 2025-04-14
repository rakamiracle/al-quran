import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import AudioPlayer from "../components/AudioPlayer";

const DetailSurat = () => {
  const { id } = useParams();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  console.log("ID dari useParams:", id);

  const getDetailSurat = async (idSurat) => {
    if (!idSurat || isNaN(idSurat)) {
      setError("ID surat tidak valid");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://equran.id/api/v2/surat/${idSurat}`);
      if (!response.ok) {
        throw new Error(`Gagal mengambil data surat: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Data detail surat dari API:", data);
      if (data.code === 200 && data.data) {
        setSurat(data.data);
      } else {
        throw new Error("Data surat tidak ditemukan");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailSurat(id);
    } else {
      setError("ID surat tidak ditemukan");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className="text-white">Memuat...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;
  if (!surat) return <p className="text-white">Surat tidak ditemukan.</p>;

  return (
    <div className="h-100 overflow-auto">
      <h2 className="text-white mb-4">
        {surat.namaLatin} ({surat.nama})
      </h2>
      <div className="card bg-dark text-white border-secondary mb-4">
        <div className="card-body">
          <p className="card-text">Jumlah Ayat: {surat.jumlahAyat}</p>
          <p className="card-text">Arti: {surat.arti}</p>
          <p className="card-text">Deskripsi: {parse(surat.deskripsi)}</p>
          <div className="mb-3">
            <h5 className="text-white mb-2">Murotal Surat</h5>
            <AudioPlayer
              url={surat.audioFull["05"]}
              currentAudio={currentAudio}
              setCurrentAudio={setCurrentAudio}
            />
          </div>
          <a href={`#/surat/${id}/tafsir`} className="btn btn-primary btn-sm">
            Lihat Tafsir
          </a>
        </div>
      </div>
      <div className="row g-3">
        {surat.ayat && surat.ayat.length > 0 ? (
          surat.ayat.map((ayat) => (
            <div key={ayat.nomorAyat} className="col-12">
              <div className="card bg-dark text-white border-secondary">
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div>
                    <span className="arabic-text">{ayat.teksArab}</span>
                    <p className="card-text mb-0">Terjemahan: {ayat.teksIndonesia}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary rounded-pill me-2 p-2">
                      {ayat.nomorAyat}
                    </span>
                    <AudioPlayer
                      url={ayat.audio["05"]}
                      currentAudio={currentAudio}
                      setCurrentAudio={setCurrentAudio}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">Ayat tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default DetailSurat;