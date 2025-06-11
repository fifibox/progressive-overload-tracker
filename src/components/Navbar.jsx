import { Link, useLocation } from 'react-router';

export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { to: '/', label: 'Log' },
    { to: '/view', label: 'View' },
    { to: '/history', label: 'History' },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white px-4 py-2 flex gap-2 sm:gap-6 items-center shadow-md">
      {navItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className={`px-3 py-1.5 rounded-full transition-all font-medium
            ${location.pathname === item.to
              ? 'bg-yellow-400 text-blue-700 shadow-md'
              : 'hover:bg-white/10 hover:text-yellow-100'}
          `}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}