import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VehicleUploadForm() {
  const navigate = useNavigate();
  const seller = JSON.parse(localStorage.getItem('sellerUser'));

  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    fuelType: '',
    transmissionType: '',
    vehicleType: '',
    mileage: '',
    numberOfOwners: '',
    price:'',
  });

 const brandModelMap = {
  Honda: ['City', 'Civic', 'Amaze', 'Activa', 'Shine', 'Hornet', 'CBR 250R', 'Dio', 'CB200X'],
  Toyota: ['Innova', 'Fortuner', 'Glanza', 'Etios', 'Urban Cruiser', 'Hilux', 'Camry', 'Rumion'],
  Maruti: ['Swift', 'Baleno', 'WagonR', 'Alto', 'Dzire', 'Celerio', 'Brezza', 'Ertiga', 'Fronx', 'Jimny', 'Grand Vitara'],
  Tata: ['Nexon', 'Harrier', 'Altroz', 'Tiago', 'Tigor', 'Punch', 'Safari', 'Hexa', 'Zest'],
  Mahindra: ['Scorpio', 'XUV500', 'Thar', 'Bolero', 'XUV700', 'Marazzo', 'KUV100', 'TUV300'],
  Hyundai: ['i20', 'Creta', 'Venue', 'Verna', 'i10', 'Aura', 'Tucson', 'Exter', 'Alcazar', 'Grand i10 Nios'],
  Bajaj: ['Pulsar', 'Dominar', 'Avenger', 'Platina', 'CT 100', 'Chetak EV', 'Discover'],
  TVS: ['Apache RTR', 'Jupiter', 'Ntorq', 'XL100', 'Star City', 'Raider', 'Ronin', 'Scooty Pep+', 'Sport'],
  RoyalEnfield: ['Classic 350', 'Bullet 350', 'Hunter 350', 'Meteor 350', 'Himalayan', 'Interceptor 650', 'Continental GT 650'],
  Hero: ['Splendor Plus', 'HF Deluxe', 'Passion Pro', 'Glamour', 'Xpulse 200', 'Maestro Edge', 'Pleasure+', 'Destini 125'],
  Suzuki: ['Access 125', 'Gixxer', 'Burgman Street', 'Hayate', 'Intruder', 'V-Strom SX', 'Avenis', 'Gixxer SF'],
  Kia: ['Seltos', 'Sonet', 'Carens', 'EV6', 'Carnival'],
  Renault: ['Kwid', 'Triber', 'Kiger', 'Duster'],
  Skoda: ['Rapid', 'Slavia', 'Kushaq', 'Octavia', 'Superb', 'Kodiaq'],
  Volkswagen: ['Polo', 'Virtus', 'Taigun', 'Vento', 'Tiguan'],
  Yamaha: ['FZ', 'R15', 'MT-15', 'Fascino', 'Ray ZR', 'Aerox 155', 'FZ-X'],
  MG: ['Hector', 'Astor', 'ZS EV', 'Gloster', 'Comet EV'],
  Jeep: ['Compass', 'Meridian', 'Wrangler', 'Grand Cherokee'],
  Nissan: ['Magnite', 'Kicks', 'Terrano'],
  Lexus: ['RX', 'NX', 'ES', 'LX'],
  Force: ['Gurkha', 'Trax Cruiser'],
  Isuzu: ['D-Max V-Cross', 'MU-X'],
};


  const years = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => 1990 + i);
  const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Ethanol'];
  const transmissionTypes = ['Manual', 'Automatic'];
  const vehicleTypes = ['2 Wheeler', '3 Wheeler', '4 Wheeler', 'Truck'];

  const handleChange = (e) => {
    const {name,value} = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { brand, model, year, fuelType, transmissionType,vehicleType,numberOfOwners,price} = form;

    if (!brand || !model || !year || !fuelType ||  !transmissionType || !vehicleType || !numberOfOwners || !price) {
    alert('All fields are required');
    return; }

    const formattedForm = {
      ...form,
      price: parseFloat(parseFloat(form.price).toFixed(2)),
      sellerId: seller.id,
    };

    const res = await fetch('http://localhost:8080/api/vehicle/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedForm),
    });

    if (res.ok) {
      alert("Vehicle uploaded successfully");
      navigate("/seller/dashboard");
    } else {
      alert("Failed to upload vehicle");
    }
  };

  const currentModels = brandModelMap[form.brand] || [];

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gradient-to-b from-dark to-black text-lightGray flex items-center justify-center px-4">
      <div className="bg-darkAccent p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blueAccent mb-4 text-center">
          Upload Vehicle Details
        </h2>
        <p className="text-grayBlue text-center mb-6">
          Enter the vehicle details below to list it.
        </p>

        <div className="grid grid-cols-1 gap-4">
          
          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
          >
            <option value="">Select Brand</option>
            {Object.keys(brandModelMap).map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          
          <select
            name="model"
            value={form.model}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
            disabled={!form.brand}
          >
            <option value="">Select Model</option>
            {currentModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>

          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
          >
            <option value="">Select Fuel Type</option>
            {fuelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            name="transmissionType"
            value={form.transmissionType}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
          >
            <option value="">Select Transmission</option>
            {transmissionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
          >
            <option value="">Select Vehicle Type</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="mileage"
            placeholder="Mileage (km)"
            value={form.mileage}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
          />

          <input
            type="number"
            name="numberOfOwners"
            placeholder="No. of Previous Owners"
            value={form.numberOfOwners}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            onBlur={(e) => {
              const value = parseFloat(e.target.value || 0).toFixed(2);
              setForm({ ...form, price: value });
            }}
            className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <button
          className="w-full bg-blueAccent hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg mt-6"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
