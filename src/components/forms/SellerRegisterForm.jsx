import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellerRegisterForm({ mobile }) {
  const [form, setForm] = useState({ name: '', email: '', city: '', state: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber: mobile, ...form }),
    });
    if (res.ok) {
      navigate('/seller/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gradient-to-b from-dark to-black text-lightGray flex items-center justify-center px-4">
      <div className="bg-darkAccent p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blueAccent mb-4 text-center">Become a Seller</h2>
        <p className="text-grayBlue text-center mb-6">
          Join our trusted network of sellers. Provide your details to get started.
        </p>

        {['name', 'email', 'city', 'state'].map((field) => (
          <input
            key={field}
            type="text"
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none mb-4"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
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
