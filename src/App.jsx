import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Specialities from './pages/Specialities';
import Doctors from './pages/Doctors';
import Gallery from './pages/Gallery';
import Packages from './pages/Packages';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import Yuvanari from './pages/Yuvanari';
import SNGS from './pages/SNGS';
import InitiativeDetail from './pages/InitiativeDetail';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import { useEffect } from 'react';

// Scroll to top helper
function ScrollToTopWrapper() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTopWrapper />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/specialities" element={<Specialities />} />
            <Route path="/specialities/:slug" element={<Specialities />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/health-packages" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/yuvanari" element={<Yuvanari />} />
            <Route path="/salaam-namaste" element={<SNGS />} />
            <Route path="/initiatives/:slug" element={<InitiativeDetail />} />
            <Route path="/initiatives" element={<InitiativeDetail />} />

          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
