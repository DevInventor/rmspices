import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Certifications } from './pages/Certifications';
import { Contact } from './pages/Contact';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import './App.css';

function App() {
  // Use basename for GitHub Pages production deployment
  const basename = import.meta.env.PROD ? '/rmspices' : '/';
  
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter basename={basename}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/contact" element={<Contact />} />
              {/* Catch all route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
