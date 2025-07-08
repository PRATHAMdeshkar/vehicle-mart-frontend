import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginBuyer from './components/forms/BuyerLoginForm';
import LoginSeller from './components/forms/SellerLoginForm';
import SellerDashboard from './pages/Seller/SellerDashboard';
import BuyerDashboard from './pages/Buyer/BuyerDashboard';
import VehicleUploadForm from './components/forms/VehicleUploadForm';
import Layout from './components/layout/Layout';
import './index.css';
import BuyerRegisterForm from './components/forms/BuyerRegisterForm';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login-buyer" element={<LoginBuyer />} />
          <Route path="login-seller" element={<LoginSeller />} />
          <Route path="login-seller" element={<LoginSeller />} />
          <Route path='buyer/dashboard' element={<BuyerDashboard />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/upload-vehicle" element={<VehicleUploadForm />} />
          <Route path="buyer/register-buyer" element={< BuyerRegisterForm/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
