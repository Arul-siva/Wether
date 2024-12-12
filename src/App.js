import './App.css';
import Wether from'../src/components/Wether';
import { Routes,Route } from 'react-router-dom';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Wether/>} />
    </Routes>
    </>
  );
}

export default App;
