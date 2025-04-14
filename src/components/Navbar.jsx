import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [surat, setSurat] = useState([]);
  const [error, setError] = useState(null);

  const getDataFromAPI = async () => {
    try {
      const response = await fetch("https://equran.id/api/v2/surat");
      if (!response.ok) {
        throw new Error("Gagal mengambil daftar surat");
      }
      const data = await response.json();
      console.log("Data surat dari API:", data);
      if (data.code === 200 && data.data) {
        setSurat(data.data);
      } else {
        throw new Error("Data surat tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  if (error) return <p className="text-white p-4">Error: {error}</p>;

  return (
    <div className="bg-dark text-white h-100 p-3 overflow-auto">
      <h5 className="text-center mb-4">Qur'an Web</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link">
            <i className="bi bi-house-door me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#submenu1"
            role="button"
            aria-expanded="false"
            aria-controls="submenu1"
          >
            <i className="bi bi-folder me-2"></i> Surat
          </a>
          <div className="collapse show" id="submenu1">
            <ul className="nav flex-column ms-3">
              {surat.length > 0 ? (
                surat.map((surah) => (
                  <li key={surah.nomor} className="nav-item">
                    <Link to={`/surat/${surah.nomor}`} className="nav-link">
                      <i className="bi bi-flower3 me-2"></i> {surah.nomor}. {surah.namaLatin}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="nav-item">
                  <p className="text-white">Memuat surat...</p>
                </li>
              )}
            </ul>
          </div>
        </li>
        <li className="nav-item mb-2">
          <Link to="/about" className="nav-link">
            <i className="bi bi-info-circle me-2"></i> About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;