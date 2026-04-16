// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage'; 
import ShopPage from './pages/ShopPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Header />
        <CategoryNav />
        <main className="flex-grow pb-[70px] lg:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
