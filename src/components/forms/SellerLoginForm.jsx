import { useState } from 'react';
import SellerRegisterForm from './SellerRegisterForm';
import { useNavigate } from 'react-router-dom';

export default function SellerLoginPage() {
  const [mobile, setMobile] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
  const res = await fetch('http://localhost:8080/api/auth/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobileNumber: mobile }),
  });
  const data = await res.json();

  if (data.exists) {
    const loginRes = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber: mobile }),
    });

    if (loginRes.ok) {
      const sellerData = await loginRes.json();

      localStorage.setItem('sellerUser', JSON.stringify(sellerData));

      navigate('/seller/dashboard');
    } else {
      alert("Login failed. Please try again.");
    }
  } else {
    setShowRegister(true);
  }
};


  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gradient-to-b from-dark to-black text-lightGray flex items-center justify-center px-4">
      {!showRegister ? (
        <div className="bg-darkAccent p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-blueAccent mb-4 text-center">Sell Your Used Vehicle</h2>
          <p className="text-grayBlue text-center mb-6">
            Ready to connect with potential buyers? Enter your mobile number to begin the selling process.
          </p>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none mb-4"
            placeholder="Enter Mobile Number"
          />
          <button
            className="w-full bg-blueAccent hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
            onClick={handleLogin}
          >
            Continue
          </button>
        </div>
      ) : (
        <SellerRegisterForm mobile={mobile} />
      )}
    </div>
  );
}
