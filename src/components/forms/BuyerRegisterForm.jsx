import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BuyerRegisterForm({ mobile }) {
  const [form, setForm] = useState({ name: '', email: '', city: '', state: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8080/api/auth/register-buyer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber: mobile, ...form }),
    });

    if (res.ok) {
      const buyer = await res.json();
      localStorage.setItem('buyerUser', JSON.stringify(buyer));
      navigate('/buyer/dashboard');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gradient-to-b from-dark to-black text-lightGray flex items-center justify-center px-4">
      <div className="bg-darkAccent p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blueAccent mb-4 text-center">Become a Buyer</h2>
        <p className="text-grayBlue text-center mb-6">
          Sign up to explore a wide range of vehicles. Fill in your details below.
        </p>

        {['name', 'email', 'city', 'state'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none mb-4"
          />
        ))}

        <button
          className="w-full bg-blueAccent hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
}
