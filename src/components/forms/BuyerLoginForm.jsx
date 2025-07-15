import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyerRegisterForm from './BuyerRegisterForm';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export default function BuyerLoginForm() {
  const [mobile, setMobile] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const phoneNumber = parsePhoneNumberFromString(mobile, 'IN'); 

    if (!phoneNumber || !phoneNumber.isValid()) {
      setError('Please enter a valid Indian mobile number');
      return;
    }
    setError(''); 
    const formatted = phoneNumber.number; 
    const res = await fetch('http://localhost:8080/api/auth/check-buyer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber: mobile }),
    });

    const data = await res.json();

    if (data.exists) {
      const loginRes = await fetch('http://localhost:8080/api/auth/login-buyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: mobile }),
      });

      if (loginRes.ok) {
        const buyerData = await loginRes.json();
        localStorage.setItem('buyerUser', JSON.stringify(buyerData));
        navigate('/buyer/dashboard');
      } else {
        alert('Login failed. Please try again.');
      }
    } else {
      setShowRegister(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gradient-to-b from-dark to-black text-lightGray flex items-center justify-center px-4">
      {!showRegister ? (
      <div className="bg-darkAccent p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blueAccent mb-4 text-center">Looking to Buy?</h2>
        <p className="text-grayBlue text-center mb-6">
          Start your journey to owning a reliable second-hand vehicle. Enter your mobile number to continue.
        </p>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none mb-4"
          placeholder="Enter Mobile Number"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          className="w-full bg-blueAccent hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
          onClick={handleLogin}
        >
          Continue
        </button>
      </div>
      ) : (
        <BuyerRegisterForm mobile={mobile} />
      )}
    </div>
  );
}
