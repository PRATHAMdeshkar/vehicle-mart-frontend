// import Navbar from './components/layout/Navbar';
import Navbar from './Navbar'
// import Footer from './components/Footer';
import Footer from './Footer'
import { Outlet } from 'react-router-dom';

export default function Layout() {
 return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
