// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function VehicleUploadForm() {
//   const navigate = useNavigate();
//   const seller = JSON.parse(localStorage.getItem('sellerUser'));

//   const [form, setForm] = useState({
//     brand: '',
//     model: '',
//     year: '',
//     fuelType: '',
//     transmissionType: '',
//     vehicleType: '',
//     mileage: '',
//     numberOfOwners: '',
//   });

//   const brandModelMap = {
//     Honda: ['City', 'Civic', 'Amaze'],
//     Toyota: ['Innova', 'Fortuner', 'Glanza'],
//     Maruti: ['Swift', 'Baleno', 'WagonR'],
//     Tata: ['Nexon', 'Harrier', 'Altroz'],
//   };

//   const years = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => 1990 + i);
//   const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Ethanol'];
//   const transmissionTypes = ['Manual', 'Automatic'];
//   const vehicleTypes = ['2 Wheeler', '3 Wheeler', '4 Wheeler', 'Truck'];

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch('http://localhost:8080/api/vehicle/upload', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...form, sellerId: seller.id }),
//     });

//     if (res.ok) {
//       alert("Vehicle uploaded successfully");
//       navigate("/seller/dashboard");
//     } else {
//       alert("Failed to upload vehicle");
//     }
//   };

//   const currentModels = brandModelMap[form.brand] || [];

//   return (
//     <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gradient-to-b from-dark to-black text-lightGray flex items-center justify-center px-4">
//       <div className="bg-darkAccent p-8 rounded-2xl shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-blueAccent mb-4 text-center">
//           Upload Vehicle Details
//         </h2>
//         <p className="text-grayBlue text-center mb-6">
//           Enter the vehicle details below to list it.
//         </p>

//         <div className="grid grid-cols-1 gap-4">
//           {/* Brand */}
//           <select
//             name="brand"
//             value={form.brand}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
//           >
//             <option value="">Select Brand</option>
//             {Object.keys(brandModelMap).map((brand) => (
//               <option key={brand} value={brand}>
//                 {brand}
//               </option>
//             ))}
//           </select>

//           {/* Model */}
//           <select
//             name="model"
//             value={form.model}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
//             disabled={!form.brand}
//           >
//             <option value="">Select Model</option>
//             {currentModels.map((model) => (
//               <option key={model} value={model}>
//                 {model}
//               </option>
//             ))}
//           </select>

//           {/* Year */}
//           <select
//             name="year"
//             value={form.year}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
//           >
//             <option value="">Select Year</option>
//             {years.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>

//           {/* Fuel Type */}
//           <select
//             name="fuelType"
//             value={form.fuelType}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
//           >
//             <option value="">Select Fuel Type</option>
//             {fuelTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>

//           {/* Transmission Type */}
//           <select
//             name="transmissionType"
//             value={form.transmissionType}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
//           >
//             <option value="">Select Transmission</option>
//             {transmissionTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>

//           {/* Vehicle Type */}
//           <select
//             name="vehicleType"
//             value={form.vehicleType}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
//           >
//             <option value="">Select Vehicle Type</option>
//             {vehicleTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>

//           {/* Mileage */}
//           <input
//             type="number"
//             name="mileage"
//             placeholder="Mileage (km)"
//             value={form.mileage}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
//           />

//           {/* Number of Owners */}
//           <input
//             type="number"
//             name="numberOfOwners"
//             placeholder="No. of Previous Owners"
//             value={form.numberOfOwners}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-darkGrey text-white placeholder:text-gray-400 focus:outline-none"
//           />
//         </div>

//         <button
//           className="w-full bg-blueAccent hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg mt-6"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
