import "./App.css";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailSurat from "./pages/DetailSurat";
import About from "./pages/About";
import TafsirSurat from "./pages/TafsirSurat";

function App() {
  return (
    <div className="container-fluid p-0 m-0" style={{ backgroundColor: "#000000", padding: 0, margin: 0 }}>
      <HashRouter>
        <div className="row g-0 min-vh-100">
          <div className="col-md-3 p-0">
            <Navbar />
          </div>
          <div className="col-md-9 p-0">
            <Content>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/surat/:id" element={<DetailSurat />} />
                <Route path="/about" element={<About />} />
                <Route path="/surat/:id/tafsir" element={<TafsirSurat />} />
                <Route path="*" element={<p className="text-white p-4">Halaman tidak ditemukan</p>} />
              </Routes>
            </Content>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;