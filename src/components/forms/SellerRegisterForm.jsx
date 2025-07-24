import { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { State, City} from 'country-state-city';

export default function SellerRegisterForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = location.state?.mobile || '';
  const [form, setForm] = useState({ name: '', email: '', state: '', city: '',});

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const indiaStates = State.getStatesOfCountry('IN');
    setStates(indiaStates);
  }, []);

  useEffect(() => {
    if (form.state) {
      const selectedStateCities = City.getCitiesOfState('IN', form.state);
      setCities(selectedStateCities);
    } else {
      setCities([]);
    }
  }, [form.state]);  

  const handleRegister = async () => {
    const { name, email, state, city } = form;
     if (!name || !email || !state || !city) {
    alert('All fields are required');
    return; }
    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber: mobile,...form, }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('sellerUser', JSON.stringify(data));
      navigate('/seller/dashboard'); 
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gradient-to-b from-dark to-black text-lightGray flex items-center justify-center px-4">
      <div className="bg-darkAccent p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blueAccent mb-4 text-center">Become a Seller</h2>
        <p className="text-grayBlue text-center mb-6">
          Join our trusted network of sellers. Provide your details to get started.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 mb-4 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-4 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
        />
        
        <select
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value, city: '' })}
          className="w-full p-3 mb-4 rounded-md bg-darkGrey text-white focus:outline-none"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
        <select
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          disabled={!form.state}
          className="w-full p-3 mb-4 rounded-md bg-darkGrey text-white focus:outline-none"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <button
          className="w-full bg-blueAccent hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}