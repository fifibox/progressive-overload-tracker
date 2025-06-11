import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex gap-4">
      <Link to="/" className="hover:underline">Log Workout</Link>
      <Link to="/view" className="hover:underline">View Exercise</Link>
      <Link to="/history" className="hover:underline">History</Link>
    </nav>
  );
}