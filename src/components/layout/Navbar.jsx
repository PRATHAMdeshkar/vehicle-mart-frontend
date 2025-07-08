import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark text-lightGray shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-blueAccent">
        Vehicle AutoConnect
      </div>
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-blueAccent font-medium">Home</Link>
        <Link to="/login-buyer" className="hover:text-blueAccent font-medium">Purchase</Link>
        <Link to="/login-seller" className="hover:text-blueAccent font-medium">Sell</Link>
      </div>
    </nav>
  );
}
