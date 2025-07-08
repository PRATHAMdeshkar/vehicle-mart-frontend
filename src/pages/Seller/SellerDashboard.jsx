import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellerDashboard() {
  const [seller, setSeller] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('sellerUser'));
    if (stored) {
      setSeller(stored);
      fetchVehicles(stored.id);
    } else {
      setLoading(false);
    }
  }, []);

const fetchVehicles = async (sellerId) => {
  try {
    const res = await fetch(`http://localhost:8080/api/vehicle/seller/${sellerId}`);
    const data = await res.json();
    setVehicles(data);
    if (data.length > 0 && !seller) {
     setSeller(data[0].seller); 
  }
  } catch (err) {
    console.error('Error fetching vehicles:', err);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#212A31] text-white">Loading seller info...</div>;
  }

   return (
    <div className="min-h-screen bg-[#212A31] pt-16 p-6 bg-gradient-to-b from-dark to-black text-[#D3D9D4]">
      <div className="max-w-6xl  mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#124E66] mb-6">
          Welcome, {seller?.name || "Seller"}
        </h1>

        <div className="bg-[#2E3944] p-6 rounded-xl shadow-md mb-8 ">
          <p className="text-lg mb-2">👤 <strong>Name:</strong> {seller?.name}</p>
          <p className="text-lg mb-4">📱 <strong>Mobile:</strong> {seller?.mobileNumber}</p>
          <button
            onClick={() => navigate('/seller/upload-vehicle')}
            className="bg-[#124E66] hover:bg-[#0f3e52] text-white font-semibold py-2 px-6 rounded-lg transition">
            Upload New Vehicle
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("sellerUser");
              navigate("/login-seller");
            }}
            className="bg-red-600 hover:bg-red-700 float-right text-white font-semibold py-2 px-6 rounded-lg transition">
            LOGOUT
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-[#D3D9D4] mb-4">Your Uploaded Vehicles</h2>

        {vehicles.length === 0 ? (
          <div className="text-center text-[#748D92] text-md bg-[#2E3944] p-6 rounded-md shadow">
            No vehicles uploaded yet. Click the button above to get started.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v, i) => (
              <div
                key={i}
                className="bg-[#2E3944] rounded-lg p-4 shadow-md text-[#D3D9D4] hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-[#124E66] mb-2">{v.brand} {v.model}</h3>
                <h2>card start from here</h2>
                <p>📅 Year: {v.year}</p>
                <p>⛽ Fuel: {v.fuelType}</p>
                <p>⚙️ Transmission: {v.transmissionType}</p>
                <p>🚘 Type: {v.vehicleType}</p>
                <p>📏 Mileage: {v.mileage} km</p>
                <p>👥 Owners: {v.numberOfOwners}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}