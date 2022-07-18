import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  return (
    <div className="text-white flex flex-col justify-between min-h-screen">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":imdbID" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
