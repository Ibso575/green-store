// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage'; // ✅ yangi sahifa import

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Header />
        <CategoryNav />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> {/* ✅ checkout sahifa */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
