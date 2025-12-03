import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import { SEOHead } from './components/seo';
import {
  HomeSkeleton,
  ProductsSkeleton,
  ProductDetailSkeleton,
  AboutSkeleton,
  CertificationsSkeleton,
  ContactSkeleton,
} from './components/skeleton';
import './App.css';

// Lazy load pages for code splitting and better performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Products = lazy(() => import('./pages/Products').then(module => ({ default: module.Products })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Certifications = lazy(() => import('./pages/Certifications').then(module => ({ default: module.Certifications })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));

function App() {
  // Get base path from Vite's environment variable
  // This matches the base path configured in vite.config.ts
  // Remove trailing slash and use empty string for root deployment
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '';
  
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter basename={basename}>
          <SEOHead />
          <MainLayout>
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<HomeSkeleton />}>
                  <Home />
                </Suspense>
              } />
              <Route path="/products" element={
                <Suspense fallback={<ProductsSkeleton />}>
                  <Products />
                </Suspense>
              } />
              <Route path="/products/:id" element={
                <Suspense fallback={<ProductDetailSkeleton />}>
                  <ProductDetail />
                </Suspense>
              } />
              <Route path="/about" element={
                <Suspense fallback={<AboutSkeleton />}>
                  <About />
                </Suspense>
              } />
              <Route path="/certifications" element={
                <Suspense fallback={<CertificationsSkeleton />}>
                  <Certifications />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<ContactSkeleton />}>
                  <Contact />
                </Suspense>
              } />
              {/* Catch all route */}
              <Route path="*" element={
                <Suspense fallback={<HomeSkeleton />}>
                  <Home />
                </Suspense>
              } />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
