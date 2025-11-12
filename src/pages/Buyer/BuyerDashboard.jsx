import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BuyerDashboard() {
  const [buyer, setBuyer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [visibleSellers, setVisibleSellers] = useState(new Set());
  const [contactCount, setContactCount] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('buyerUser'));
    if (savedUser) {
      setBuyer(savedUser);
    }

    fetch('http://localhost:8080/api/vehicle/all')
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error('Failed to fetch vehicles:', err));
  }, []);

  const revealSeller = (vehicleId) => {
    if (!visibleSellers.has(vehicleId)) {
      if (contactCount === 0) {
        const updated = new Set(visibleSellers);
        updated.add(vehicleId);
        setVisibleSellers(updated);
        setContactCount(1);
      } else {
        alert('Need to subscribe to get more contact');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#212A31] bg-gradient-to-b from-dark to-black pt-16 p-6 px-6 text-[#D3D9D4]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#124E66] mb-6">
          Welcome, {buyer?.name || 'Buyer'}
        </h1>

        {buyer && (
          <div className="bg-[#2E3944] p-6 rounded-xl shadow-md mb-10">
            <p className="text-lg mb-2">
              👤 <strong>Name:</strong> {buyer.name}
            </p>
            <p className="text-lg">
              📱 <strong>Mobile:</strong> {buyer.mobileNumber}
            </p>
            <div className="flex justify-end">
           <button
              onClick={() => {
                localStorage.removeItem("buyerUser"); 
                navigate("/login-buyer");            
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              LOGOUT
            </button>
          </div>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4 text-[#D3D9D4]">Available Vehicles</h2>

        {vehicles.length === 0 ? (
          <div className="text-center text-[#748D92] text-md bg-[#2E3944] p-6 rounded-md shadow">
            No vehicles available right now.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="bg-[#2E3944] rounded-lg p-5 shadow-md text-[#D3D9D4] hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {v.brand} {v.model}
                </h3>
                <p>📅 Year: {v.year}</p>
                <p>⛽ Fuel: {v.fuelType}</p>
                <p>⚙️ Transmission: {v.transmissionType}</p>
                <p>🚘 Type: {v.vehicleType}</p>
                <p>📏 Mileage: {v.mileage} km</p>
                <p>👥 Owners: {v.numberOfOwners}</p>
                <p className="text-lg mt-2 font-semibold">💸 {v.price} INR</p>

                {visibleSellers.has(v.id) ? (
                  <div className="mt-4 p-3 rounded bg-[#1C1F24] text-[#BFD7EA]">
                    <p>👤 Seller: {v.seller.name}</p>
                    <p>📱 Contact: {v.seller.mobileNumber}</p>
                  </div>
                ) : (
                  <button
                    className="mt-4 bg-[#124E66] hover:bg-[#0f3e52] text-white py-2 px-4 rounded transition"
                    onClick={() => revealSeller(v.id)}
                  >
                    Contact Owner
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
