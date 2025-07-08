import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
<div className="min-h-[calc(100vh-4rem)] w-full pt-16 bg-gradient-to-b from-dark to-black text-lightGray flex flex-col justify-center items-center px-6 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blueAccent mb-6">
          Welcome to <span className="text-white">AutoConnect</span>
        </h1>
        <p className="text-lg md:text-xl text-grayBlue leading-relaxed mb-10">
          Discover a smarter way to buy and sell second-hand vehicles. Our trusted platform connects verified buyers and sellers to ensure secure transactions.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/login-buyer")}
            className="bg-blueAccent hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            I'm Looking to Buy
          </button>
          <button
            onClick={() => navigate("/login-seller")}
            className="bg-mediumDark hover:bg-darkAccent text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            I Want to Sell
          </button>
        </div>
      </section>

      <hr className="my-12 border-gray-700 w-1/2" />

      <section className="grid md:grid-cols-3 gap-8 max-w-6xl text-center">
        <div className="bg-darkAccent p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-blueAccent mb-3">Verified Listings</h3>
          <p className="text-grayBlue">All sellers are verified to ensure transparency and reduce scams.</p>
        </div>
        <div className="bg-darkAccent p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-blueAccent mb-3">Secure Payments</h3>
          <p className="text-grayBlue">Safe and secure payment gateways for peace of mind.</p>
        </div>
        <div className="bg-darkAccent p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-blueAccent mb-3">Fast Support</h3>
          <p className="text-grayBlue">Get assistance when you need it through our 24/7 support team.</p>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
