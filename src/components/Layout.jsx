import Navbar from './Navbar.jsx';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}