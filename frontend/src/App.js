import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Plants from './pages/Plants/Plants';
import PlantDetail from './pages/PlantDetail/PlantDetail';
import Accessories from './pages/Accessories/Accessories';
import Cart from './pages/Cart/Cart';
import MyOrders from './pages/MyOrders/MyOrders';
import Checkout from './pages/Checkout/Checkout';
import Notifications from './pages/Notifications/Notifications';
import Profile from './pages/Profile/Profile';
import CareGuide from './pages/CareGuide/CareGuide';
import ContactUs from './pages/ContactUs/ContactUs';
import Faqs from './pages/Faqs/Faqs';
import ShippingReturns from './pages/ShippingReturns/ShippingReturns';
import Settings from './pages/Settings/Settings';
import EditProfile from './pages/EditProfile/EditProfile';
import ChangePassword from './pages/ChangePassword/ChangePassword';

const AppContent = () => {
  const location = useLocation();
  const noFooterPaths = ['/contact-us', '/faqs', '/shipping-returns', '/settings'];
  const showFooter = !noFooterPaths.includes(location.pathname);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plants/:plantId" element={<PlantDetail />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/care-guide" element={<CareGuide />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Router basename="/Gardenia">
            <AppContent />
          </Router>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
