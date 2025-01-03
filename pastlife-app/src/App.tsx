import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Landing from "./pages/landing"
import Home from "./pages/home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
      
  )
}

export default App
